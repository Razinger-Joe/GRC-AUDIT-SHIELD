# Multi-stage Dockerfile for production deployment
# This combines frontend and backend into a single container (monolithic approach)

# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Backend with nginx to serve frontend
FROM python:3.11-slim

WORKDIR /app

# Install nginx and system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend ./backend

# Copy built frontend from previous stage
COPY --from=frontend-build /app/dist /var/www/html

# Configure nginx
RUN echo 'server { \
    listen 8080; \
    server_name _; \
    \
    # Serve frontend \
    location / { \
    root /var/www/html; \
    try_files $uri $uri/ /index.html; \
    } \
    \
    # Proxy API requests to backend \
    location /api { \
    proxy_pass http://localhost:8000; \
    proxy_set_header Host $host; \
    proxy_set_header X-Real-IP $remote_addr; \
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
    proxy_set_header X-Forwarded-Proto $scheme; \
    } \
    \
    # Health check \
    location /health { \
    proxy_pass http://localhost:8000/health; \
    } \
    }' > /etc/nginx/sites-available/default

# Create uploads directory
RUN mkdir -p /app/backend/uploads

# Create startup script
RUN echo '#!/bin/bash\n\
    nginx\n\
    cd /app/backend && uvicorn main:app --host 0.0.0.0 --port 8000\n\
    ' > /start.sh && chmod +x /start.sh

# Expose port
EXPOSE 8080

# Start both nginx and uvicorn
CMD ["/start.sh"]
