package main

import (
	"log"
	"net/http"

	h "dgnus-backend/services/payment-service/internal/infrastructure/http"
	"dgnus-backend/services/payment-service/internal/infrastructure/repository"
	"dgnus-backend/services/payment-service/internal/infrastructure/stripe"
	"dgnus-backend/services/payment-service/internal/service"
	"dgnus-backend/shared/contracts"
	e "dgnus-backend/shared/env"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	// Load environment configuration
	config, err := e.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	log.Printf("Starting payment service in %s mode", config.Environment)

	// Initialize infrastructure
	stripeProcessor, err := stripe.NewStripeProcessor(config)
	if err != nil {
		log.Fatalf("Failed to initialize Stripe processor: %v", err)
	}

	// Initialize repository
	var paymentRepo contracts.PaymentRepository
	if config.DatabaseURL != "" {
		// Use PostgreSQL if DATABASE_URL is configured
		pgRepo, err := repository.NewPostgresPaymentRepository(config.DatabaseURL)
		if err != nil {
			log.Fatalf("Failed to initialize PostgreSQL repository: %v", err)
		}
		paymentRepo = pgRepo
		log.Println("✅ Using PostgreSQL repository")
		defer pgRepo.Close()
	} else {
		// Fallback to in-memory for development
		paymentRepo = repository.NewInMemoryPaymentRepository()
		log.Println("⚠️  Using in-memory repository (set DATABASE_URL for PostgreSQL)")
	}

	// Initialize service
	paymentService := service.NewPaymentService(stripeProcessor, paymentRepo)

	// Initialize HTTP handlers
	paymentHandler := h.NewPaymentHandler(paymentService)

	// Setup router
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(h.CORSMiddleware(config.AllowedOrigin))

	// Routes
	r.Route("/api", func(r chi.Router) {
		r.Get("/health", paymentHandler.HandleHealth)
		r.Get("/config", paymentHandler.HandleConfig)
		r.Post("/create-checkout", paymentHandler.HandleCreateCheckout)
		r.Post("/webhook", paymentHandler.HandleWebhook)
	})

	log.Printf("🚀 Payment Service running on http://0.0.0.0:%s", config.Port)
	log.Fatal(http.ListenAndServe(":"+config.Port, r))
}
