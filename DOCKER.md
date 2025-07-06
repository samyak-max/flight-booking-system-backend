# Docker Instructions for Flight Booking Backend

This document explains how to build, run, and deploy the Flight Booking Backend application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine

## Development Environment

To run the application in development mode:

```bash
# Start the application with hot-reload enabled
docker-compose up

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```

This will:
- Build the Docker image using the development target
- Mount your local code as a volume for hot reloading
- Expose the application on port 5000

## Production Build

To build and run a production-ready container:

```bash
# Build the production image
docker build -t flight-booking-api:latest .

# Run the production container
docker run -p 5000:5000 --env-file .env flight-booking-api:latest
```

## Environment Variables

Make sure to create a `.env` file with the necessary environment variables. You can use the `.env.example` file as a template.

## Deployment

### Deploying to Azure App Service

```bash
# Build and tag the image
docker build -t yourregistry.azurecr.io/flight-booking-api:latest .

# Push the image to Azure Container Registry
docker push yourregistry.azurecr.io/flight-booking-api:latest

# Deploy to App Service
az webapp config container set --name your-app-service-name --resource-group your-resource-group --docker-custom-image-name yourregistry.azurecr.io/flight-booking-api:latest
```

### Deploying to AWS ECS

```bash
# Build and tag the image
docker build -t your-aws-account-id.dkr.ecr.region.amazonaws.com/flight-booking-api:latest .

# Authenticate Docker to your ECR registry
aws ecr get-login-password --region region | docker login --username AWS --password-stdin your-aws-account-id.dkr.ecr.region.amazonaws.com

# Push the image
docker push your-aws-account-id.dkr.ecr.region.amazonaws.com/flight-booking-api:latest
```

Then update your ECS service to use the new image.

## Docker Image Optimization

The Dockerfile uses a multi-stage build process to keep the final image size small:
1. The development stage installs all dependencies and builds the application
2. The production stage only includes the production dependencies and the built app

## Troubleshooting

- If you encounter permission issues, try running Docker commands with sudo
- Make sure your .env file contains all required environment variables
- If changes aren't reflected, try rebuilding the image with `docker-compose build`
- For common Docker issues specific to this project, see [DOCKER-TROUBLESHOOT.md](./DOCKER-TROUBLESHOOT.md)

### NestJS CLI in Docker

To ensure the NestJS CLI works correctly in Docker, we've implemented these solutions:

1. The Dockerfile now installs NestJS CLI globally with a specific version:
   ```dockerfile
   RUN npm install -g @nestjs/cli@11.0.7
   ```

2. The docker-compose.yml uses the npm script to run the app:
   ```yml
   command: npm run start:dev
   ```

3. We use the `--legacy-peer-deps` flag for npm installations to handle dependency conflicts:
   ```dockerfile
   RUN npm install --legacy-peer-deps
   ```
   ```

3. A custom npm script that doesn't rely on global NestJS CLI:
   ```json
   "start:dev:docker": "node ./node_modules/@nestjs/cli/bin/nest.js start --watch"
   ```

You can uncomment the alternative command in docker-compose.yml if needed:
```yml
# command: npm run start:dev:docker
```
