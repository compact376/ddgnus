package http

import (
	"log"
	"net/http"

	"dgnus-backend/shared/contracts"
	"dgnus-backend/shared/types"
)

type PaymentHandler struct {
	service contracts.PaymentService
}

// JSONResponse is a simple wrapper used for consistent JSON responses.
type JSONResponse struct {
	Data  any    `json:"data,omitempty"`
	Error string `json:"error,omitempty"`
}

func NewPaymentHandler(service contracts.PaymentService) *PaymentHandler {
	return &PaymentHandler{
		service: service,
	}
}

func (h *PaymentHandler) HandleCreateCheckout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		WriteError(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req types.CheckoutRequest
	if err := DecodeJSON(r, &req); err != nil {
		log.Printf("Failed to decode checkout request: %v", err)
		WriteError(w, "Invalid request body. Please provide valid JSON with 'items' array.", http.StatusBadRequest)
		return
	}

	log.Printf("Checkout request: items=%v email=%s", req.Items, req.Email)

	response, err := h.service.CreateCheckout(r.Context(), req)
	if err != nil {
		log.Printf("Failed to create checkout: %v", err)

		// Determine appropriate error response based on error type
		if isValidationError(err) {
			WriteError(w, err.Error(), http.StatusBadRequest)
		} else {
			WriteError(w, "Failed to create checkout session. Please try again.", http.StatusInternalServerError)
		}
		return
	}

	log.Printf("Checkout created successfully: session_id=%s", response.SessionID)
	WriteJSON(w, JSONResponse{
		Data: response,
	})
}

func (h *PaymentHandler) HandleWebhook(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		WriteError(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Limit request body size
	r.Body = http.MaxBytesReader(w, r.Body, 65536)

	payload, err := ReadBody(r)
	if err != nil {
		log.Printf("Failed to read webhook body: %v", err)
		WriteError(w, "Failed to read request body", http.StatusBadRequest)
		return
	}

	sigHeader := r.Header.Get("Stripe-Signature")
	log.Printf("Webhook received: signature=%q payload_size=%d", sigHeader, len(payload))

	if err := h.service.HandleWebhook(r.Context(), payload, sigHeader); err != nil {
		log.Printf("Webhook handling failed: %v", err)

		// Always return 200 for webhooks to prevent Stripe from retrying
		// Log the error for investigation
		w.WriteHeader(http.StatusOK)
		WriteJSON(w, map[string]string{
			"status":  "error",
			"message": "Webhook received but processing failed",
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	WriteJSON(w, map[string]string{"status": "received"})
}

func (h *PaymentHandler) HandleHealth(w http.ResponseWriter, r *http.Request) {
	health := map[string]interface{}{
		"status":  "healthy",
		"service": "payment-service",
	}

	if err := h.service.HealthCheck(r.Context()); err != nil {
		health["status"] = "unhealthy"
		health["error"] = err.Error()
		WriteJSON(w, health)
		return
	}

	WriteJSON(w, health)
}

func (h *PaymentHandler) HandleConfig(w http.ResponseWriter, r *http.Request) {
	config, err := h.service.GetConfig(r.Context())
	if err != nil {
		log.Printf("Failed to get config: %v", err)
		WriteError(w, "Failed to retrieve configuration", http.StatusInternalServerError)
		return
	}

	WriteJSON(w, JSONResponse{
		Data: config,
	})
}

// isValidationError checks if an error is a validation error
func isValidationError(err error) bool {
	// Simple check - you can implement more sophisticated error type checking
	if err == nil {
		return false
	}

	errMsg := err.Error()
	return contains(errMsg, "invalid") ||
		contains(errMsg, "required") ||
		contains(errMsg, "validation")
}

// contains checks if a string contains a substring (case-insensitive)
func contains(s, substr string) bool {
	return len(s) >= len(substr) &&
		searchString(s, substr)
}

func searchString(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if equalFold(s[i:i+len(substr)], substr) {
			return true
		}
	}
	return false
}

func equalFold(s, t string) bool {
	if len(s) != len(t) {
		return false
	}
	for i := 0; i < len(s); i++ {
		if toLower(s[i]) != toLower(t[i]) {
			return false
		}
	}
	return true
}

func toLower(c byte) byte {
	if c >= 'A' && c <= 'Z' {
		return c + 32
	}
	return c
}
