package httputil

import (
	"encoding/json"
	"net/http"
)

// WriteJSON writes v as a JSON response with status 200.
func WriteJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(v)
}

// WriteJSONError writes a JSON error response with the given HTTP status code.
func WriteJSONError(w http.ResponseWriter, message string, code int) {
	w.WriteHeader(code)
	WriteJSON(w, map[string]string{"error": message})
}
