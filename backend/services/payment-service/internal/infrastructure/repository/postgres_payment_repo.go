package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"dgnus-backend/shared/types"

	_ "github.com/lib/pq"
)

type PostgresPaymentRepository struct {
	db *sql.DB
}

func NewPostgresPaymentRepository(connectionString string) (*PostgresPaymentRepository, error) {
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, fmt.Errorf("failed to open database connection: %w", err)
	}

	// Test connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	repo := &PostgresPaymentRepository{db: db}

	// Initialize schema if needed
	if err := repo.initSchema(context.Background()); err != nil {
		return nil, fmt.Errorf("failed to initialize schema: %w", err)
	}

	return repo, nil
}

func (r *PostgresPaymentRepository) initSchema(ctx context.Context) error {
	schema := `
	CREATE TABLE IF NOT EXISTS payments (
		id VARCHAR(255) PRIMARY KEY,
		items TEXT[] NOT NULL,
		email VARCHAR(255),
		amount BIGINT NOT NULL,
		currency VARCHAR(10) NOT NULL,
		status VARCHAR(50) NOT NULL,
		stripe_session_id VARCHAR(255) NOT NULL,
		created_at TIMESTAMP NOT NULL,
		updated_at TIMESTAMP NOT NULL,
		completed_at TIMESTAMP
	);

	CREATE INDEX IF NOT EXISTS idx_payments_stripe_session_id ON payments(stripe_session_id);
	CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
	CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
	`

	_, err := r.db.ExecContext(ctx, schema)
	return err
}

func (r *PostgresPaymentRepository) Save(ctx context.Context, payment *types.Payment) error {
	query := `
	INSERT INTO payments (id, items, email, amount, currency, status, stripe_session_id, created_at, updated_at, completed_at)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	`

	_, err := r.db.ExecContext(ctx, query,
		payment.ID,
		payment.Items,
		payment.Email,
		payment.Amount,
		payment.Currency,
		payment.Status,
		payment.StripeSessionID,
		payment.CreatedAt,
		payment.UpdatedAt,
		payment.CompletedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to save payment: %w", err)
	}

	return nil
}

func (r *PostgresPaymentRepository) FindByID(ctx context.Context, id string) (*types.Payment, error) {
	query := `
	SELECT id, items, email, amount, currency, status, stripe_session_id, created_at, updated_at, completed_at
	FROM payments
	WHERE id = $1
	`

	payment := &types.Payment{}
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&payment.ID,
		&payment.Items,
		&payment.Email,
		&payment.Amount,
		&payment.Currency,
		&payment.Status,
		&payment.StripeSessionID,
		&payment.CreatedAt,
		&payment.UpdatedAt,
		&payment.CompletedAt,
	)

	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("payment not found: %s", id)
	}
	if err != nil {
		return nil, fmt.Errorf("failed to query payment: %w", err)
	}

	return payment, nil
}

func (r *PostgresPaymentRepository) FindBySessionID(ctx context.Context, sessionID string) (*types.Payment, error) {
	query := `
	SELECT id, items, email, amount, currency, status, stripe_session_id, created_at, updated_at, completed_at
	FROM payments
	WHERE stripe_session_id = $1
	`

	payment := &types.Payment{}
	err := r.db.QueryRowContext(ctx, query, sessionID).Scan(
		&payment.ID,
		&payment.Items,
		&payment.Email,
		&payment.Amount,
		&payment.Currency,
		&payment.Status,
		&payment.StripeSessionID,
		&payment.CreatedAt,
		&payment.UpdatedAt,
		&payment.CompletedAt,
	)

	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("payment not found for session: %s", sessionID)
	}
	if err != nil {
		return nil, fmt.Errorf("failed to query payment: %w", err)
	}

	return payment, nil
}

func (r *PostgresPaymentRepository) FindByEmail(ctx context.Context, email string) ([]*types.Payment, error) {
	query := `
	SELECT id, items, email, amount, currency, status, stripe_session_id, created_at, updated_at, completed_at
	FROM payments
	WHERE email = $1
	ORDER BY created_at DESC
	`

	rows, err := r.db.QueryContext(ctx, query, email)
	if err != nil {
		return nil, fmt.Errorf("failed to query payments: %w", err)
	}
	defer rows.Close()

	var payments []*types.Payment
	for rows.Next() {
		payment := &types.Payment{}
		err := rows.Scan(
			&payment.ID,
			&payment.Items,
			&payment.Email,
			&payment.Amount,
			&payment.Currency,
			&payment.Status,
			&payment.StripeSessionID,
			&payment.CreatedAt,
			&payment.UpdatedAt,
			&payment.CompletedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan payment: %w", err)
		}
		payments = append(payments, payment)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating payments: %w", err)
	}

	return payments, nil
}

func (r *PostgresPaymentRepository) UpdateStatus(ctx context.Context, id string, status string) error {
	query := `
	UPDATE payments
	SET status = $1, updated_at = $2
	WHERE id = $3
	`

	result, err := r.db.ExecContext(ctx, query, status, time.Now(), id)
	if err != nil {
		return fmt.Errorf("failed to update payment status: %w", err)
	}

	affected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get affected rows: %w", err)
	}

	if affected == 0 {
		return fmt.Errorf("payment not found: %s", id)
	}

	return nil
}

func (r *PostgresPaymentRepository) UpdateStatusWithTimestamp(ctx context.Context, id string, status string, completedAt *time.Time) error {
	query := `
	UPDATE payments
	SET status = $1, updated_at = $2, completed_at = $3
	WHERE id = $4
	`

	result, err := r.db.ExecContext(ctx, query, status, time.Now(), completedAt, id)
	if err != nil {
		return fmt.Errorf("failed to update payment status: %w", err)
	}

	affected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get affected rows: %w", err)
	}

	if affected == 0 {
		return fmt.Errorf("payment not found: %s", id)
	}

	return nil
}

func (r *PostgresPaymentRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM payments WHERE id = $1`

	result, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete payment: %w", err)
	}

	affected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get affected rows: %w", err)
	}

	if affected == 0 {
		return fmt.Errorf("payment not found: %s", id)
	}

	return nil
}

func (r *PostgresPaymentRepository) Close() error {
	if r.db != nil {
		return r.db.Close()
	}
	return nil
}
