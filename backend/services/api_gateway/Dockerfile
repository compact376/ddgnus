# syntax = docker/dockerfile:1
FROM golang:1.22-alpine AS builder
WORKDIR /src

COPY go.mod go.sum ./
COPY services/api_gateway ./services/api_gateway
COPY shared ./shared

RUN apk add --no-cache ca-certificates git
RUN go env -w GO111MODULE=on GOPROXY=https://proxy.golang.org,https://goproxy.io,direct
RUN go mod download
RUN cd services/api_gateway && CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /bin/api-gateway

FROM alpine:latest
RUN apk add --no-cache ca-certificates
RUN addgroup -g 1001 -S app && adduser -u 1001 -S app -G app
USER app
COPY --from=builder /bin/api-gateway /bin/api-gateway
WORKDIR /app
EXPOSE 8080
ENTRYPOINT ["/bin/api-gateway"]
