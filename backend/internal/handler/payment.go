package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/compact376/dgnus-backend/internal/httputil"
	"github.com/stripe/stripe-go/v85"
	"github.com/stripe/stripe-go/v85/checkout/session"
)

type CreateCheckoutRequest struct {
	Item  string `json:"item"`
	Email string `json:"email"`
}

func HandleCreateCheckout(w http.ResponseWriter, r *http.Request) {
	var req CreateCheckoutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		httputil.WriteJSONError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("CreateCheckout request received: item=%q email=%q", req.Item, req.Email)

	var priceID string

	switch req.Item {
	case "soul_body":
		priceID = os.Getenv("STRIPE_PRICE_SOUL_BODY")
	case "deep_state":
		priceID = os.Getenv("STRIPE_PRICE_DEEP_STATE")
	case "research":
		priceID = os.Getenv("STRIPE_PRICE_RESEARCH")
	case "scouting":
		priceID = os.Getenv("STRIPE_PRICE_SCOUTING")
	case "book_preorder":
		priceID = os.Getenv("STRIPE_PRICE_BOOK_PREORDER")
	default:
		httputil.WriteJSONError(w, "Invalid checkout item", http.StatusBadRequest)
		return
	}

	if priceID == "" {
		httputil.WriteJSONError(w, "Price ID not configured", http.StatusInternalServerError)
		return
	}

	appURL := os.Getenv("NEXT_PUBLIC_APP_URL")
	if appURL == "" {
		appURL = "http://localhost:3000"
	}

	params := &stripe.CheckoutSessionParams{
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String(appURL + "/payments?success=true"),
		CancelURL:  stripe.String(appURL + "/payments?canceled=true"),
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				Price:    stripe.String(priceID),
				Quantity: stripe.Int64(1),
			},
		},
		Metadata: map[string]string{
			"item": req.Item,
		},
	}

	if req.Email != "" {
		params.CustomerEmail = stripe.String(req.Email)
		params.Metadata["email"] = req.Email
	}

	sess, err := session.New(params)
	if err != nil {
		log.Printf("Stripe error: %v", err)
		httputil.WriteJSONError(w, "Failed to create checkout session", http.StatusInternalServerError)
		return
	}

	log.Printf("Checkout session created: item=%q session_id=%q", req.Item, sess.ID)

	httputil.WriteJSON(w, map[string]interface{}{
		"url":  sess.URL,
		"item": req.Item,
	})
}
