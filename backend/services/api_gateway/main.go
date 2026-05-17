package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env if present in current or parent directories.
	if err := loadEnvFile(); err != nil {
		log.Printf("Warning: failed to load .env file: %v\n", err)
	}

	gatewayPort := os.Getenv("GATEWAY_PORT")
	if gatewayPort == "" {
		gatewayPort = "8080"
	}

	paymentServiceURL := os.Getenv("PAYMENT_SERVICE_URL")
	if paymentServiceURL == "" {
		paymentServiceURL = "http://payment-service:8081"
	}

	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
		allowedOrigin = "*"
	}

	// Setup routes
	mux := http.NewServeMux()

	// Health check for gateway itself
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"healthy","service":"api-gateway"}`))
	})

	// Create payment service proxy
	paymentProxy := NewServiceProxy(paymentServiceURL)

	// Proxy all payment service API endpoints under /api/
	mux.Handle("/api/", http.HandlerFunc(paymentProxy.Handle))

	// Apply middleware
	handler := CORSMiddleware(allowedOrigin)(mux)
	handler = LoggingMiddleware(handler)
	handler = RecoveryMiddleware(handler)

	server := &http.Server{
		Addr:    fmt.Sprintf(":%s", gatewayPort),
		Handler: handler,
	}

	log.Printf("🚀 API Gateway running on http://0.0.0.0:%s", gatewayPort)
	log.Printf("📦 Proxying to payment service at: %s", paymentServiceURL)
	log.Fatal(server.ListenAndServe())
}

func loadEnvFile() error {
	paths := []string{".env", "../.env", "../../.env"}
	for _, path := range paths {
		if _, err := os.Stat(path); err == nil {
			return godotenv.Load(path)
		}
	}
	return nil
}
