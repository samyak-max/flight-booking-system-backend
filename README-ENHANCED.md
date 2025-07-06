# Flight Booking Backend

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <h2>Flight Booking System API Documentation</h2>
  <p>A comprehensive backend API for a complete flight booking platform</p>
</div>

## 📋 Table of Contents
- [Introduction](#-introduction)
- [System Architecture](#-system-architecture)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Core Modules](#-core-modules)
- [Data Models](#-data-models)
- [Authentication & Security](#-authentication--security)
- [Database Integration](#-database-integration)
- [Containerization & Deployment](#-containerization--deployment)
- [Testing](#-testing)
- [Development Guidelines](#-development-guidelines)

## 🚀 Introduction

The Flight Booking Backend is a scalable, feature-rich API built with NestJS that powers a complete flight booking platform. This system enables users to search for flights, manage bookings, process tickets, and handle user authentication and preferences.

### Key Features

✅ **Flight Search & Filtering**: Search flights by origin, destination, dates, and cabin class  
✅ **User Authentication**: Secure login and registration with JWT  
✅ **Booking Management**: Create and manage flight bookings  
✅ **Ticket Processing**: Generate electronic tickets for passengers  
✅ **User Preferences**: Store and retrieve user preferences  
✅ **Flight Status Updates**: Real-time flight status tracking  
✅ **Passenger Management**: Store passenger details compliant with airline regulations  

## 🏗 System Architecture

The application follows the NestJS architecture pattern with a modular design that separates concerns for maintainability and scalability.

```
┌─────────────────────────────────────────────────────────────┐
│                          API Layer                           │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐     │
│  │    Auth      │   │    Flight    │   │   Booking    │     │
│  │  Controller  │   │  Controller  │   │  Controller  │     │
│  └──────────────┘   └──────────────┘   └──────────────┘     │
├─────────────────────────────────────────────────────────────┤
│                       Service Layer                          │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐     │
│  │    Auth      │   │    Flight    │   │   Booking    │     │
│  │   Service    │   │   Service    │   │   Service    │     │
│  └──────────────┘   └──────────────┘   └──────────────┘     │
├─────────────────────────────────────────────────────────────┤
│                       Data Access Layer                      │
│               ┌───────────────────────────────┐             │
│               │        Supabase Service        │             │
│               └───────────────────────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker
- **Caching**: NestJS Cache Manager
- **Validation**: Class Validator & Class Transformer

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Docker and Docker Compose (optional)
- Supabase account and project

### Local Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd flight-booking-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run start:dev
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Application port | 5000 |
| NODE_ENV | Environment (development/production) | development |
| SUPABASE_URL | Supabase project URL | https://yourproject.supabase.co |
| SUPABASE_SERVICE_ROLE | Supabase service role key | eyJhbGciOiJIUzI1NiIsInR5... |
| JWT_SECRET | Secret for JWT signing | your-secret-key |

### Using Docker

```bash
# Start with Docker Compose
docker-compose up

# Start in detached mode
docker-compose up -d
```

## 📡 API Endpoints

The API is fully documented using Swagger, accessible at `/api` when the application is running. Below is a summary of the main endpoints:

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | /auth/signup | Register new user | No |
| POST | /auth/login | Authenticate user | No |

### Flights

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | /flights/search | Search flights | No |
| GET | /flights/:id | Get flight details | No |

### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| POST | /bookings | Create booking | Yes |
| GET | /bookings | List user bookings | Yes |
| GET | /bookings/:id | Get booking details | Yes |

### Tickets

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | /tickets/:id | Get ticket details | Yes |
| GET | /tickets/booking/:bookingId | Get tickets for booking | Yes |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | /users/profile | Get user profile | Yes |
| PATCH | /users/preferences | Update preferences | Yes |

### Flight Status

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| GET | /flight-status/:flightNumber | Get status | No |
| PATCH | /flight-status/:id | Update status | Yes (Admin) |

## 📦 Core Modules

The application is organized into the following core modules:

### Auth Module

Handles user authentication, registration, and JWT token management.

**Key components:**
- Controllers: Handle login and signup requests
- Services: Implement authentication logic with Supabase
- Guards: Protect routes requiring authentication
- Strategies: Implement JWT validation

### Flight Module

Manages flight information, searches, and availability.

**Key components:**
- Controllers: Expose flight search endpoints
- Services: Implement flight search with caching
- DTOs: Validate flight search parameters
- Interfaces: Define flight data structures

### Booking Module

Handles the creation and management of bookings.

**Key components:**
- Controllers: Expose booking management endpoints
- Services: Implement booking creation and retrieval
- DTOs: Validate booking requests

### Passenger Module

Manages passenger information for bookings.

**Key components:**
- Services: Handle passenger creation and management
- DTOs: Define passenger information structures

### Ticket Module

Manages ticket generation and retrieval.

**Key components:**
- Controllers: Expose ticket endpoints
- Services: Handle ticket creation and retrieval
- DTOs: Define ticket creation parameters

### User Module

Manages user profiles and preferences.

**Key components:**
- Controllers: Provide user profile endpoints
- Services: Implement user preference management
- DTOs: Validate user preference updates

### Flight Status Module

Provides real-time flight status updates.

**Key components:**
- Controllers: Expose status endpoints
- Services: Handle status updates
- DTOs: Define status update parameters

## 📊 Data Models

### Flight

```typescript
interface Flight {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  price: number;
  availableSeats: Record<string, number>;
  status: FlightStatus;
}
```

### Booking

```typescript
interface Booking {
  id: string;
  userId: string;
  flightId: string;
  returnFlightId?: string;
  bookingReference: string;
  totalPrice: number;
  cabinClass: CabinClass;
  passengerCount: number;
  createdAt: string;
  status: BookingStatus;
}
```

### Passenger

```typescript
interface Passenger {
  id: string;
  bookingId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber?: string;
  passengerType: PassengerType;
}
```

### Ticket

```typescript
interface Ticket {
  id: string;
  bookingId: string;
  passengerId: string;
  ticketNumber: string;
  issuedAt: string;
  flightId: string;
}
```

### User Profile

```typescript
interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  seatPreference?: 'window' | 'aisle' | 'middle';
  mealPreference?: string;
  notificationEnabled?: boolean;
}
```

## 🔐 Authentication & Security

### JWT Authentication Flow

1. **User Registration/Login**: User provides credentials to /auth endpoints
2. **Token Generation**: Server validates credentials and generates JWT
3. **Token Usage**: Client includes JWT in Authorization header
4. **Token Validation**: JwtAuthGuard validates tokens on protected routes

### Security Features

- **Password Handling**: Passwords managed securely by Supabase Auth
- **JWT Expiration**: Tokens have limited validity period
- **Role-Based Access**: RolesGuard restricts access based on user roles
- **Request Validation**: DTOs enforce request data validation
- **Rate Limiting**: ThrottlerGuard prevents abuse

## 💾 Database Integration

The application uses Supabase as its database and authentication provider.

### Supabase Service

The SupabaseService provides a central client for all database operations:

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

### Database Schema

The database includes the following main tables:

- **airports**: Airport information
- **flights**: Flight details
- **bookings**: Booking records
- **passengers**: Passenger information
- **tickets**: Ticket details
- **profiles**: User profiles and preferences

## 🐳 Containerization & Deployment

### Docker Configuration

The application uses a multi-stage Docker build for optimal image size and performance:

```dockerfile
# Development stage
FROM node:18-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install -g @nestjs/cli@11.0.7
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/main"]
```

### Docker Compose

For development, a docker-compose.yml file provides a ready-to-use environment:

```yaml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    image: flight-booking-api
    container_name: flight-booking-api
    ports:
      - "5000:5000"
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    command: npm run start:dev
    env_file:
      - .env
    environment:
      - NODE_ENV=development
    restart: unless-stopped
```

### Deployment Options

The application can be deployed to various cloud providers:

- **Azure App Service**
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Kubernetes**

Detailed deployment instructions are available in the [DOCKER.md](./DOCKER.md) file.

## 🧪 Testing

### Unit Tests

The application includes unit tests for services and controllers:

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:cov
```

### End-to-End Tests

E2E tests validate the API functionality:

```bash
# Run E2E tests
npm run test:e2e
```

### Test Configuration

Test configuration is defined in:
- `jest.config.js` for unit tests
- `test/jest-e2e.json` for E2E tests

## 📝 Development Guidelines

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### API Documentation

Update API documentation by:

1. Using proper decorators in controllers
2. Running the Swagger generator

```bash
npm run generate-swagger
```

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- Feature branches: Named as `feature/feature-name`

### Commit Guidelines

Follow conventional commits:

```
feat: add new flight search endpoint
fix: resolve booking creation issue
docs: update API documentation
```

### Pull Request Process

1. Create PR from feature branch to develop
2. Ensure tests pass
3. Get code review approval
4. Merge to develop

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NestJS team for the excellent framework
- Supabase for the backend service platform
- The development team for their contributions
