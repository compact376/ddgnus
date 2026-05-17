package contracts

import "net/http"

// HTTPClient defines the contract for making HTTP requests
type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

// ResponseWriter defines the contract for writing HTTP responses
type ResponseWriter interface {
	Header() http.Header
	Write([]byte) (int, error)
	WriteHeader(statusCode int)
}

// JSONResponse represents a standard JSON response
type JSONResponse struct {
	Data  interface{} `json:"data,omitempty"`
	Error string      `json:"error,omitempty"`
	Meta  interface{} `json:"meta,omitempty"`
}

// HealthCheck contract
type HealthChecker interface {
	IsHealthy() bool
	Name() string
}
