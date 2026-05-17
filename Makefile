SHELL := /bin/bash

.PHONY: all api-gateway payment-service frontend docker-api-gateway docker-payment-service docker-frontend docker-build tidy clean tilt

all: api-gateway payment-service frontend

api-gateway:
	mkdir -p backend/bin
	cd backend && go build -o bin/api-gateway ./services/api_gateway

payment-service:
	mkdir -p backend/bin
	cd backend && go build -o bin/payment-service ./services/payment-service/cmd

frontend:
	cd frontend && npm install
	cd frontend && npm run build

docker-api-gateway:
	docker build -t dgnus-api-gateway -f backend/services/api_gateway/Dockerfile backend

docker-payment-service:
	docker build -t dgnus-payment-service -f backend/services/payment-service/Dockerfile backend

docker-frontend:
	docker build -t dgnus-frontend -f Dockerfile .

docker-build: docker-api-gateway docker-payment-service docker-frontend

tidy:
	cd backend && go mod tidy

clean:
	rm -rf backend/bin frontend/dist

tilt:
	tilt up
