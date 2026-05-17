package types

import (
	"time"
)

// Payment represents a payment transaction
type Payment struct {
	ID              string     `json:"id"`
	Items           []string   `json:"items"`
	Email           string     `json:"email,omitempty"`
	Amount          int64      `json:"amount"` // in cents
	Currency        string     `json:"currency"`
	Status          string     `json:"status"`
	StripeSessionID string     `json:"stripe_session_id"`
	CreatedAt       time.Time  `json:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at"`
	CompletedAt     *time.Time `json:"completed_at,omitempty"`
}

// CheckoutRequest represents a request to create a checkout session
type CheckoutRequest struct {
	Items     []string `json:"items"`
	Email     string   `json:"email,omitempty"`
	PaymentID string   `json:"-"`
}

// CheckoutResponse represents the response after creating a checkout
type CheckoutResponse struct {
	URL       string   `json:"url"`
	Item      string   `json:"item"`  // For backward compatibility
	Items     []string `json:"items"` // For multi-item support
	SessionID string   `json:"session_id"`
	Amount    int64    `json:"amount"` // total amount in smallest currency unit
}

// WebhookEvent represents a processed webhook event
type WebhookEvent struct {
	ID      string      `json:"id"`
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

// Config represents application configuration
type Config struct {
	PublishableKey string `json:"publishableKey"`
	Environment    string `json:"environment"`
	Version        string `json:"version"`
}

// ErrorResponse represents an error response
type ErrorResponse struct {
	Error   string `json:"error"`
	Code    int    `json:"code"`
	Details string `json:"details,omitempty"`
}

// PaginationParams represents pagination parameters
type PaginationParams struct {
	Page     int `json:"page"`
	PageSize int `json:"page_size"`
	Offset   int `json:"offset"`
}

// PaginatedResponse represents a paginated response
type PaginatedResponse[T any] struct {
	Data       []T `json:"data"`
	Total      int `json:"total"`
	Page       int `json:"page"`
	PageSize   int `json:"page_size"`
	TotalPages int `json:"total_pages"`
}

// Currency represents a currency code
type Currency string

const (
	CurrencyKES Currency = "KES"
	CurrencyUSD Currency = "USD"
	CurrencyEUR Currency = "EUR"
)

// PaymentStatus represents the status of a payment
type PaymentStatus string

const (
	PaymentStatusPending   PaymentStatus = "pending"
	PaymentStatusCompleted PaymentStatus = "completed"
	PaymentStatusFailed    PaymentStatus = "failed"
	PaymentStatusRefunded  PaymentStatus = "refunded"
	PaymentStatusCancelled PaymentStatus = "cancelled"
)

// ValidProductItems represents the valid product items
var ValidProductItems = []string{
	"soul_body",
	"research",
	"scouting",
	"book_preorder",
}

// Validate checks if the payment status is valid
func (s PaymentStatus) Validate() bool {
	switch s {
	case PaymentStatusPending, PaymentStatusCompleted, PaymentStatusFailed,
		PaymentStatusRefunded, PaymentStatusCancelled:
		return true
	}
	return false
}

// IsFinalStatus returns true if this is a final status
func (s PaymentStatus) IsFinalStatus() bool {
	return s == PaymentStatusCompleted ||
		s == PaymentStatusFailed ||
		s == PaymentStatusCancelled
}
