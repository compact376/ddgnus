package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/compact376/dgnus-backend/internal/handler"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"github.com/stripe/stripe-go/v85"
	"github.com/stripe/stripe-go/v85/webhook"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found.")
	}

	// Set Stripe API Key
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
	if stripe.Key == "" {
		log.Fatal("❌ STRIPE_SECRET_KEY is missing in .env file")
	}

	log.Println("✅ Stripe key loaded successfully")

	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS - Manual implementation (since chi doesn't have built-in CORS middleware)
	r.Use(corsMiddleware)

	// Routes
	r.Route("/api", func(r chi.Router) {
		r.Get("/health", handleHealth)
		r.Get("/config", handleConfig)
		r.Post("/create-checkout", handler.HandleCreateCheckout)
		r.Post("/webhook", handleWebhook)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 DGNUS Backend running on http://0.0.0.0:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

// Simple CORS Middleware
func corsMiddleware(next http.Handler) http.Handler {
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		allowedOrigin = "*"
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Vary", "Origin")

		// Handle preflight OPTIONS request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, map[string]string{"status": "healthy"})
}

func handleConfig(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, map[string]string{
		"publishableKey": os.Getenv("STRIPE_PUBLISHABLE_KEY"),
	})
}

func handleWebhook(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 65536)
	payload, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("Webhook: failed to read body: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	webhookSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	if webhookSecret == "" {
		log.Println("Warning: STRIPE_WEBHOOK_SECRET not set, skipping signature verification")
		w.WriteHeader(http.StatusOK)
		return
	}

	event, err := webhook.ConstructEvent(payload, r.Header.Get("Stripe-Signature"), webhookSecret)
	if err != nil {
		log.Printf("Webhook: signature verification failed: %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch event.Type {
	case "checkout.session.completed":
		log.Printf("Webhook: payment completed, event %s", event.ID)
		// TODO: fulfill order (send confirmation email, provision access, etc.)
	default:
		log.Printf("Webhook: unhandled event type %s", event.Type)
	}

	w.WriteHeader(http.StatusOK)
}

func writeJSON(w http.ResponseWriter, data any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
