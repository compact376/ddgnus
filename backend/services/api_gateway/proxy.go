package main

import (
	"io"
	"log"
	"net/http"
	"time"
)

// ServiceProxy handles forwarding requests to backend services
type ServiceProxy struct {
	serviceURL string
	client     *http.Client
}

// NewServiceProxy creates a new service proxy
func NewServiceProxy(serviceURL string) *ServiceProxy {
	return &ServiceProxy{
		serviceURL: serviceURL,
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// Handle proxies the request to the backend service
func (p *ServiceProxy) Handle(w http.ResponseWriter, r *http.Request) {
	// Create the target URL
	targetURL := p.serviceURL + r.URL.Path
	if r.URL.RawQuery != "" {
		targetURL += "?" + r.URL.RawQuery
	}

	// Create new request to backend
	proxyReq, err := http.NewRequest(r.Method, targetURL, r.Body)
	if err != nil {
		log.Printf("Error creating proxy request: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Copy headers from original request
	for key, values := range r.Header {
		for _, value := range values {
			proxyReq.Header.Add(key, value)
		}
	}

	// Add proxy headers
	proxyReq.Header.Set("X-Forwarded-For", r.RemoteAddr)
	proxyReq.Header.Set("X-Forwarded-Host", r.Host)

	// Send request to backend
	resp, err := p.client.Do(proxyReq)
	if err != nil {
		log.Printf("Error proxying to backend: %v", err)
		http.Error(w, "Service temporarily unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	// Copy response headers except CORS headers handled by the gateway
	for key, values := range resp.Header {
		if isCORSHeader(key) {
			continue
		}
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	// Write status code
	w.WriteHeader(resp.StatusCode)

	// Copy response body
	io.Copy(w, resp.Body)
}

func isCORSHeader(key string) bool {
	switch http.CanonicalHeaderKey(key) {
	case "Access-Control-Allow-Origin",
		"Access-Control-Allow-Methods",
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Credentials",
		"Access-Control-Max-Age":
		return true
	default:
		return false
	}
}
