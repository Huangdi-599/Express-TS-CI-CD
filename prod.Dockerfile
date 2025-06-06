# Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Copy package files first to leverage caching
COPY --chown=node:node package*.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node src/ ./src/

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:18-slim

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    MONGODB_URI=mongodb://admin:admin@mongo:27017/express-ts-app?authSource=admin

# Create app directory and set ownership
WORKDIR /app
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Copy package files
COPY --chown=node:node package*.json ./

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built files from builder stage
COPY --chown=node:node --from=builder /app/dist ./dist

# Copy public folder for static files
COPY --chown=node:node --from=builder /app/src/public ./src/public

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
    CMD node -e "const http = require('http'); \
    const options = { host: 'localhost', port: ${PORT}, timeout: 2000 }; \
    const request = http.get(options, (res) => process.exit(res.statusCode === 200 ? 0 : 1)); \
    request.on('error', () => process.exit(1));"

# Start the application
CMD ["node", "dist/index.js"]
