# ✈️ Flight Booking System - Backend API

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <h2>Flight Booking System API Documentation</h2>
  <p>A comprehensive backend API for a complete flight booking platform</p>
  
  ![NestJS](https://img.shields.io/badge/NestJS-11.0.1-e0234e?style=for-the-badge&logo=nestjs)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178c6?style=for-the-badge&logo=typescript)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)
  ![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?style=for-the-badge&logo=docker)
  ![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?style=for-the-badge&logo=supabase)
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
- [Real-time Features](#-real-time-features)
- [Containerization & Deployment](#-containerization--deployment)
- [Testing](#-testing)
- [Development Guidelines](#-development-guidelines)
- [Performance & Monitoring](#-performance--monitoring)

## 🚀 Introduction

The Flight Booking Backend is a **production-ready**, **scalable** API built with **NestJS** that powers a complete flight booking platform. This system enables users to search for flights, manage bookings, process tickets, and handle user authentication with real-time flight status updates.

### 🌟 Key Features

✅ **Flight Search & Filtering**: Advanced search with multiple criteria and caching  
✅ **User Authentication**: JWT-based authentication with Supabase integration  
✅ **Booking Management**: End-to-end booking process with validation  
✅ **Ticket Processing**: Electronic ticket generation and management  
✅ **Real-time Updates**: Server-Sent Events for live flight status  
✅ **User Preferences**: Personalized user experience settings  
✅ **Passenger Management**: IATA-compliant passenger data handling  
✅ **Admin Dashboard**: Administrative controls and monitoring  
✅ **API Documentation**: Comprehensive Swagger/OpenAPI documentation  
✅ **Containerization**: Docker-ready for easy deployment  

### 🎯 Architecture Highlights

- **Modular Design**: Clean separation of concerns
- **Microservice Ready**: Easily scalable architecture
- **Database Agnostic**: Supabase PostgreSQL with easy migration
- **Real-time Capable**: SSE for live updates
- **Security First**: JWT authentication with role-based access
- **Performance Optimized**: Caching and efficient database queries  

## 🏗️ System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Next.js Frontend] --> B[REST API Calls]
        A --> C[SSE Connection]
    end
    
    subgraph "API Gateway Layer"
        D[NestJS Application] --> E[Controllers]
        E --> F[Guards & Middleware]
        F --> G[Service Layer]
    end
    
    subgraph "Business Logic Layer"
        G --> H[Auth Service]
        G --> I[Flight Service]
        G --> J[Booking Service]
        G --> K[Ticket Service]
        G --> L[User Service]
        G --> M[Flight Status Service]
    end
    
    subgraph "Data Layer"
        N[Supabase Service] --> O[PostgreSQL Database]
        N --> P[Supabase Auth]
        N --> Q[Real-time Subscriptions]
    end
    
    subgraph "External Services"
        R[Email Service] --> S[Booking Confirmations]
        T[Payment Gateway] --> U[Transaction Processing]
    end
    
    B --> D
    C --> D
    H --> N
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
    
    J --> R
    J --> T
```

### Application Architecture

The application follows **Clean Architecture** principles with clear separation of concerns:

```mermaid
graph LR
    subgraph "Presentation Layer"
        A[Controllers] --> B[DTOs]
        B --> C[Pipes & Validators]
    end
    
    subgraph "Application Layer"
        D[Services] --> E[Business Logic]
        E --> F[Use Cases]
    end
    
    subgraph "Domain Layer"
        G[Entities] --> H[Interfaces]
        H --> I[Enums]
    end
    
    subgraph "Infrastructure Layer"
        J[Database] --> K[External APIs]
        K --> L[File System]
    end
    
    C --> D
    F --> G
    E --> J
```

### Module Architecture

```mermaid
graph TB
    subgraph "Core Modules"
        A[App Module] --> B[Auth Module]
        A --> C[Flight Module]
        A --> D[Booking Module]
        A --> E[Ticket Module]
        A --> F[User Module]
        A --> G[Flight Status Module]
        A --> H[Passenger Module]
    end
    
    subgraph "Shared Modules"
        I[Supabase Module] --> J[Database Service]
        K[Common Module] --> L[Enums & DTOs]
        M[Config Module] --> N[Environment Variables]
    end
    
    subgraph "Infrastructure"
        O[Guards] --> P[JWT Auth Guard]
        O --> Q[Roles Guard]
        R[Interceptors] --> S[Response Transformer]
        R --> T[Logging Interceptor]
    end
    
    B --> I
    C --> I
    D --> I
    E --> I
    F --> I
    G --> I
    H --> I
    
    A --> K
    A --> M
    A --> O
    A --> R
```

### Data Flow Architecture

```mermaid
sequenceDiagram
    participant Client as Frontend Client
    participant API as NestJS API
    participant Auth as Auth Service
    participant DB as Supabase DB
    participant Cache as Cache Layer
    
    Client->>API: HTTP Request
    API->>Auth: Validate JWT Token
    Auth-->>API: Token Valid
    API->>Cache: Check Cache
    Cache-->>API: Cache Miss
    API->>DB: Database Query
    DB-->>API: Query Result
    API->>Cache: Store in Cache
    API-->>Client: HTTP Response
```

### Real-time Architecture

```mermaid
graph TB
    subgraph "Real-time Layer"
        A[SSE Controller] --> B[Flight Status Service]
        B --> C[Database Listeners]
        C --> D[Event Emitters]
    end
    
    subgraph "Client Connections"
        E[Frontend Client 1] --> F[SSE Stream 1]
        G[Frontend Client 2] --> H[SSE Stream 2]
        I[Frontend Client N] --> J[SSE Stream N]
    end
    
    subgraph "Database Events"
        K[Database Change] --> L[Trigger Event]
        L --> M[Broadcast to Clients]
    end
    
    F --> A
    H --> A
    J --> A
    D --> M
    M --> F
    M --> H
    M --> J
```

### Technology Stack

#### Backend Framework
- **NestJS 11.0.1** - Progressive Node.js framework
- **Node.js 18+** - JavaScript runtime
- **TypeScript 5.7.3** - Type-safe JavaScript
- **Express** - Web application framework

#### Database & Storage
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL 15** - Relational database
- **Supabase Auth** - Authentication service
- **Real-time Subscriptions** - Live data updates

#### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **Passport.js** - Authentication middleware
- **Class Validator** - Input validation
- **Helmet** - Security headers

#### Documentation & API
- **Swagger/OpenAPI 3** - API documentation
- **Class Transformer** - Object transformation
- **Nest CLI** - Development tools

#### Deployment & DevOps
- **Docker** - Containerization
- **Railway** - Cloud deployment platform
- **GitHub Actions** - CI/CD pipeline

## 🔧 Installation & Setup

### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **npm 9+** - Package manager
- **Docker** (optional) - For containerization
- **Supabase Account** - Database and authentication
- **Git** - Version control

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/flight-booking-system-backend.git
cd flight-booking-system-backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration (see below)

# 4. Start the development server
npm run start:dev

# 5. Access the API
# API: http://localhost:5000
# Swagger Docs: http://localhost:5000/api
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application Configuration
NODE_ENV=development
PORT=5000

# Database Configuration (Supabase)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
SUPABASE_URL=https://[PROJECT_ID].supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE=your-supabase-service-role-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Environment Variables Reference

| Variable | Description | Required | Default | Example |
|----------|-------------|----------|---------|---------|
| `NODE_ENV` | Environment mode | ✅ | development | production |
| `PORT` | Application port | ✅ | 5000 | 3000 |
| `DATABASE_URL` | PostgreSQL connection string | ✅ | - | postgresql://... |
| `SUPABASE_URL` | Supabase project URL | ✅ | - | https://xyz.supabase.co |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ | - | eyJhbGciOiJIUzI1NiIs... |
| `SUPABASE_SERVICE_ROLE` | Supabase service role key | ✅ | - | eyJhbGciOiJIUzI1NiIs... |
| `JWT_SECRET` | JWT signing secret | ✅ | - | your-secret-key |
| `JWT_EXPIRES_IN` | JWT expiration time | ❌ | 24h | 1d, 2h, 30m |
| `CORS_ORIGIN` | CORS allowed origins | ❌ | * | http://localhost:3000 |
| `THROTTLE_TTL` | Rate limiting TTL (seconds) | ❌ | 60 | 60 |
| `THROTTLE_LIMIT` | Rate limiting max requests | ❌ | 100 | 100 |

### Quick Start Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debug mode
npm run start:dev:docker   # Start with Docker

# Production
npm run build              # Build the application
npm run start:prod         # Start production server

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests
npm run test:cov           # Run with coverage

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues
npm run format             # Format code with Prettier

# Documentation
npm run generate-swagger   # Generate API documentation
```

### Docker Setup

#### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Rebuild services
docker-compose up --build
```

#### Using Docker Directly

```bash
# Build the image
docker build -t flight-booking-backend .

# Run the container
docker run -p 5000:5000 --env-file .env flight-booking-backend

# Run with environment variables
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=your-db-url \
  flight-booking-backend
```

### Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Get your project credentials**:
   - Go to Settings → API
   - Copy the Project URL and API keys

3. **Set up the database schema**:
   ```sql
   -- Example schema (customize as needed)
   CREATE TABLE flights (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     flight_number VARCHAR(10) NOT NULL,
     airline VARCHAR(100) NOT NULL,
     origin VARCHAR(10) NOT NULL,
     destination VARCHAR(10) NOT NULL,
     departure_time TIMESTAMP NOT NULL,
     arrival_time TIMESTAMP NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Enable Row Level Security (RLS)**:
   ```sql
   ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
   ```

### Health Check

After setup, verify the application is running:

```bash
# Check application health
curl http://localhost:5000/

# Expected response:
{
  "status": "ok",
  "timestamp": "2025-07-06T12:00:00.000Z",
  "uptime": 123.45
}

# Check API documentation
curl http://localhost:5000/api
```

### Troubleshooting

#### Common Issues

1. **Port already in use**:
   ```bash
   # Find and kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Database connection failed**:
   - Verify Supabase credentials
   - Check network connectivity
   - Ensure database is running

3. **JWT secret not set**:
   - Make sure JWT_SECRET is at least 32 characters
   - Use a secure random string generator

4. **Module not found errors**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

#### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export DEBUG=nest:*

# Or start with debug flag
npm run start:debug
```

### Development Tools

#### Recommended VS Code Extensions

- **NestJS Files** - File templates for NestJS
- **TypeScript Importer** - Auto import for TypeScript
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Thunder Client** - API testing
- **Docker** - Container management

#### Useful Commands

```bash
# Generate new module
nest generate module users

# Generate new controller
nest generate controller users

# Generate new service
nest generate service users

# Generate complete resource
nest generate resource users
```

## 📡 API Endpoints

The API is fully documented using **Swagger/OpenAPI 3.0**, accessible at `/api` when the application is running.

### 🔗 Base URLs

- **Development**: `http://localhost:5000`
- **Production**: `https://your-app.railway.app`
- **Swagger Docs**: `{BASE_URL}/api`

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| `POST` | `/auth/login` | User login | `{ email, password }` | `{ access_token, user }` |
| `POST` | `/auth/register` | User registration | `{ email, password, firstName, lastName }` | `{ access_token, user }` |
| `GET` | `/auth/profile` | Get current user | - | `{ user }` |
| `POST` | `/auth/refresh` | Refresh JWT token | `{ refresh_token }` | `{ access_token }` |

#### Authentication Examples

```bash
# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Register
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
```

### ✈️ Flight Endpoints

| Method | Endpoint | Description | Auth Required | Query Parameters |
|--------|----------|-------------|---------------|------------------|
| `GET` | `/flights/search` | Search flights | ❌ | `origin`, `destination`, `date`, `returnDate`, `passengers`, `cabinClass` |
| `GET` | `/flights/:id` | Get flight details | ❌ | - |
| `GET` | `/flights` | List all flights | ❌ | `page`, `limit`, `sort` |

#### Flight Search Examples

```bash
# Search one-way flights
curl "http://localhost:5000/flights/search?origin=NYC&destination=LAX&date=2024-01-01&passengers=2&cabinClass=ECONOMY"

# Search round-trip flights
curl "http://localhost:5000/flights/search?origin=NYC&destination=LAX&date=2024-01-01&returnDate=2024-01-07&passengers=2"

# Get flight details
curl "http://localhost:5000/flights/ABC123"
```

### 📝 Booking Endpoints

| Method | Endpoint | Description | Auth Required | Body |
|--------|----------|-------------|---------------|------|
| `POST` | `/bookings` | Create new booking | ✅ | `{ flightId, passengers, cabinClass }` |
| `GET` | `/bookings` | Get user bookings | ✅ | - |
| `GET` | `/bookings/:id` | Get booking details | ✅ | - |
| `PATCH` | `/bookings/:id` | Update booking | ✅ | `{ status }` |
| `DELETE` | `/bookings/:id` | Cancel booking | ✅ | - |

#### Booking Examples

```bash
# Create booking
curl -X POST http://localhost:5000/bookings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "flightId": "flight-123",
    "passengers": [
      {
        "fullName": "John Doe",
        "dob": "1990-01-01",
        "nationality": "US",
        "passportNumber": "123456789",
        "type": "ADULT"
      }
    ],
    "cabinClass": "ECONOMY"
  }'

# Get user bookings
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/bookings
```

### 🎫 Ticket Endpoints

| Method | Endpoint | Description | Auth Required | Response |
|--------|----------|-------------|---------------|----------|
| `GET` | `/tickets/:id` | Get ticket details | ✅ | `{ ticket, passenger, flight }` |
| `GET` | `/tickets/booking/:bookingId` | Get tickets for booking | ✅ | `{ tickets[] }` |
| `POST` | `/tickets/generate` | Generate ticket | ✅ | `{ ticket }` |
| `GET` | `/tickets/:id/download` | Download ticket PDF | ✅ | `PDF File` |

### 👤 User Endpoints

| Method | Endpoint | Description | Auth Required | Body |
|--------|----------|-------------|---------------|------|
| `GET` | `/users/profile` | Get user profile | ✅ | - |
| `PATCH` | `/users/profile` | Update profile | ✅ | `{ firstName, lastName }` |
| `PATCH` | `/users/preferences` | Update preferences | ✅ | `{ seatPreference, mealPreference }` |
| `DELETE` | `/users/account` | Delete account | ✅ | - |

#### User Management Examples

```bash
# Get profile
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:5000/users/profile

# Update preferences
curl -X PATCH http://localhost:5000/users/preferences \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "seatPreference": "window",
    "mealPreference": "vegetarian",
    "notificationEnabled": true
  }'
```

### 📊 Flight Status Endpoints

| Method | Endpoint | Description | Auth Required | Response |
|--------|----------|-------------|---------------|----------|
| `GET` | `/flight-status/:flightNumber` | Get flight status | ❌ | `{ status, delay, gate }` |
| `GET` | `/flight-status/updates` | SSE stream (all flights) | ❌ | `Event Stream` |
| `GET` | `/flight-status/updates/:flightId` | SSE stream (specific flight) | ❌ | `Event Stream` |
| `PATCH` | `/flight-status/:id` | Update flight status | ✅ (Admin) | `{ status, delay }` |

#### Real-time Status Examples

```bash
# Get flight status
curl http://localhost:5000/flight-status/AA123

# Subscribe to real-time updates (SSE)
curl -H "Accept: text/event-stream" \
  http://localhost:5000/flight-status/updates

# Subscribe to specific flight updates
curl -H "Accept: text/event-stream" \
  http://localhost:5000/flight-status/updates/flight-123
```

### 🛂 Passenger Endpoints

| Method | Endpoint | Description | Auth Required | Body |
|--------|----------|-------------|---------------|------|
| `POST` | `/passengers` | Add passenger | ✅ | `{ fullName, dob, nationality, passportNumber, type }` |
| `GET` | `/passengers/:id` | Get passenger details | ✅ | - |
| `PATCH` | `/passengers/:id` | Update passenger | ✅ | `{ fullName, passportNumber }` |
| `DELETE` | `/passengers/:id` | Delete passenger | ✅ | - |

### 📈 Admin Endpoints

| Method | Endpoint | Description | Auth Required | Response |
|--------|----------|-------------|---------------|----------|
| `GET` | `/admin/stats` | Get system statistics | ✅ (Admin) | `{ bookings, users, flights }` |
| `GET` | `/admin/users` | List all users | ✅ (Admin) | `{ users[] }` |
| `GET` | `/admin/bookings` | List all bookings | ✅ (Admin) | `{ bookings[] }` |
| `POST` | `/admin/flights` | Create flight | ✅ (Admin) | `{ flight }` |

### 🔍 Search & Filter Parameters

#### Flight Search Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `origin` | string | Origin airport code | `NYC`, `LAX`, `LHR` |
| `destination` | string | Destination airport code | `NYC`, `LAX`, `LHR` |
| `date` | string | Departure date (YYYY-MM-DD) | `2024-01-01` |
| `returnDate` | string | Return date (optional) | `2024-01-07` |
| `passengers` | number | Number of passengers | `1`, `2`, `4` |
| `cabinClass` | string | Cabin class | `ECONOMY`, `BUSINESS`, `FIRST` |
| `sort` | string | Sort order | `price`, `duration`, `departure` |
| `minPrice` | number | Minimum price filter | `100` |
| `maxPrice` | number | Maximum price filter | `1000` |
| `airline` | string | Airline filter | `AA`, `DL`, `UA` |

#### Pagination Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | number | Page number | `1` |
| `limit` | number | Items per page | `10` |
| `sort` | string | Sort field | `createdAt` |
| `order` | string | Sort order | `DESC` |

### 📋 Response Formats

#### Standard Response Format

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "timestamp": "2025-07-06T12:00:00.000Z"
}
```

#### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "timestamp": "2025-07-06T12:00:00.000Z"
}
```

#### Pagination Response Format

```json
{
  "success": true,
  "data": {
    "items": [
      // Array of items
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 🔒 Authentication Header

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 🚨 Rate Limiting

The API implements rate limiting to prevent abuse:

- **Default**: 100 requests per minute per IP
- **Authenticated**: 1000 requests per minute per user
- **Admin**: Unlimited requests

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1625097600
```

### 📝 API Versioning

The API uses URL versioning:

- **v1**: `http://localhost:5000/api/v1/` (current)
- **v2**: `http://localhost:5000/api/v2/` (future)

### 🛡️ CORS Configuration

CORS is configured to allow requests from:

- `http://localhost:3000` (development frontend)
- `https://your-frontend.vercel.app` (production frontend)

### 📊 Health Check

Monitor API health with the health check endpoint:

```bash
curl http://localhost:5000/health

# Response:
{
  "status": "ok",
  "info": {
    "database": {
      "status": "up"
    },
    "memory": {
      "status": "up",
      "used": "120MB"
    }
  },
  "error": {},
  "details": {
    "database": {
      "status": "up"
    },
    "memory": {
      "status": "up",
      "used": "120MB"
    }
  }
}
```

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

## � Real-time Features

### Server-Sent Events (SSE) Architecture

The application provides real-time flight status updates using **Server-Sent Events (SSE)**, enabling live updates without polling.

#### SSE Implementation

```mermaid
sequenceDiagram
    participant Client as Frontend
    participant API as NestJS API
    participant Controller as SSE Controller
    participant Service as Flight Status Service
    participant DB as Database
    
    Client->>API: GET /flight-status/updates
    API->>Controller: Route to SSE Controller
    Controller->>Service: Subscribe to updates
    Service->>DB: Listen for changes
    DB-->>Service: Database change event
    Service-->>Controller: Emit update event
    Controller-->>Client: SSE Event Stream
    
    Note over Client,DB: Persistent connection maintained
    
    DB-->>Service: Another change
    Service-->>Controller: Emit update
    Controller-->>Client: Real-time update
```

#### Available SSE Endpoints

1. **All Flight Updates**
   ```
   GET /flight-status/updates
   ```
   - Receives updates for all flights
   - Useful for admin dashboards
   - Returns: All flight status changes

2. **Specific Flight Updates**
   ```
   GET /flight-status/updates/:flightId
   ```
   - Receives updates for a specific flight
   - Useful for passenger tracking
   - Returns: Status changes for one flight

#### SSE Event Format

```typescript
// Event data structure
interface FlightStatusUpdate {
  eventType: 'flight-status-update';
  data: {
    flightId: string;
    flightNumber: string;
    status: FlightStatus;
    timestamp: string;
    delay?: number;
    gate?: string;
    terminal?: string;
    reason?: string;
  };
}
```

#### Client-Side Implementation

```javascript
// Connect to SSE stream
const eventSource = new EventSource('/flight-status/updates/ABC123');

// Handle incoming events
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Flight status update:', data);
  
  // Update UI with new status
  updateFlightStatus(data);
};

// Handle connection errors
eventSource.onerror = (error) => {
  console.error('SSE connection error:', error);
};

// Close connection when done
eventSource.close();
```

### Flight Status States

```mermaid
stateDiagram-v2
    [*] --> SCHEDULED
    SCHEDULED --> DELAYED
    SCHEDULED --> BOARDING
    SCHEDULED --> CANCELLED
    
    DELAYED --> BOARDING
    DELAYED --> CANCELLED
    
    BOARDING --> DEPARTED
    BOARDING --> CANCELLED
    
    DEPARTED --> IN_AIR
    IN_AIR --> LANDED
    LANDED --> ARRIVED
    
    CANCELLED --> [*]
    ARRIVED --> [*]
```

### Real-time Event Types

| Event Type | Description | Data Included |
|------------|-------------|---------------|
| `flight-status-update` | Flight status changed | `status`, `delay`, `gate` |
| `flight-delay` | Flight delayed | `delay`, `reason` |
| `gate-change` | Gate assignment changed | `gate`, `terminal` |
| `boarding-started` | Boarding commenced | `gate`, `boardingTime` |
| `flight-cancelled` | Flight cancelled | `reason`, `refundInfo` |
| `flight-departed` | Flight departed | `actualDepartureTime` |
| `flight-arrived` | Flight arrived | `actualArrivalTime` |

### Real-time Service Architecture

```typescript
@Injectable()
export class FlightStatusService {
  private readonly eventEmitter = new EventEmitter();
  
  constructor(private supabase: SupabaseService) {
    this.setupDatabaseListeners();
  }
  
  // Subscribe to flight status updates
  subscribe(flightId?: string): Observable<FlightStatusUpdate> {
    return new Observable(subscriber => {
      const handler = (data: FlightStatusUpdate) => {
        if (!flightId || data.flightId === flightId) {
          subscriber.next(data);
        }
      };
      
      this.eventEmitter.on('flight-status-update', handler);
      
      return () => {
        this.eventEmitter.off('flight-status-update', handler);
      };
    });
  }
  
  // Set up database change listeners
  private setupDatabaseListeners() {
    this.supabase.getClient()
      .channel('flight-status-changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'flights' },
        (payload) => this.handleFlightUpdate(payload)
      )
      .subscribe();
  }
}
```

### Performance Optimizations

#### Connection Management
- **Connection Pooling**: Reuse database connections
- **Event Batching**: Batch multiple updates
- **Memory Management**: Clean up closed connections
- **Heartbeat**: Keep connections alive

#### Scalability Features
- **Horizontal Scaling**: Multiple server instances
- **Load Balancing**: Distribute SSE connections
- **Caching**: Cache frequently accessed data
- **Rate Limiting**: Prevent connection abuse

### Monitoring & Debugging

#### Health Checks
```bash
# Check SSE endpoint health
curl -H "Accept: text/event-stream" \
  http://localhost:5000/flight-status/updates

# Monitor active connections
curl http://localhost:5000/admin/sse-stats
```

#### Logging
```typescript
// SSE connection logging
@Injectable()
export class SSELogger {
  logConnection(clientId: string, endpoint: string) {
    console.log(`SSE: Client ${clientId} connected to ${endpoint}`);
  }
  
  logDisconnection(clientId: string, duration: number) {
    console.log(`SSE: Client ${clientId} disconnected after ${duration}ms`);
  }
  
  logEvent(clientId: string, eventType: string, data: any) {
    console.log(`SSE: Sent ${eventType} to client ${clientId}`, data);
  }
}
```

### Error Handling

#### Connection Errors
- **Automatic Reconnection**: Client-side reconnection logic
- **Exponential Backoff**: Prevent connection spam
- **Graceful Degradation**: Fallback to polling if SSE fails
- **Error Notifications**: Inform users of connection issues

#### Data Validation
- **Schema Validation**: Validate event data structure
- **Type Safety**: TypeScript interfaces for events
- **Sanitization**: Clean data before broadcasting
- **Rate Limiting**: Prevent event spam

### Security Considerations

#### Authentication
- **Optional Authentication**: SSE endpoints can be protected
- **Token Validation**: Validate JWT tokens for protected streams
- **User-Specific Streams**: Filter events by user permissions
- **Admin-Only Events**: Restrict sensitive updates

#### Data Privacy
- **Data Filtering**: Only send relevant data to clients
- **Sensitive Information**: Exclude private data from events
- **Audit Logging**: Log all real-time events
- **GDPR Compliance**: Respect user privacy preferences

## 💾 Database Integration

### Supabase Architecture

The application uses **Supabase** as its primary database and authentication provider, offering PostgreSQL with real-time capabilities.

```mermaid
graph TB
    subgraph "Supabase Platform"
        A[PostgreSQL Database] --> B[Row Level Security]
        B --> C[Real-time Subscriptions]
        C --> D[Authentication Service]
        D --> E[API Gateway]
    end
    
    subgraph "NestJS Application"
        F[Supabase Service] --> G[Database Operations]
        G --> H[Real-time Listeners]
        H --> I[Authentication Integration]
    end
    
    E --> F
    A --> F
    C --> H
    D --> I
```

### Supabase Service Implementation

```typescript
@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  
  constructor(private readonly configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_ROLE')!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        },
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      }
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
  
  // Database operations with error handling
  async query<T>(query: string, params?: any[]): Promise<T[]> {
    const { data, error } = await this.supabase.rpc(query, params);
    if (error) throw new DatabaseException(error.message);
    return data;
  }
}
```

### Database Schema

#### Core Tables

```mermaid
erDiagram
    users {
        uuid id PK
        string email UK
        string first_name
        string last_name
        jsonb preferences
        timestamp created_at
        timestamp updated_at
    }
    
    airports {
        string code PK
        string name
        string city
        string country
        string timezone
        float latitude
        float longitude
    }
    
    flights {
        uuid id PK
        string flight_number UK
        string airline
        string origin FK
        string destination FK
        timestamp departure_time
        timestamp arrival_time
        integer duration
        decimal price
        jsonb available_seats
        string status
        string aircraft_type
        timestamp created_at
    }
    
    bookings {
        uuid id PK
        uuid user_id FK
        uuid flight_id FK
        uuid return_flight_id FK
        string booking_reference UK
        decimal total_price
        string cabin_class
        integer passenger_count
        string status
        timestamp created_at
        timestamp updated_at
    }
    
    passengers {
        uuid id PK
        uuid booking_id FK
        string full_name
        date date_of_birth
        string nationality
        string passport_number
        string passenger_type
        jsonb special_requests
        timestamp created_at
    }
    
    tickets {
        uuid id PK
        uuid booking_id FK
        uuid passenger_id FK
        string ticket_number UK
        string seat_number
        timestamp issued_at
        timestamp expires_at
        string status
    }
    
    flight_status_history {
        uuid id PK
        uuid flight_id FK
        string status
        integer delay_minutes
        string gate
        string terminal
        string reason
        timestamp timestamp
        uuid updated_by FK
    }
    
    users ||--o{ bookings : "makes"
    airports ||--o{ flights : "origin"
    airports ||--o{ flights : "destination"
    flights ||--o{ bookings : "books"
    bookings ||--o{ passengers : "includes"
    bookings ||--o{ tickets : "generates"
    passengers ||--o{ tickets : "receives"
    flights ||--o{ flight_status_history : "tracks"
```

#### Database Indexes

```sql
-- Performance indexes
CREATE INDEX idx_flights_route ON flights(origin, destination);
CREATE INDEX idx_flights_departure ON flights(departure_time);
CREATE INDEX idx_flights_status ON flights(status);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX idx_passengers_booking ON passengers(booking_id);
CREATE INDEX idx_tickets_booking ON tickets(booking_id);

-- Composite indexes for common queries
CREATE INDEX idx_flights_search ON flights(origin, destination, departure_time, status);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
```

### Row Level Security (RLS)

Supabase RLS policies protect data at the database level:

```sql
-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Users can only see their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only create bookings for themselves
CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Passengers are tied to user's bookings
CREATE POLICY "Users can view own passengers" ON passengers
  FOR SELECT USING (
    booking_id IN (
      SELECT id FROM bookings WHERE user_id = auth.uid()
    )
  );
```

### Database Functions

Custom PostgreSQL functions for complex operations:

```sql
-- Search flights with availability
CREATE OR REPLACE FUNCTION search_flights(
  p_origin TEXT,
  p_destination TEXT,
  p_departure_date DATE,
  p_passengers INTEGER DEFAULT 1,
  p_cabin_class TEXT DEFAULT 'ECONOMY'
)
RETURNS TABLE (
  id UUID,
  flight_number TEXT,
  airline TEXT,
  departure_time TIMESTAMP,
  arrival_time TIMESTAMP,
  price DECIMAL,
  available_seats INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.flight_number,
    f.airline,
    f.departure_time,
    f.arrival_time,
    f.price,
    COALESCE((f.available_seats->p_cabin_class)::INTEGER, 0) as available_seats
  FROM flights f
  WHERE f.origin = p_origin
    AND f.destination = p_destination
    AND DATE(f.departure_time) = p_departure_date
    AND f.status = 'SCHEDULED'
    AND COALESCE((f.available_seats->p_cabin_class)::INTEGER, 0) >= p_passengers
  ORDER BY f.departure_time;
END;
$$ LANGUAGE plpgsql;

-- Update flight status with history
CREATE OR REPLACE FUNCTION update_flight_status(
  p_flight_id UUID,
  p_status TEXT,
  p_delay_minutes INTEGER DEFAULT 0,
  p_gate TEXT DEFAULT NULL,
  p_reason TEXT DEFAULT NULL,
  p_updated_by UUID DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Update flight status
  UPDATE flights 
  SET status = p_status,
      updated_at = NOW()
  WHERE id = p_flight_id;
  
  -- Insert status history
  INSERT INTO flight_status_history (
    flight_id, status, delay_minutes, gate, reason, updated_by, timestamp
  ) VALUES (
    p_flight_id, p_status, p_delay_minutes, p_gate, p_reason, p_updated_by, NOW()
  );
END;
$$ LANGUAGE plpgsql;
```

### Real-time Subscriptions

Database triggers for real-time updates:

```sql
-- Trigger for flight status changes
CREATE OR REPLACE FUNCTION notify_flight_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify via pg_notify for real-time updates
  PERFORM pg_notify(
    'flight_status_change',
    json_build_object(
      'flight_id', NEW.id,
      'flight_number', NEW.flight_number,
      'status', NEW.status,
      'timestamp', NOW()
    )::text
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to flights table
CREATE TRIGGER flight_status_change_trigger
  AFTER UPDATE OF status ON flights
  FOR EACH ROW
  EXECUTE FUNCTION notify_flight_status_change();
```

### Data Validation

Database constraints and validation:

```sql
-- Check constraints
ALTER TABLE flights 
  ADD CONSTRAINT valid_flight_status 
  CHECK (status IN ('SCHEDULED', 'DELAYED', 'BOARDING', 'DEPARTED', 'IN_AIR', 'LANDED', 'ARRIVED', 'CANCELLED'));

ALTER TABLE bookings 
  ADD CONSTRAINT valid_cabin_class 
  CHECK (cabin_class IN ('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'));

ALTER TABLE passengers 
  ADD CONSTRAINT valid_passenger_type 
  CHECK (passenger_type IN ('ADULT', 'CHILD', 'INFANT'));

-- Ensure departure is before arrival
ALTER TABLE flights 
  ADD CONSTRAINT valid_flight_times 
  CHECK (departure_time < arrival_time);

-- Ensure positive prices
ALTER TABLE flights 
  ADD CONSTRAINT positive_price 
  CHECK (price > 0);
```

### Database Migrations

Using Supabase migrations for schema changes:

```sql
-- Migration: 001_initial_schema.sql
CREATE TABLE airports (
  code VARCHAR(3) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  timezone VARCHAR(50) NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Migration: 002_add_flights_table.sql
CREATE TABLE flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flight_number VARCHAR(10) NOT NULL UNIQUE,
  airline VARCHAR(100) NOT NULL,
  origin VARCHAR(3) NOT NULL REFERENCES airports(code),
  destination VARCHAR(3) NOT NULL REFERENCES airports(code),
  departure_time TIMESTAMP NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  available_seats JSONB NOT NULL DEFAULT '{}',
  status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
  aircraft_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Connection Pooling

Optimize database connections:

```typescript
// Database configuration
const supabaseConfig = {
  db: {
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    }
  }
};
```

### Performance Monitoring

Database performance monitoring:

```sql
-- Monitor slow queries
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  min_time,
  max_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Monitor table sizes
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public';
```

## 🚀 Performance & Monitoring

### Performance Optimization Strategies

#### Database Optimization

```mermaid
graph TB
    subgraph "Query Optimization"
        A[Query Analysis] --> B[Index Optimization]
        B --> C[Query Rewriting]
        C --> D[Execution Plan Review]
    end
    
    subgraph "Connection Management"
        E[Connection Pooling] --> F[Connection Limits]
        F --> G[Timeout Configuration]
        G --> H[Health Checks]
    end
    
    subgraph "Caching Strategy"
        I[Application Cache] --> J[Database Cache]
        J --> K[Query Result Cache]
        K --> L[CDN Cache]
    end
    
    D --> I
    H --> I
```

#### Application Performance

```typescript
// Caching configuration
@Module({
  imports: [
    CacheModule.register({
      ttl: 300, // 5 minutes
      max: 1000, // max items in cache
      store: 'redis',
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    }),
  ],
})
export class AppModule {}

// Cache interceptor usage
@Injectable()
export class FlightService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private supabase: SupabaseService
  ) {}

  @CacheKey('flights_search')
  @CacheTTL(300)
  async searchFlights(searchParams: FlightSearchDto) {
    const cacheKey = `flights:${JSON.stringify(searchParams)}`;
    const cached = await this.cacheManager.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const flights = await this.performSearch(searchParams);
    await this.cacheManager.set(cacheKey, flights, 300);
    
    return flights;
  }
}
```

### Monitoring & Observability

#### Health Checks

```typescript
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly supabaseHealthIndicator: SupabaseHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.supabaseHealthIndicator.isHealthy('database'),
      () => this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
```

#### Application Metrics

```typescript
@Injectable()
export class MetricsService {
  private readonly performanceMetrics = new Map<string, number>();
  
  recordApiCall(endpoint: string, duration: number, statusCode: number) {
    const key = `api_${endpoint}_${statusCode}`;
    this.performanceMetrics.set(key, duration);
  }
  
  recordDatabaseQuery(query: string, duration: number) {
    const key = `db_query_${query.substring(0, 50)}`;
    this.performanceMetrics.set(key, duration);
  }
  
  getMetrics() {
    return Object.fromEntries(this.performanceMetrics);
  }
}
```

#### Error Tracking

```typescript
@Injectable()
export class ErrorTrackingService {
  private readonly errors: ErrorLog[] = [];
  
  logError(error: Error, context: string, userId?: string) {
    const errorLog: ErrorLog = {
      id: uuid(),
      message: error.message,
      stack: error.stack,
      context,
      userId,
      timestamp: new Date(),
      severity: this.determineSeverity(error),
    };
    
    this.errors.push(errorLog);
    
    // Send to external monitoring service
    this.sendToMonitoring(errorLog);
  }
  
  private determineSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    if (error.name === 'ValidationError') return 'low';
    if (error.name === 'UnauthorizedError') return 'medium';
    if (error.name === 'DatabaseError') return 'high';
    return 'critical';
  }
}
```

### Performance Benchmarks

#### Target Performance Metrics

| Metric | Target | Monitoring |
|--------|--------|------------|
| **Response Time** | < 200ms (95th percentile) | Application logs |
| **Database Queries** | < 100ms (average) | Query monitoring |
| **Memory Usage** | < 512MB | Health checks |
| **CPU Usage** | < 70% | System monitoring |
| **Error Rate** | < 1% | Error tracking |
| **Uptime** | > 99.9% | Health checks |

#### Load Testing

```bash
# Artillery load testing configuration
# artillery.yml
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Ramp up load"
    - duration: 300
      arrivalRate: 100
      name: "Sustained load"

scenarios:
  - name: "Flight search"
    weight: 70
    requests:
      - get:
          url: "/flights/search?origin=NYC&destination=LAX&date=2024-01-01"
  
  - name: "User authentication"
    weight: 20
    requests:
      - post:
          url: "/auth/login"
          json:
            email: "test@example.com"
            password: "password123"
  
  - name: "Create booking"
    weight: 10
    requests:
      - post:
          url: "/bookings"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            flightId: "{{ flightId }}"
            passengers: [{ fullName: "John Doe" }]
```

### Scaling Strategies

#### Horizontal Scaling

```yaml
# docker-compose.scale.yml
version: '3.8'
services:
  api:
    image: flight-booking-api
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    ports:
      - "5000-5002:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
```

#### Vertical Scaling

```dockerfile
# Production Dockerfile with resource optimization
FROM node:18-alpine AS production

# Set memory limits
ENV NODE_OPTIONS="--max-old-space-size=512"

# Use multi-core processing
ENV UV_THREADPOOL_SIZE=4

# Optimize V8 garbage collection
ENV NODE_ENV=production
ENV GC_GLOBAL_INTERVAL=30000

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production --no-audit --no-fund

COPY --from=build /usr/src/app/dist ./dist

USER node
EXPOSE 5000

CMD ["node", "dist/src/main.js"]
```

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

## 🐳 Containerization & Deployment

### Docker Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        A[Source Code] --> B[Development Container]
        B --> C[Hot Reload]
        C --> D[Local Testing]
    end
    
    subgraph "Production Build"
        E[Multi-stage Build] --> F[Dependencies Install]
        F --> G[Application Build]
        G --> H[Production Image]
    end
    
    subgraph "Deployment Targets"
        I[Railway] --> J[Container Registry]
        K[Docker Hub] --> J
        L[AWS ECR] --> J
        J --> M[Production Deployment]
    end
    
    D --> E
    H --> I
    H --> K
    H --> L
```

### Multi-stage Dockerfile

```dockerfile
# Base image for development
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install --legacy-peer-deps
RUN npm install -g @nestjs/cli@11.0.7
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start:dev"]

# Build stage
FROM base AS build
RUN npm ci --only=production --legacy-peer-deps
COPY . .
RUN npm run build
RUN npm prune --production

# Production stage
FROM node:18-alpine AS production
ENV NODE_ENV=production
ENV PORT=5000

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /usr/src/app

# Copy built application
COPY --from=build --chown=nestjs:nodejs /usr/src/app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /usr/src/app/package*.json ./

USER nestjs
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/src/health-check.js

CMD ["node", "dist/src/main.js"]
```

### Docker Compose Configuration

#### Development Environment

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    container_name: flight-booking-dev
    ports:
      - "5000:5000"
      - "9229:9229" # Debug port
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    env_file:
      - .env.development
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
    command: npm run start:debug
    restart: unless-stopped
    depends_on:
      - redis
      - postgres
    networks:
      - flight-booking-network

  redis:
    image: redis:7-alpine
    container_name: redis-cache
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - flight-booking-network

  postgres:
    image: postgres:15-alpine
    container_name: postgres-db
    environment:
      POSTGRES_DB: flight_booking
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - flight-booking-network

volumes:
  redis_data:
  postgres_data:

networks:
  flight-booking-network:
    driver: bridge
```

#### Production Environment

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    image: flight-booking-api:latest
    container_name: flight-booking-prod
    ports:
      - "5000:5000"
    env_file:
      - .env.production
    environment:
      - NODE_ENV=production
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    networks:
      - flight-booking-network

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - api
    networks:
      - flight-booking-network

networks:
  flight-booking-network:
    driver: bridge
```

### Deployment Strategies

#### Railway Deployment

```yaml
# railway.toml
[build]

[deploy]
  startCommand = "node dist/src/main"
  healthcheckPath = "/"
  healthcheckTimeout = 60

[env]
  NODE_ENV = "production"
  PORT = "5000"
```

#### Kubernetes Deployment

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flight-booking-api
  labels:
    app: flight-booking-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: flight-booking-api
  template:
    metadata:
      labels:
        app: flight-booking-api
    spec:
      containers:
      - name: api
        image: flight-booking-api:latest
        ports:
        - containerPort: 5000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: flight-booking-service
spec:
  selector:
    app: flight-booking-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
  type: LoadBalancer
```

### CI/CD Pipeline

#### GitHub Actions

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run unit tests
      run: npm run test:cov
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
    
    - name: Run E2E tests
      run: npm run test:e2e
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        target: production
        push: true
        tags: |
          ${{ secrets.DOCKER_USERNAME }}/flight-booking-api:latest
          ${{ secrets.DOCKER_USERNAME }}/flight-booking-api:${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to Railway
      uses: railway-deploy@v1
      with:
        railway-token: ${{ secrets.RAILWAY_TOKEN }}
        service: flight-booking-api
```

### Environment-Specific Configurations

#### Development Environment

```bash
# .env.development
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flight_booking_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=development-secret-key
LOG_LEVEL=debug
ENABLE_SWAGGER=true
CORS_ORIGIN=http://localhost:3000
```

#### Production Environment

```bash
# .env.production
NODE_ENV=production
PORT=5000
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}
JWT_SECRET=${JWT_SECRET}
LOG_LEVEL=info
ENABLE_SWAGGER=false
CORS_ORIGIN=${FRONTEND_URL}
SENTRY_DSN=${SENTRY_DSN}
```

### Container Security

#### Security Best Practices

```dockerfile
# Security-hardened production image
FROM node:18-alpine AS production

# Install security updates
RUN apk upgrade --no-cache && \
    apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Set secure permissions
WORKDIR /usr/src/app
COPY --chown=nestjs:nodejs package*.json ./
RUN npm ci --only=production --no-audit && \
    npm cache clean --force

# Copy application with correct ownership
COPY --from=build --chown=nestjs:nodejs /usr/src/app/dist ./dist

# Switch to non-root user
USER nestjs

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/src/main.js"]
```

#### Docker Security Scanning

```bash
# Security scanning commands
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image flight-booking-api:latest

# Vulnerability assessment
docker run --rm -v $(pwd):/app \
  securecodewarrior/docker-security-scanning:latest /app
```

### Monitoring & Logging

#### Container Logging

```yaml
# Logging configuration in docker-compose
services:
  api:
    logging:
      driver: "fluentd"
      options:
        fluentd-address: "localhost:24224"
        tag: "flight-booking.api"
        fluentd-async-connect: "true"
```

#### Health Monitoring

```typescript
// health-check.js
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/health',
  method: 'GET',
  timeout: 3000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('timeout', () => {
  req.destroy();
  process.exit(1);
});

req.on('error', () => {
  process.exit(1);
});

req.end();
```

### Deployment Checklist

#### Pre-deployment

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Health checks configured
- [ ] Monitoring setup
- [ ] Backup procedures in place
- [ ] Security scanning completed
- [ ] Load testing performed

#### Post-deployment

- [ ] Health check endpoint responding
- [ ] API documentation accessible
- [ ] Database connectivity verified
- [ ] Real-time features working
- [ ] Error tracking active
- [ ] Performance metrics collecting
- [ ] Backup verification
- [ ] Rollback plan tested

---

## 🙏 Acknowledgments

### Technology Partners
- **[NestJS Team](https://nestjs.com/)** - For the excellent progressive Node.js framework
- **[Supabase](https://supabase.com/)** - For the powerful backend-as-a-service platform
- **[Railway](https://railway.app/)** - For the seamless deployment platform
- **[TypeScript Team](https://www.typescriptlang.org/)** - For type-safe JavaScript development

### Open Source Libraries
- **Passport.js** - Authentication middleware
- **Class Validator** - Declarative validation library
- **Swagger/OpenAPI** - API documentation tools
- **Jest** - JavaScript testing framework
- **ESLint & Prettier** - Code quality tools

### Development Team
- **Backend Development Team** - For architecting and implementing the robust API
- **DevOps Team** - For containerization and deployment automation
- **QA Team** - For comprehensive testing and quality assurance
- **Security Team** - For security audits and best practices

### Community
- **NestJS Community** - For continuous support and contributions
- **Node.js Community** - For the powerful runtime environment
- **Open Source Contributors** - For the amazing ecosystem of tools and libraries

### Special Thanks
- **Early Beta Testers** - For valuable feedback and bug reports
- **Code Reviewers** - For maintaining high code quality standards
- **Documentation Contributors** - For clear and comprehensive documentation

---

<div align="center">
  <p><strong>Built with ❤️ by the Flight Booking Development Team</strong></p>
  <p>
    <a href="https://github.com/yourusername/flight-booking-backend">GitHub Repository</a> •
    <a href="https://your-api.railway.app/api">Live API</a> •
    <a href="mailto:support@flightbooking.com">Support</a>
  </p>
  
  ![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
  ![Powered by NestJS](https://img.shields.io/badge/Powered%20by-NestJS-e0234e?style=for-the-badge&logo=nestjs)
  ![Deployed on Railway](https://img.shields.io/badge/Deployed%20on-Railway-0B0D0E?style=for-the-badge&logo=railway)
</div>
