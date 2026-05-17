# syntax = docker/dockerfile:1
FROM golang:1.26-alpine AS builder
WORKDIR /src

COPY go.mod go.sum ./
COPY services/api_gateway ./services/api_gateway
COPY shared ./shared

RUN apk add --no-cache ca-certificates git
RUN go env -w GO111MODULE=on GOPROXY=https://proxy.golang.org,https://goproxy.io,direct
RUN go mod download
RUN cd services/api_gateway && go build -o /bin/api-gateway .

FROM alpine:latest
RUN apk add --no-cache ca-certificates
COPY --from=builder /bin/api-gateway /bin/api-gateway
COPY .env /app/.env
WORKDIR /app
EXPOSE 8080
ENTRYPOINT ["/bin/api-gateway"]
