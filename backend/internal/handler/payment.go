package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/stripe/stripe-go/v85"
	"github.com/stripe/stripe-go/v85/checkout/session"
)

type CreateCheckoutRequest struct {
	Service string `json:"service"`
	Email   string `json:"email"`
}

func HandleCreateCheckout(w http.ResponseWriter, r *http.Request) {
	var req CreateCheckoutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" {
		writeJSONError(w, "Email is required", http.StatusBadRequest)
		return
	}

	var priceID string

	switch req.Service {
	case "wellness":
		priceID = os.Getenv("STRIPE_PRICE_WELLNESS")
	case "book":
		priceID = os.Getenv("STRIPE_PRICE_BOOK")
	default:
		writeJSONError(w, "Invalid service type", http.StatusBadRequest)
		return
	}

	if priceID == "" {
		writeJSONError(w, "Price ID not configured", http.StatusInternalServerError)
		return
	}

	params := &stripe.CheckoutSessionParams{
		Mode:          stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL:    stripe.String(os.Getenv("NEXT_PUBLIC_APP_URL") + "/success?session_id={CHECKOUT_SESSION_ID}"),
		CancelURL:     stripe.String(os.Getenv("NEXT_PUBLIC_APP_URL") + "/payment"),
		CustomerEmail: stripe.String(req.Email),
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				Price:    stripe.String(priceID),
				Quantity: stripe.Int64(1),
			},
		},
		Metadata: map[string]string{
			"service": req.Service,
			"email":   req.Email,
		},
	}

	sess, err := session.New(params)
	if err != nil {
		log.Printf("Stripe error: %v", err)
		writeJSONError(w, "Failed to create checkout session", http.StatusInternalServerError)
		return
	}

	writeJSON(w, map[string]interface{}{
		"url":     sess.URL,
		"service": req.Service,
	})
}

// Helper functions
func writeJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func writeJSONError(w http.ResponseWriter, message string, code int) {
	w.WriteHeader(code)
	writeJSON(w, map[string]string{"error": message})
}
