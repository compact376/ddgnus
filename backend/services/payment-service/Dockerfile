# syntax = docker/dockerfile:1
FROM golang:1.22-alpine AS builder
WORKDIR /src

COPY go.mod go.sum ./
COPY services/payment-service ./services/payment-service
COPY shared ./shared

RUN apk add --no-cache ca-certificates git
RUN go env -w GO111MODULE=on GOPROXY=https://proxy.golang.org,https://goproxy.io,direct
RUN go mod download
RUN cd services/payment-service && CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /bin/payment-service ./cmd

FROM alpine:latest
RUN apk add --no-cache ca-certificates
RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app
USER app
COPY --from=builder /bin/payment-service /bin/payment-service
WORKDIR /app
EXPOSE 8081
ENTRYPOINT ["/bin/payment-service"]
