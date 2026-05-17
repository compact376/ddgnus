package contracts

import (
	"context"
	"time"

	t "dgnus-backend/shared/types"
)

// PaymentProcessor defines the contract for payment processing (e.g., Stripe)
type PaymentProcessor interface {
	CreateCheckoutSession(ctx context.Context, req t.CheckoutRequest) (*t.CheckoutResponse, error)
	ValidateWebhook(payload []byte, signature string) (*t.WebhookEvent, error)
	GetPublishableKey() string
}

// PaymentService defines the business logic contract for payments
type PaymentService interface {
	CreateCheckout(ctx context.Context, req t.CheckoutRequest) (*t.CheckoutResponse, error)
	HandleWebhook(ctx context.Context, payload []byte, signature string) error
	GetConfig(ctx context.Context) (*t.Config, error)
	HealthCheck(ctx context.Context) error
}

// PaymentRepository defines the contract for payment data persistence
type PaymentRepository interface {
	Save(ctx context.Context, payment *t.Payment) error
	FindByID(ctx context.Context, id string) (*t.Payment, error)
	FindBySessionID(ctx context.Context, sessionID string) (*t.Payment, error)
	FindByEmail(ctx context.Context, email string) ([]*t.Payment, error)
	UpdateStatus(ctx context.Context, id string, status string) error
	UpdateStatusWithTimestamp(ctx context.Context, id string, status string, completedAt *time.Time) error
	Delete(ctx context.Context, id string) error
}

// EventPublisher defines the contract for publishing events
type EventPublisher interface {
	Publish(ctx context.Context, event Event) error
	Subscribe(ctx context.Context, eventType string, handler EventHandler) error
}

// Event represents a domain event
type Event struct {
	ID         string      `json:"id"`
	Type       string      `json:"type"`
	Payload    interface{} `json:"payload"`
	OccurredAt time.Time   `json:"occurred_at"`
}

// EventHandler defines the contract for handling events
type EventHandler func(ctx context.Context, event Event) error
