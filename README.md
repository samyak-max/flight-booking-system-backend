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
- [Examples](#-examples)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Data Models](#-data-models)
- [Authentication & Security](#-authentication--security)
- [Database Integration](#-database-integration)
- [Real-time Features](#-real-time-features)
- [Database Schema](#database-schema)

## 🚀 Introduction

The Flight Booking Backend is a **production-ready**, **scalable** API built with **NestJS** that powers a complete flight booking platform. This system enables users to search for flights, manage bookings, process tickets, and handle user authentication with real-time flight status updates.

## 👨‍🎓 Examples

The flights table does not have many flights saved in it. Here are a few flights you can use to test:

| origin_code | destination_code | departure_time         |
| ----------- | ---------------- | ---------------------- |
| CCU         | VTZ              | 2025-07-12 09:30:00+00 |
| BHO         | TRV              | 2025-07-08 22:30:00+00 |
| IXE         | IDR              | 2025-07-07 08:30:00+00 |
| HYD         | BLR              | 2025-07-16 18:30:00+00 |
| MAA         | VNS              | 2025-07-14 06:30:00+00 |
| DEL         | JAI              | 2025-07-09 08:30:00+00 |
| BHO         | JAI              | 2025-07-10 22:00:00+00 |
| TRV         | GAU              | 2025-07-10 08:30:00+00 |
| DEL         | BLR              | 2025-07-17 01:00:00+00 |
| COK         | CCU              | 2025-07-11 09:30:00+00 |
| BLR         | DEL              | 2025-07-08 19:30:00+00 |
| BLR         | NAG              | 2025-07-17 11:00:00+00 |
| IXC         | VTZ              | 2025-07-17 21:00:00+00 |
| BOM         | MAA              | 2025-07-16 20:30:00+00 |
| PNQ         | NAG              | 2025-07-10 12:30:00+00 |
| HYD         | ATQ              | 2025-07-18 23:30:00+00 |
| DEL         | BLR              | 2025-07-11 11:00:00+00 |
| CCU         | VTZ              | 2025-07-19 20:00:00+00 |
| IXB         | CCU              | 2025-07-08 21:00:00+00 |
| COK         | GOI              | 2025-07-15 14:00:00+00 |

### 🌟 Key Features

✅ **Flight Search & Filtering**: Advanced search with multiple criteria and caching  
✅ **User Authentication**: JWT-based authentication with Supabase integration  
✅ **Booking Management**: End-to-end booking process with validation  
✅ **Ticket Processing**: Electronic ticket generation and management  
✅ **Real-time Updates**: Server-Sent Events for live flight status  
✅ **User Preferences**: Personalized user experience settings   
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
        G --> V[Passenger Service]
        
        J --> K
        J --> V
    end
    
    subgraph "Data Layer"
        N[Supabase Service] --> O[PostgreSQL Database]
        N --> P[Supabase Auth]
        N --> Q[Real-time Subscriptions]
    end
    
    subgraph "External Services (Future Scope)"
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
    V --> N
    
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

### Real-time Architecture

```mermaid
graph TB
    %% Real-time Layer
    subgraph "Real-time Layer"
        A[SSE Controller] 
        B[Flight Status Service]
        C[Database Change Subscription]
        D[Event Emitters]
    end

    %% Client Connections
    subgraph "Client Connections"
        E[Frontend Client 1]
        G[Frontend Client 2]
        I[Frontend Client N]
    end

    %% Database Events
    subgraph "Database Events"
        K["Database Change: UPDATE"] --> L["Postgres Change Feed"]
        L --> C
    end

    C --> D
    D --> A
    B --> C

    A --> E
    A --> G
    A --> I

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

### Technology Stack

#### Backend Framework
- **NestJS 11.0.1** - Progressive Node.js framework
- **Node.js 18+** - JavaScript runtime
- **TypeScript 5.7.3** - Type-safe JavaScript

#### Database & Storage
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL 15** - Relational database
- **Supabase Auth** - Authentication service
- **Real-time Subscriptions** - Live data updates

#### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **Passport.js** - Authentication middleware
- **Class Validator** - Input validation

#### Documentation & API
- **Swagger/OpenAPI 3** - API documentation
- **Class Transformer** - Object transformation
- **Nest CLI** - Development tools

#### Deployment & DevOps
- **Docker** - Containerization
- **Railway** - Cloud deployment platform

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

### Quick Start Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debug mode
npm run start:dev:docker   # Start with Docker

# Production
npm run build              # Build the application
npm run start:prod         # Start production server

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
- **Production**: `https://flight-booking-backend-production-003f.up.railway.app`
- **Swagger Docs**: `{BASE_URL}/api`

### 🔒 Authentication Header

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
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

## 💾 Database Schema

#### Core Tables

```mermaid
erDiagram
    airports {
        uuid id PK
        string code UK
        string name
        string city
        string country
        string timezone
    }

    flights {
        uuid id PK
        string flight_number
        string airline
        uuid origin_id FK
        uuid destination_id FK
        timestamp departure_time
        timestamp arrival_time
        interval duration
        numeric price
        jsonb available_seats
        string status
        timestamp status_updated_at
    }

    bookings {
        uuid id PK
        uuid user_id FK
        uuid flight_id FK
        uuid return_flight_id FK
        string booking_reference UK
        numeric total_price
        string cabin_class
        jsonb passenger_count
        string status
        timestamp created_at
    }

    passengers {
        uuid id PK
        uuid booking_id FK
        string full_name
        date dob
        string nationality
        string passport_number
        string type
    }

    tickets {
        uuid id PK
        uuid booking_id FK
        uuid passenger_id FK
        string e_ticket_number UK
    }

    profiles {
        uuid id PK
        jsonb preferences
    }

    auth_users {
        uuid id PK
    }

    %% Relationships
    auth_users ||--o{ bookings : "makes"
    auth_users ||--|| profiles : "has"
    airports ||--o{ flights : "origin"
    airports ||--o{ flights : "destination"
    flights ||--o{ bookings : "used in"
    bookings ||--o{ passengers : "has"
    bookings ||--o{ tickets : "generates"
    passengers ||--o{ tickets : "assigned"

```

#### Schema on Supabase

![supabase-schema-wuuejepxjpubqvzpwqaa](https://github.com/user-attachments/assets/cca27ec9-af6c-4b28-9f7a-aa33f59ad481)
