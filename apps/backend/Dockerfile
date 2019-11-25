# Build state
FROM node:12-alpine as builder

LABEL name="EVA - Backend Challenge"
LABEL maintainer="Vladimir Salvador <alonsovla@gmail.com>"

# Creates an app foderl and copy the code
WORKDIR /app
COPY . .

# Clean node cache
RUN npm cache clean --force && \
    # Install dependencias
    npm install             && \
    # Build production artifacts ("/dist" folder)
    npm run build

# Production stage
FROM node:12-alpine

# Creates app folder
WORKDIR /app

# Copy dependency files into /app
COPY package.json .
COPY package-lock.json .

# Install only production dependencies
RUN npm install --production

# Copy Artifacts from builder into /app
COPY --from=builder /app/dist .

EXPOSE 3000

# Entrypoint to production script
CMD node /app/main
