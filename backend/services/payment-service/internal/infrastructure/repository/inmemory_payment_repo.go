package repository

import (
	"context"
	"fmt"
	"sync"
	"time"

	"dgnus-backend/shared/types"
)

type InMemoryPaymentRepository struct {
	payments map[string]*types.Payment
	mu       sync.RWMutex
}

func NewInMemoryPaymentRepository() *InMemoryPaymentRepository {
	return &InMemoryPaymentRepository{
		payments: make(map[string]*types.Payment),
	}
}

func (r *InMemoryPaymentRepository) Save(ctx context.Context, payment *types.Payment) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.payments[payment.ID]; exists {
		return fmt.Errorf("payment with ID %s already exists", payment.ID)
	}

	r.payments[payment.ID] = payment
	return nil
}

func (r *InMemoryPaymentRepository) FindByID(ctx context.Context, id string) (*types.Payment, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	payment, exists := r.payments[id]
	if !exists {
		return nil, fmt.Errorf("payment not found: %s", id)
	}

	return payment, nil
}

func (r *InMemoryPaymentRepository) FindBySessionID(ctx context.Context, sessionID string) (*types.Payment, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	for _, payment := range r.payments {
		if payment.StripeSessionID == sessionID {
			return payment, nil
		}
	}

	return nil, fmt.Errorf("payment not found for session: %s", sessionID)
}

func (r *InMemoryPaymentRepository) FindByEmail(ctx context.Context, email string) ([]*types.Payment, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	var result []*types.Payment
	for _, payment := range r.payments {
		if payment.Email == email {
			result = append(result, payment)
		}
	}

	return result, nil
}

func (r *InMemoryPaymentRepository) UpdateStatus(ctx context.Context, id string, status string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	payment, exists := r.payments[id]
	if !exists {
		return fmt.Errorf("payment not found: %s", id)
	}

	payment.Status = status
	payment.UpdatedAt = time.Now()
	return nil
}

func (r *InMemoryPaymentRepository) UpdateStatusWithTimestamp(ctx context.Context, id string, status string, completedAt *time.Time) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	payment, exists := r.payments[id]
	if !exists {
		return fmt.Errorf("payment not found: %s", id)
	}

	payment.Status = status
	payment.UpdatedAt = time.Now()
	payment.CompletedAt = completedAt
	return nil
}

func (r *InMemoryPaymentRepository) Delete(ctx context.Context, id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.payments[id]; !exists {
		return fmt.Errorf("payment not found: %s", id)
	}

	delete(r.payments, id)
	return nil
}
