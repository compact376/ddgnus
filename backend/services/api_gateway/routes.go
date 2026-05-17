package main

// This file is intentionally minimal since routes are defined in main.go
// You can add more routes here as your services grow

// Example of how to add new service routes:
// authProxy := NewServiceProxy(os.Getenv("AUTH_SERVICE_URL"))
// mux.HandleFunc("/api/auth/login", authProxy.Handle)
// mux.HandleFunc("/api/auth/register", authProxy.Handle)
