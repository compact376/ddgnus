# # syntax = docker/dockerfile:1
# FROM golang:1.22-alpine AS builder
# WORKDIR /src

# COPY go.mod go.sum ./
# COPY services/payment-service ./services/payment-service
# COPY shared ./shared

# RUN apk add --no-cache ca-certificates git
# RUN go env -w GO111MODULE=on GOPROXY=https://proxy.golang.org,https://goproxy.io,direct
# RUN go mod download
# RUN cd services/payment-service && CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /bin/payment-service ./cmd

# FROM alpine:latest
# RUN apk add --no-cache ca-certificates
# RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app
# USER app
# COPY --from=builder /bin/payment-service /bin/payment-service
# WORKDIR /app
# EXPOSE 8081
# ENTRYPOINT ["/bin/payment-service"]
# syntax = docker/dockerfile:1
FROM golang:1.22-alpine AS builder
WORKDIR /src

# 1. Cache dependencies (avoids re-downloading on every code change)
COPY go.mod go.sum ./
RUN apk add --no-cache ca-certificates git
RUN go env -w GO111MODULE=on GOPROXY=https://proxy.golang.org,https://goproxy.io,direct
RUN go mod download

# 2. Copy source code after dependencies are cached
COPY shared ./shared
COPY services/payment-service ./services/payment-service

# 3. Build the binary
RUN cd services/payment-service && CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /bin/payment-service ./cmd

# 4. Final lightweight runner stage
FROM alpine:3.19
RUN apk add --no-cache ca-certificates

# Create non-root user and app directory with proper ownership
RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app
WORKDIR /app
RUN chown app:app /app

# Copy binary into the working directory
COPY --from=builder --chown=app:app /bin/payment-service ./payment-service

USER app
EXPOSE 8081
ENTRYPOINT ["./payment-service"]
