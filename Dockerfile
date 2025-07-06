# Use Node.js 18 as the base image
FROM node:18-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies including dev dependencies and NestJS CLI
RUN npm install --legacy-peer-deps
RUN npm install -g @nestjs/cli@11.0.7

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set NODE_ENV to production
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --legacy-peer-deps

# Copy built app from development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 5000

# Start the server using production build
CMD ["node", "dist/src/main"]
