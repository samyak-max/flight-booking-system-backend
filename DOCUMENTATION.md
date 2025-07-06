# Flight Booking Backend Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Architecture](#architecture)
4. [Getting Started](#getting-started)
5. [API Documentation](#api-documentation)
6. [Core Modules](#core-modules)
7. [Authentication](#authentication)
8. [Database](#database)
9. [Caching](#caching)
10. [Docker and Deployment](#docker-and-deployment)
11. [Testing](#testing)
12. [Development Workflow](#development-workflow)
13. [Troubleshooting](#troubleshooting)

## Introduction

The Flight Booking Backend is a comprehensive API for managing airline flight bookings, built with NestJS. This system enables searching for flights, managing bookings, processing tickets, and handling user authentication.

## Project Overview

This application serves as the backend for a complete flight booking platform, with the following key features:

- Flight search with filtering capabilities
- User authentication and authorization
- Booking management
- Ticket generation and management
- User profile and preferences
- Real-time flight status updates
- Passenger information management

## Architecture

The application follows the NestJS modular architecture pattern, which is based on Angular's architecture. It uses:

- **Modules**: Encapsulate related components
- **Controllers**: Handle HTTP requests and return responses
- **Services**: Contain business logic
- **DTOs**: Define data transfer objects for validation and type safety
- **Guards**: Protect routes based on conditions (like authentication)
- **Interfaces**: Define type structures

The system follows a clean architecture approach, separating concerns into distinct layers:

1. **Presentation Layer**: Controllers handling HTTP requests
2. **Business Logic Layer**: Services implementing core functionality
3. **Data Access Layer**: Supabase service for database operations

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Docker and Docker Compose (for containerized development/deployment)
- Supabase account and project

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
```

### Environment Variables

Create a `.env` file with the following variables:

```
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_SERVICE_ROLE=your-service-role-key
JWT_SECRET=your-jwt-secret
```

### Running the Application

#### Local Development

```bash
# Development mode with hot reload
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

#### Using Docker

```bash
# Start with Docker Compose
docker-compose up

# Run in detached mode
docker-compose up -d
```

## API Documentation

The API documentation is available via Swagger UI at `/api` when the application is running. It provides:

- Detailed endpoint information
- Request/response schemas
- Authentication requirements
- Testing capability directly from the UI

### Swagger Configuration

The Swagger documentation is configured in `main.ts` with tags for different API sections:
- auth: Authentication endpoints
- flights: Flight search and information
- bookings: Booking management
- tickets: Ticket operations
- users: User profile and preferences
- flight-status: Real-time flight status updates

## Core Modules

### Auth Module
Handles user authentication, registration, and authorization via JWT tokens.

**Key components:**
- `auth.controller.ts`: Exposes signup and login endpoints
- `auth.service.ts`: Handles authentication logic using Supabase auth
- `jwt.strategy.ts`: Implements JWT validation strategy
- `jwt.auth.guard.ts`: Protects routes requiring authentication

### Flight Module
Manages flight information, searches, and availability.

**Key components:**
- `flight.controller.ts`: Provides endpoints for flight searches
- `flight.service.ts`: Implements flight search logic with caching
- `flight-search.dto.ts`: Validates flight search parameters

### Booking Module
Handles the creation and management of bookings.

**Key components:**
- `booking.controller.ts`: Exposes booking endpoints
- `booking.service.ts`: Implements booking creation and management
- `create-booking.dto.ts`: Validates booking creation requests

### Passenger Module
Manages passenger information for bookings.

**Key components:**
- `passenger.service.ts`: Handles passenger creation and retrieval
- `create-passenger.dto.ts`: Validates passenger information

### Ticket Module
Manages ticket generation and retrieval.

**Key components:**
- `ticket.controller.ts`: Exposes ticket endpoints
- `ticket.service.ts`: Handles ticket creation and management

### User Module
Manages user profiles and preferences.

**Key components:**
- `user.controller.ts`: Provides user-related endpoints
- `user.service.ts`: Handles user profile operations
- `user-preferences.dto.ts`: Validates user preference updates

### Flight Status Module
Provides real-time flight status updates.

**Key components:**
- `flight-status.controller.ts`: Exposes flight status endpoints
- `flight-status.service.ts`: Handles status updates and notifications
- `flight-status-update.dto.ts`: Validates status update requests

## Authentication

The system uses JWT (JSON Web Token) based authentication:

1. **Registration**: Users register with email and password
2. **Login**: Users authenticate to receive a JWT token
3. **Authorization**: Protected routes require a valid JWT token

### JWT Implementation

- Token generation happens in the Auth Service
- Token validation uses the JWT Strategy
- Route protection uses the JwtAuthGuard

### Role-Based Access

The system supports role-based access control:
- User roles stored in user profiles
- RolesGuard checks if a user has required roles for specific operations

## Database

The application uses Supabase as its database service.

### Key Tables

- **flights**: Stores flight information
- **bookings**: Records booking details
- **passengers**: Stores passenger information
- **tickets**: Manages ticket details
- **profiles**: Stores user profiles and preferences

### Database Access

All database operations go through the SupabaseService, which provides a client for interacting with Supabase:

```typescript
@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;
    
    constructor(private readonly configService: ConfigService) {
        this.supabase = createClient(
            this.configService.get<string>('SUPABASE_URL')!,
            this.configService.get<string>('SUPABASE_SERVICE_ROLE')!
        );
    }

    getClient(): SupabaseClient {
        return this.supabase;
    }
}
```

## Caching

The application uses NestJS's cache manager to improve performance:

- Flight search results are cached for 15 minutes (900 seconds)
- Cache invalidation occurs when flight data changes

Example from FlightService:

```typescript
const cacheKey = `internal-flights:${JSON.stringify(searchDto)}`;
const cached = await this.cacheManager.get<Flight[]>(cacheKey);
if (cached) return cached;

// ... perform search ...

await this.cacheManager.set(cacheKey, results, 900);
```

## Docker and Deployment

### Docker Configuration

The application uses a multi-stage Docker build process:

1. **Development Stage**: Includes all dependencies for development
2. **Production Stage**: Slimmed down with only production dependencies

### Development Environment

```bash
docker-compose up
```

This runs the application with:
- Hot reload enabled
- Source code mounted as a volume
- Application accessible on port 5000

### Production Deployment

Build a production-ready image:

```bash
docker build -t flight-booking-api:latest .
```

Run the production container:

```bash
docker run -p 5000:5000 --env-file .env flight-booking-api:latest
```

### Deployment Options

The application can be deployed to various cloud providers:

- **Azure App Service**
- **AWS ECS**
- **Google Cloud Run**
- **Self-hosted Docker environments**

Detailed deployment instructions are available in the [DOCKER.md](./DOCKER.md) file.

## Testing

### Unit Tests

Run unit tests with:

```bash
npm run test
```

Unit tests cover service and controller logic using the NestJS testing utilities.

### End-to-End Tests

Run E2E tests with:

```bash
npm run test:e2e
```

E2E tests validate the complete API functionality using Supertest.

### Test Coverage

Generate test coverage reports with:

```bash
npm run test:cov
```

## Development Workflow

### Code Style and Linting

The project uses ESLint and Prettier for code style consistency:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### API Documentation Generation

Generate API documentation with:

```bash
npm run generate-swagger
```

This creates a static Swagger file that can be shared with frontend developers.

### Adding New Features

1. Create a new module using NestJS CLI: `nest g module new-feature`
2. Add controller and service: `nest g controller new-feature` and `nest g service new-feature`
3. Define DTOs for data validation
4. Implement business logic in the service
5. Define API endpoints in the controller
6. Add module to app.module.ts imports

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check Supabase URL and service role keys
   - Verify network connectivity to Supabase

2. **JWT Authentication Problems**
   - Ensure JWT_SECRET is properly set
   - Check token expiration times

3. **Docker-related Issues**
   - See [DOCKER-TROUBLESHOOT.md](./DOCKER-TROUBLESHOOT.md) for specific Docker troubleshooting

### Logging

The application uses NestJS's built-in logger. Set the appropriate log level in the configuration:

```typescript
// main.ts
const app = await NestFactory.create(AppModule, {
  logger: ['error', 'warn', 'log', 'debug', 'verbose'],
});
```

For production, consider using only ['error', 'warn', 'log'] to reduce verbosity.

### Support

For additional support:
- Raise an issue on the project repository
- Contact the development team
