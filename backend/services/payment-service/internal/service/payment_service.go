package service

import (
	"context"
	"fmt"
	"log"
	"time"

	"dgnus-backend/shared/contracts"
	"dgnus-backend/shared/types"
	"dgnus-backend/shared/util"

	"github.com/stripe/stripe-go/v85"
)

type paymentService struct {
	processor  contracts.PaymentProcessor
	repository contracts.PaymentRepository
}

func NewPaymentService(
	processor contracts.PaymentProcessor,
	repository contracts.PaymentRepository,
) contracts.PaymentService {
	return &paymentService{
		processor:  processor,
		repository: repository,
	}
}

func (s *paymentService) CreateCheckout(ctx context.Context, req types.CheckoutRequest) (*types.CheckoutResponse, error) {
	paymentID := util.GenerateID()
	req.PaymentID = paymentID

	// Validate request
	if len(req.Items) == 0 {
		return nil, fmt.Errorf("at least one item is required")
	}

	// Validate email if provided
	if req.Email != "" && !util.IsValidEmail(req.Email) {
		return nil, fmt.Errorf("invalid email address: %s", req.Email)
	}

	// Validate items against valid product list
	for _, item := range req.Items {
		if !util.Contains(types.ValidProductItems, item) {
			return nil, fmt.Errorf("invalid item: %s. Valid items are: %v",
				item, types.ValidProductItems)
		}
	}

	// Remove any duplicate items
	req.Items = util.RemoveDuplicates(req.Items)

	log.Printf("Creating checkout for items: %v, email: %s", req.Items, util.MaskEmail(req.Email))

	// Create checkout via processor (Stripe)
	response, err := s.processor.CreateCheckoutSession(ctx, req)
	if err != nil {
		log.Printf("Failed to create checkout session: %v", err)
		return nil, fmt.Errorf("failed to create checkout: %w", err)
	}

	// Save payment record
	payment := &types.Payment{
		ID:              paymentID,
		Items:           req.Items,
		Email:           req.Email,
		Status:          string(types.PaymentStatusPending),
		StripeSessionID: response.SessionID,
		Amount:          response.Amount,
		Currency:        string(types.CurrencyKES),
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}

	if err := s.repository.Save(ctx, payment); err != nil {
		log.Printf("Failed to save payment record: %v", err)
		// Don't fail the request, but log the error
		// In production, you might want to queue this for retry
	} else {
		log.Printf("Payment record saved: id=%s session_id=%s", payment.ID, payment.StripeSessionID)
	}

	return response, nil
}

func (s *paymentService) HandleWebhook(ctx context.Context, payload []byte, signature string) error {
	event, err := s.processor.ValidateWebhook(payload, signature)
	if err != nil {
		return fmt.Errorf("webhook validation failed: %w", err)
	}

	log.Printf("Processing webhook event: type=%s id=%s", event.Type, event.ID)

	switch event.Type {
	case "checkout.session.completed":
		return s.handleCheckoutCompleted(ctx, event)

	case "payment_intent.succeeded":
		return s.handlePaymentIntentStatus(ctx, event, types.PaymentStatusCompleted)

	case "payment_intent.payment_failed":
		return s.handlePaymentIntentStatus(ctx, event, types.PaymentStatusFailed)

	case "payment_intent.canceled":
		return s.handlePaymentIntentStatus(ctx, event, types.PaymentStatusCancelled)

	case "charge.refunded":
		log.Printf("Charge refunded: %s", event.ID)
		// Handle refund if needed

	default:
		log.Printf("Unhandled event type: %s", event.Type)
	}

	return nil
}

func (s *paymentService) handleCheckoutCompleted(ctx context.Context, event *types.WebhookEvent) error {
	log.Printf("Handling checkout completion: %s", event.ID)

	// Checkout session completion can be used for extra bookkeeping,
	// but the final payment state comes from payment_intent events.
	return nil
}

func (s *paymentService) handlePaymentIntentStatus(ctx context.Context, event *types.WebhookEvent, status types.PaymentStatus) error {
	paymentID, err := extractPaymentIDFromWebhook(event)
	if err != nil {
		log.Printf("Failed to extract payment ID from webhook: %v", err)
		return nil
	}

	completedAt := (*time.Time)(nil)
	if status == types.PaymentStatusCompleted {
		now := time.Now()
		completedAt = &now
	}

	if err := s.repository.UpdateStatusWithTimestamp(ctx, paymentID, string(status), completedAt); err != nil {
		return fmt.Errorf("failed to update payment status: %w", err)
	}

	log.Printf("Updated payment %s to status %s", paymentID, status)
	return nil
}

func extractPaymentIDFromWebhook(event *types.WebhookEvent) (string, error) {
	if event == nil || event.Payload == nil {
		return "", fmt.Errorf("invalid webhook event payload")
	}

	if pi, ok := event.Payload.(*stripe.PaymentIntent); ok {
		if paymentID := pi.Metadata["payment_id"]; paymentID != "" {
			return paymentID, nil
		}
		return "", fmt.Errorf("payment_id metadata not found on payment intent")
	}

	if payloadMap, ok := event.Payload.(map[string]interface{}); ok {
		if metadata, ok := payloadMap["metadata"].(map[string]interface{}); ok {
			if paymentID, ok := metadata["payment_id"].(string); ok && paymentID != "" {
				return paymentID, nil
			}
		}
	}

	return "", fmt.Errorf("unable to extract payment_id from webhook payload")
}

func (s *paymentService) GetConfig(ctx context.Context) (*types.Config, error) {
	return &types.Config{
		PublishableKey: s.processor.GetPublishableKey(),
		Environment:    "development", // Get from env config
		Version:        "1.0.0",
	}, nil
}

func (s *paymentService) HealthCheck(ctx context.Context) error {
	// Check if processor is healthy
	if s.processor.GetPublishableKey() == "" {
		return fmt.Errorf("payment processor not properly configured")
	}

	// Could add more health checks:
	// - Database connectivity
	// - Redis connectivity
	// - Stripe API reachability

	return nil
}
