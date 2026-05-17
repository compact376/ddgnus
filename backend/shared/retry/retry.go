package retry

import (
	"context"
	"fmt"
	"math"
	"time"
)

// Config holds the retry configuration
type Config struct {
	MaxAttempts     int
	InitialInterval time.Duration
	MaxInterval     time.Duration
	Multiplier      float64
	Randomization   float64
}

// DefaultConfig returns a default retry configuration
func DefaultConfig() Config {
	return Config{
		MaxAttempts:     3,
		InitialInterval: 100 * time.Millisecond,
		MaxInterval:     10 * time.Second,
		Multiplier:      2.0,
		Randomization:   0.1,
	}
}

// Operation is a function that can be retried
type Operation func(ctx context.Context) error

// OperationWithResult is a function that can be retried and returns a result
type OperationWithResult[T any] func(ctx context.Context) (T, error)

// Do retries the operation with exponential backoff
func Do(ctx context.Context, op Operation, config ...Config) error {
	cfg := DefaultConfig()
	if len(config) > 0 {
		cfg = config[0]
	}

	var lastErr error
	currentInterval := cfg.InitialInterval

	for attempt := 0; attempt < cfg.MaxAttempts; attempt++ {
		// Check if context is cancelled
		select {
		case <-ctx.Done():
			return fmt.Errorf("retry cancelled: %w", ctx.Err())
		default:
		}

		err := op(ctx)
		if err == nil {
			return nil
		}

		lastErr = err

		// Don't sleep on the last attempt
		if attempt == cfg.MaxAttempts-1 {
			break
		}

		// Calculate sleep duration with jitter
		sleepDuration := time.Duration(float64(currentInterval) * (1 + cfg.Randomization))

		// Ensure we don't exceed max interval
		if currentInterval > cfg.MaxInterval {
			currentInterval = cfg.MaxInterval
			sleepDuration = time.Duration(float64(currentInterval) * (1 + cfg.Randomization))
		}

		// Wait with context awareness
		select {
		case <-ctx.Done():
			return fmt.Errorf("retry cancelled during backoff: %w", ctx.Err())
		case <-time.After(sleepDuration):
		}

		// Exponential backoff
		currentInterval = time.Duration(float64(currentInterval) * cfg.Multiplier)
	}

	return fmt.Errorf("operation failed after %d attempts: %w", cfg.MaxAttempts, lastErr)
}

// DoWithResult retries the operation and returns a result
func DoWithResult[T any](ctx context.Context, op OperationWithResult[T], config ...Config) (T, error) {
	var result T

	err := Do(ctx, func(ctx context.Context) error {
		var opErr error
		result, opErr = op(ctx)
		return opErr
	}, config...)

	return result, err
}

// IsRetryable determines if an error is retryable
func IsRetryable(err error) bool {
	// You can add custom logic here based on error types
	if err == nil {
		return false
	}

	// Add specific error checks, for example:
	// if errors.Is(err, ErrTimeout) { return true }
	// if errors.Is(err, ErrTemporary) { return true }

	return true
}

// RetryableError wraps an error to mark it as retryable
type RetryableError struct {
	Err error
}

func (e *RetryableError) Error() string {
	return e.Err.Error()
}

func (e *RetryableError) Unwrap() error {
	return e.Err
}

// NewRetryableError creates a new retryable error
func NewRetryableError(err error) error {
	return &RetryableError{Err: err}
}

// CalculateBackoff calculates the backoff duration for a given attempt
func CalculateBackoff(config Config, attempt int) time.Duration {
	interval := float64(config.InitialInterval) * math.Pow(config.Multiplier, float64(attempt))

	if time.Duration(interval) > config.MaxInterval {
		interval = float64(config.MaxInterval)
	}

	// Add jitter
	jitter := interval * config.Randomization

	return time.Duration(interval + jitter)
}
