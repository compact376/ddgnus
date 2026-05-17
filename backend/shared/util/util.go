package util

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
)

// GenerateID generates a unique ID
func GenerateID() string {
	return uuid.New().String()
}

// GenerateShortID generates a shorter unique ID
func GenerateShortID() string {
	return strings.Split(uuid.New().String(), "-")[0]
}

// GenerateSecureToken generates a cryptographically secure random token
func GenerateSecureToken(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", fmt.Errorf("failed to generate secure token: %w", err)
	}
	return base64.URLEncoding.EncodeToString(bytes), nil
}

// Contains checks if a string slice contains a specific element
func Contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

// RemoveDuplicates removes duplicate strings from a slice
func RemoveDuplicates(slice []string) []string {
	seen := make(map[string]bool)
	result := []string{}

	for _, item := range slice {
		if !seen[item] {
			seen[item] = true
			result = append(result, item)
		}
	}

	return result
}

// MaskEmail masks part of an email for privacy
func MaskEmail(email string) string {
	if email == "" {
		return ""
	}

	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return email
	}

	local := parts[0]
	domain := parts[1]

	if len(local) <= 2 {
		return local + "***@" + domain
	}

	return local[:2] + "***" + local[len(local)-1:] + "@" + domain
}

// FormatCurrency formats amount in cents to a human-readable string
func FormatCurrency(amount int64, currency string) string {
	switch strings.ToUpper(currency) {
	case "KES":
		return fmt.Sprintf("KSh %s", formatWithCommas(amount/100))
	case "USD":
		return fmt.Sprintf("$%.2f", float64(amount)/100)
	case "EUR":
		return fmt.Sprintf("€%.2f", float64(amount)/100)
	default:
		return fmt.Sprintf("%.2f %s", float64(amount)/100, currency)
	}
}

// ParseAmountFromShillings converts KSh amount to cents
func ParseAmountFromShillings(shillings int64) int64 {
	return shillings * 100
}

// ToCents converts amount to cents (multiply by 100)
func ToCents(amount float64) int64 {
	return int64(amount * 100)
}

// FromCents converts cents to float
func FromCents(cents int64) float64 {
	return float64(cents) / 100
}

// TimePtr returns a pointer to the given time
func TimePtr(t time.Time) *time.Time {
	return &t
}

// StringPtr returns a pointer to the given string
func StringPtr(s string) *string {
	return &s
}

// IntPtr returns a pointer to the given int
func IntPtr(i int) *int {
	return &i
}

// BoolPtr returns a pointer to the given bool
func BoolPtr(b bool) *bool {
	return &b
}

// TruncateString truncates a string to the given length
func TruncateString(s string, maxLen int) string {
	if len(s) <= maxLen {
		return s
	}
	return s[:maxLen-3] + "..."
}

// IsValidEmail performs basic email validation
func IsValidEmail(email string) bool {
	// Basic validation - you can use more comprehensive validation
	if email == "" {
		return false
	}

	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return false
	}

	return strings.Contains(parts[1], ".")
}

// RetryableFunc is a function that can be retried
type RetryableFunc func() error

// StringifyItems converts items slice to a string
func StringifyItems(items []string) string {
	return strings.Join(items, ",")
}

// ParseItems converts a string of comma-separated items back to slice
func ParseItems(itemsStr string) []string {
	if itemsStr == "" {
		return []string{}
	}
	return strings.Split(itemsStr, ",")
}

// formatWithCommas adds commas to large numbers
func formatWithCommas(n int64) string {
	if n < 0 {
		return "-" + formatWithCommas(-n)
	}

	s := fmt.Sprintf("%d", n)

	// Add commas
	for i := len(s) - 3; i > 0; i -= 3 {
		s = s[:i] + "," + s[i:]
	}

	return s
}
