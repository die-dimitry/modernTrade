# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Create data directories
RUN mkdir -p data/uploads "data/Contact Us Outputs" "data/User Consent Outputs"

# Expose port
EXPOSE 4000

# Start application
CMD ["node", "dist/index.js"]



