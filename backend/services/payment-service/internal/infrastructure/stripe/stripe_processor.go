package stripe

import (
	"context"
	"fmt"
	"log"

	"dgnus-backend/shared/env"
	"dgnus-backend/shared/types"

	"github.com/stripe/stripe-go/v85"
	"github.com/stripe/stripe-go/v85/checkout/session"
	"github.com/stripe/stripe-go/v85/webhook"
)

type StripeProcessor struct {
	config *env.Config
}

func NewStripeProcessor(config *env.Config) (*StripeProcessor, error) {
	if config.StripeSecretKey == "" {
		return nil, fmt.Errorf("Stripe secret key is required")
	}

	// Set the global Stripe key
	stripe.Key = config.StripeSecretKey

	// Validate all price IDs are configured
	items := []string{"soul_body", "research", "scouting", "book_preorder"}
	for _, item := range items {
		if _, err := config.GetStripePriceID(item); err != nil {
			return nil, fmt.Errorf("price ID validation failed: %w", err)
		}
	}

	return &StripeProcessor{
		config: config,
	}, nil
}

func (p *StripeProcessor) CreateCheckoutSession(ctx context.Context, req types.CheckoutRequest) (*types.CheckoutResponse, error) {
	if len(req.Items) == 0 {
		return nil, fmt.Errorf("at least one item is required")
	}

	// Build line items for each selected product
	var lineItems []*stripe.CheckoutSessionLineItemParams
	for _, item := range req.Items {
		priceID, err := p.config.GetStripePriceID(item)
		if err != nil {
			return nil, fmt.Errorf("invalid item %s: %w", item, err)
		}

		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			Price:    stripe.String(priceID),
			Quantity: stripe.Int64(1),
		})
	}

	// Build metadata
	metadata := map[string]string{
		"items_count": fmt.Sprintf("%d", len(req.Items)),
		"payment_id":  req.PaymentID,
	}

	// Add each item as separate metadata
	for i, item := range req.Items {
		metadata[fmt.Sprintf("item_%d", i)] = item
	}

	if req.Email != "" {
		metadata["email"] = req.Email
	}

	successURL := p.config.AppURL + "/payments?success=true"
	cancelURL := p.config.AppURL + "/payments?canceled=true"

	params := &stripe.CheckoutSessionParams{
		Mode:       stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL: stripe.String(successURL),
		CancelURL:  stripe.String(cancelURL),
		LineItems:  lineItems,
		Metadata:   metadata,
	}

	if req.Email != "" {
		params.CustomerEmail = stripe.String(req.Email)
	}

	log.Printf("Creating Stripe session for %d items: %v", len(req.Items), req.Items)

	sess, err := session.New(params)
	if err != nil {
		return nil, fmt.Errorf("stripe session creation failed: %w", err)
	}

	log.Printf("Stripe session created: id=%s url=%s", sess.ID, sess.URL)

	response := &types.CheckoutResponse{
		URL:       sess.URL,
		Items:     req.Items,
		Item:      req.Items[0], // For backward compatibility
		SessionID: sess.ID,
		Amount:    sess.AmountTotal,
	}

	return response, nil
}

func (p *StripeProcessor) ValidateWebhook(payload []byte, signature string) (*types.WebhookEvent, error) {
	if p.config.StripeWebhookSecret == "" {
		return nil, fmt.Errorf("webhook secret not configured")
	}

	event, err := webhook.ConstructEvent(payload, signature, p.config.StripeWebhookSecret)
	if err != nil {
		return nil, fmt.Errorf("webhook verification failed: %w", err)
	}

	log.Printf("Webhook validated successfully: type=%s id=%s", event.Type, event.ID)

	return &types.WebhookEvent{
		ID:      event.ID,
		Type:    string(event.Type),
		Payload: event.Data.Object,
	}, nil
}

func (p *StripeProcessor) GetPublishableKey() string {
	return p.config.StripePublishableKey
}
