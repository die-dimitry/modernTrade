# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Create data directories
RUN mkdir -p data/uploads "data/Contact Us Outputs" "data/User Consent Outputs"

# Expose port
EXPOSE 4000

# Start application
CMD ["node", "dist/index.js"]


