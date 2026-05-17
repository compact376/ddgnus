package contracts

import "context"

// Repository defines the base repository contract
type Repository[T any] interface {
	Save(ctx context.Context, entity *T) error
	FindByID(ctx context.Context, id string) (*T, error)
	FindAll(ctx context.Context) ([]*T, error)
	Update(ctx context.Context, entity *T) error
	Delete(ctx context.Context, id string) error
}

// Transaction defines the contract for database transactions
type Transaction interface {
	Commit() error
	Rollback() error
	Get(ctx context.Context, dest interface{}, query string, args ...interface{}) error
	Select(ctx context.Context, dest interface{}, query string, args ...interface{}) error
	Exec(ctx context.Context, query string, args ...interface{}) error
}

// TransactionManager defines the contract for managing transactions
type TransactionManager interface {
	Begin(ctx context.Context) (Transaction, error)
	WithTransaction(ctx context.Context, fn func(Transaction) error) error
}

// CacheRepository defines the contract for caching
type CacheRepository interface {
	Get(ctx context.Context, key string) (interface{}, error)
	Set(ctx context.Context, key string, value interface{}, ttl int) error
	Delete(ctx context.Context, key string) error
	Exists(ctx context.Context, key string) (bool, error)
}
