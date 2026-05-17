package env

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"sync"

	"github.com/joho/godotenv"
)

var once sync.Once

// Config holds all environment variables
type Config struct {
	// Server
	Port          string
	Environment   string
	AllowedOrigin string

	// Stripe
	StripeSecretKey      string
	StripePublishableKey string
	StripeWebhookSecret  string

	// Stripe Price IDs
	StripePriceSoulBody     string
	StripePriceResearch     string
	StripePriceScouting     string
	StripePriceBookPreorder string

	// Application
	AppURL             string
	DatabaseURL        string
	RedisURL           string
	MaxRequestBodySize int64
}

var config *Config

// Load loads the environment variables
func Load() (*Config, error) {
	var err error
	once.Do(func() {
		// Load .env file if exists in common root locations.
		if loadErr := loadEnvFile(); loadErr != nil {
			fmt.Printf("Warning: failed to load .env file: %v\n", loadErr)
		}

		config = &Config{
			Port:          getEnv("PORT", "8081"), // Payment service runs on 8081
			Environment:   getEnv("ENVIRONMENT", "development"),
			AllowedOrigin: getEnv("ALLOWED_ORIGIN", "http://localhost:3000"),

			StripeSecretKey:      getEnv("STRIPE_SECRET_KEY", ""),
			StripePublishableKey: getEnv("STRIPE_PUBLISHABLE_KEY", ""),
			StripeWebhookSecret:  getEnv("STRIPE_WEBHOOK_SECRET", ""),

			StripePriceSoulBody:     getEnv("STRIPE_PRICE_SOUL_BODY", ""),
			StripePriceResearch:     getEnv("STRIPE_PRICE_RESEARCH", ""),
			StripePriceScouting:     getEnv("STRIPE_PRICE_SCOUTING", ""),
			StripePriceBookPreorder: getEnv("STRIPE_PRICE_BOOK_PREORDER", ""),

			AppURL:             getEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
			DatabaseURL:        getEnv("DATABASE_URL", ""),
			RedisURL:           getEnv("REDIS_URL", ""),
			MaxRequestBodySize: int64(getEnvAsInt("MAX_REQUEST_BODY_SIZE", 65536)),
		}

		// Validate required fields
		if config.StripeSecretKey == "" {
			err = fmt.Errorf("STRIPE_SECRET_KEY is required")
			return
		}
		if config.StripePublishableKey == "" {
			err = fmt.Errorf("STRIPE_PUBLISHABLE_KEY is required")
			return
		}
	})

	if err != nil {
		return nil, err
	}

	return config, nil
}

// GetConfig returns the loaded configuration
func GetConfig() *Config {
	if config == nil {
		panic("environment configuration not loaded. Call Load() first")
	}
	return config
}

// IsProduction returns true if the environment is production
func (c *Config) IsProduction() bool {
	return c.Environment == "production"
}

// IsDevelopment returns true if the environment is development
func (c *Config) IsDevelopment() bool {
	return c.Environment == "development"
}

// GetStripePriceID returns the Stripe price ID for a given item
func (c *Config) GetStripePriceID(item string) (string, error) {
	priceMap := map[string]string{
		"soul_body":     c.StripePriceSoulBody,
		"research":      c.StripePriceResearch,
		"scouting":      c.StripePriceScouting,
		"book_preorder": c.StripePriceBookPreorder,
	}

	priceID, exists := priceMap[item]
	if !exists {
		return "", fmt.Errorf("invalid item: %s", item)
	}

	if priceID == "" {
		return "", fmt.Errorf("price ID not configured for item: %s. Please set the corresponding STRIPE_PRICE_* environment variable", item)
	}

	return priceID, nil
}

// Helper functions
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := getEnv(key, "")
	if valueStr == "" {
		return defaultValue
	}

	value, err := strconv.Atoi(valueStr)
	if err != nil {
		fmt.Printf("Warning: %s is not a valid integer, using default %d\n", key, defaultValue)
		return defaultValue
	}

	return value
}

func loadEnvFile() error {
	paths := []string{".env", "../.env", "../../.env"}
	for _, path := range paths {
		absPath, err := filepath.Abs(path)
		if err != nil {
			continue
		}
		if _, err := os.Stat(absPath); err == nil {
			return godotenv.Load(absPath)
		}
	}
	return nil
}
