# Frontend Dockerfile built from repository root
FROM node:20-alpine AS builder
WORKDIR /app

COPY .env* ./
COPY frontend/package.json ./frontend/package.json
COPY frontend/tsconfig.json ./frontend/tsconfig.json
COPY frontend/vite.config.ts ./frontend/vite.config.ts
COPY frontend/index.html ./frontend/index.html
COPY frontend/public ./frontend/public
COPY frontend/src ./frontend/src

WORKDIR /app/frontend
RUN npm install --omit=dev
RUN npm run build

FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
