# # Frontend Dockerfile built from repository root
# FROM node:20-alpine AS builder
# WORKDIR /app

# COPY .env* ./
# COPY frontend/package.json ./frontend/package.json
# COPY frontend/tsconfig.json ./frontend/tsconfig.json
# COPY frontend/vite.config.ts ./frontend/vite.config.ts
# COPY frontend/index.html ./frontend/index.html
# COPY frontend/public ./frontend/public
# COPY frontend/src ./frontend/src

# WORKDIR /app/frontend
# RUN npm install
# RUN npm run build

# FROM nginx:alpine
# RUN rm -rf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/frontend/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# syntax = docker/dockerfile:1
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Cache dependencies (avoids npm install on every code change)
COPY frontend/package.json frontend/package-lock.json* ./frontend/
WORKDIR /app/frontend
RUN npm ci # Using 'npm ci' is faster and safer for automated builds

# 2. Inject environment variables for Vite at build time
ARG VITE_API_URL
ARG VITE_OTHER_VAR
ENV VITE_API_URL=$VITE_API_URL \
    VITE_OTHER_VAR=$VITE_OTHER_VAR

# 3. Copy the rest of the frontend source files
COPY frontend/tsconfig.json frontend/vite.config.ts frontend/index.html ./
COPY frontend/public ./public
COPY frontend/src ./src

# 4. Build the static assets
RUN npm run build

# 5. Production runner stage (Nginx)
FROM nginx:1.25-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
