# Flight Booking API Specification

## API Overview

This document provides technical specifications for the Flight Booking API endpoints. It's intended for frontend developers and third-party integrators who need to interact with the booking system.

**Base URL**: `https://api.flightbooking.example.com` (replace with your actual API domain)

**API Version**: v1

**Content Type**: All requests and responses use JSON (`application/json`)

## Authentication

### Authentication Flow

The API uses JWT (JSON Web Token) for authentication. To access protected endpoints:

1. Obtain a JWT token via the login endpoint
2. Include the token in subsequent requests using the Authorization header:
   ```
   Authorization: Bearer {your_jwt_token}
   ```

### Authentication Endpoints

#### Register a New User

```
POST /auth/signup
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created)**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "2025-07-05T10:00:00Z"
  },
  "session": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

#### Login

```
POST /auth/login
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK)**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

## Flight Endpoints

### Search Flights

```
GET /flights/search
```

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| origin | string | Yes | Origin airport IATA code (e.g., "LAX") |
| destination | string | Yes | Destination airport IATA code (e.g., "JFK") |
| departureDate | string | Yes | Departure date (YYYY-MM-DD) |
| returnDate | string | No | Return date for round trips (YYYY-MM-DD) |
| tripType | string | Yes | "ONE_WAY" or "ROUND_TRIP" |
| adults | number | Yes | Number of adult passengers (min: 1) |
| children | number | No | Number of child passengers (2-11 years) |
| infants | number | No | Number of infant passengers (<2 years) |
| class | string | Yes | "ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", or "FIRST" |

**Response (200 OK)**:
```json
{
  "flights": [
    {
      "flightNumber": "AA123",
      "airline": "American Airlines",
      "origin": "LAX",
      "destination": "JFK",
      "departureTime": "2025-07-10T08:30:00Z",
      "arrivalTime": "2025-07-10T16:45:00Z",
      "duration": 375,
      "price": 329.99,
      "availableSeats": {
        "ECONOMY": 45,
        "BUSINESS": 12,
        "FIRST": 4
      },
      "status": "SCHEDULED"
    },
    // More flights...
  ]
}
```

### Get Flight Details

```
GET /flights/{flightId}
```

**Path Parameters**:
- `flightId`: Flight ID

**Response (200 OK)**:
```json
{
  "id": "uuid",
  "flightNumber": "AA123",
  "airline": "American Airlines",
  "origin": "LAX",
  "destination": "JFK",
  "departureTime": "2025-07-10T08:30:00Z",
  "arrivalTime": "2025-07-10T16:45:00Z",
  "duration": 375,
  "distance": 2475,
  "aircraft": "Boeing 737-800",
  "price": 329.99,
  "availableSeats": {
    "ECONOMY": 45,
    "PREMIUM_ECONOMY": 20,
    "BUSINESS": 12,
    "FIRST": 4
  },
  "amenities": ["WiFi", "Power Outlets", "Entertainment"],
  "status": "SCHEDULED"
}
```

## Booking Endpoints

### Create Booking

```
POST /bookings
```

**Authorization**: Bearer Token required

**Request Body**:
```json
{
  "flightId": "uuid-of-outbound-flight",
  "returnFlightId": "uuid-of-return-flight",
  "cabinClass": "ECONOMY",
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-05-15",
      "passportNumber": "AB1234567",
      "passengerType": "ADULT"
    },
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "dateOfBirth": "2020-01-10",
      "passengerType": "INFANT"
    }
  ]
}
```

**Response (201 Created)**:
```json
{
  "booking": {
    "id": "uuid",
    "bookingReference": "BOOK-A1B2C3",
    "totalPrice": 659.98,
    "cabinClass": "ECONOMY",
    "passengerCount": 2,
    "createdAt": "2025-07-05T15:30:45Z",
    "status": "CONFIRMED"
  },
  "passengers": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "passengerType": "ADULT"
    },
    {
      "id": "uuid",
      "firstName": "Jane",
      "lastName": "Doe",
      "passengerType": "INFANT"
    }
  ],
  "tickets": [
    {
      "id": "uuid",
      "ticketNumber": "TKT123456789",
      "passengerId": "uuid",
      "issuedAt": "2025-07-05T15:30:46Z"
    },
    {
      "id": "uuid",
      "ticketNumber": "TKT987654321",
      "passengerId": "uuid",
      "issuedAt": "2025-07-05T15:30:46Z"
    }
  ]
}
```

### Get User Bookings

```
GET /bookings
```

**Authorization**: Bearer Token required

**Response (200 OK)**:
```json
{
  "bookings": [
    {
      "id": "uuid",
      "bookingReference": "BOOK-A1B2C3",
      "totalPrice": 659.98,
      "cabinClass": "ECONOMY",
      "passengerCount": 2,
      "createdAt": "2025-07-05T15:30:45Z",
      "status": "CONFIRMED",
      "flight": {
        "flightNumber": "AA123",
        "origin": "LAX",
        "destination": "JFK",
        "departureTime": "2025-07-10T08:30:00Z"
      },
      "returnFlight": {
        "flightNumber": "AA456",
        "origin": "JFK",
        "destination": "LAX",
        "departureTime": "2025-07-15T10:15:00Z"
      }
    },
    // More bookings...
  ]
}
```

### Get Booking Details

```
GET /bookings/{bookingId}
```

**Authorization**: Bearer Token required

**Path Parameters**:
- `bookingId`: Booking ID

**Response (200 OK)**:
```json
{
  "booking": {
    "id": "uuid",
    "bookingReference": "BOOK-A1B2C3",
    "totalPrice": 659.98,
    "cabinClass": "ECONOMY",
    "passengerCount": 2,
    "createdAt": "2025-07-05T15:30:45Z",
    "status": "CONFIRMED"
  },
  "flight": {
    "id": "uuid",
    "flightNumber": "AA123",
    "airline": "American Airlines",
    "origin": "LAX",
    "destination": "JFK",
    "departureTime": "2025-07-10T08:30:00Z",
    "arrivalTime": "2025-07-10T16:45:00Z",
    "status": "SCHEDULED"
  },
  "returnFlight": {
    "id": "uuid",
    "flightNumber": "AA456",
    "airline": "American Airlines",
    "origin": "JFK",
    "destination": "LAX",
    "departureTime": "2025-07-15T10:15:00Z",
    "arrivalTime": "2025-07-15T18:30:00Z",
    "status": "SCHEDULED"
  },
  "passengers": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-05-15",
      "passportNumber": "AB1234567",
      "passengerType": "ADULT"
    },
    {
      "id": "uuid",
      "firstName": "Jane",
      "lastName": "Doe",
      "dateOfBirth": "2020-01-10",
      "passengerType": "INFANT"
    }
  ],
  "tickets": [
    {
      "id": "uuid",
      "ticketNumber": "TKT123456789",
      "passengerId": "uuid",
      "issuedAt": "2025-07-05T15:30:46Z"
    },
    {
      "id": "uuid",
      "ticketNumber": "TKT987654321",
      "passengerId": "uuid",
      "issuedAt": "2025-07-05T15:30:46Z"
    }
  ]
}
```

## Ticket Endpoints

### Get Ticket Details

```
GET /tickets/{ticketId}
```

**Authorization**: Bearer Token required

**Path Parameters**:
- `ticketId`: Ticket ID

**Response (200 OK)**:
```json
{
  "ticket": {
    "id": "uuid",
    "ticketNumber": "TKT123456789",
    "issuedAt": "2025-07-05T15:30:46Z",
    "status": "VALID"
  },
  "passenger": {
    "firstName": "John",
    "lastName": "Doe",
    "passengerType": "ADULT"
  },
  "flight": {
    "flightNumber": "AA123",
    "airline": "American Airlines",
    "origin": "LAX",
    "destination": "JFK",
    "departureTime": "2025-07-10T08:30:00Z",
    "terminal": "4",
    "gate": "B12"
  },
  "booking": {
    "bookingReference": "BOOK-A1B2C3",
    "cabinClass": "ECONOMY"
  }
}
```

### Get Booking Tickets

```
GET /tickets/booking/{bookingId}
```

**Authorization**: Bearer Token required

**Path Parameters**:
- `bookingId`: Booking ID

**Response (200 OK)**:
```json
{
  "tickets": [
    {
      "id": "uuid",
      "ticketNumber": "TKT123456789",
      "issuedAt": "2025-07-05T15:30:46Z",
      "status": "VALID",
      "passenger": {
        "firstName": "John",
        "lastName": "Doe",
        "passengerType": "ADULT"
      },
      "flight": {
        "flightNumber": "AA123",
        "airline": "American Airlines",
        "origin": "LAX",
        "destination": "JFK",
        "departureTime": "2025-07-10T08:30:00Z"
      }
    },
    // More tickets...
  ]
}
```

## User Endpoints

### Get User Profile

```
GET /users/profile
```

**Authorization**: Bearer Token required

**Response (200 OK)**:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "preferences": {
    "seatPreference": "window",
    "mealPreference": "vegetarian",
    "notificationEnabled": true
  }
}
```

### Update User Preferences

```
PATCH /users/preferences
```

**Authorization**: Bearer Token required

**Request Body**:
```json
{
  "seatPreference": "aisle",
  "mealPreference": "vegan",
  "notificationEnabled": true
}
```

**Response (200 OK)**:
```json
{
  "preferences": {
    "seatPreference": "aisle",
    "mealPreference": "vegan",
    "notificationEnabled": true
  }
}
```

## Flight Status Endpoints

### Get Flight Status

```
GET /flight-status/{flightNumber}
```

**Path Parameters**:
- `flightNumber`: Flight number (e.g., "AA123")

**Query Parameters**:
- `date`: Optional flight date (YYYY-MM-DD)

**Response (200 OK)**:
```json
{
  "flightNumber": "AA123",
  "airline": "American Airlines",
  "origin": "LAX",
  "destination": "JFK",
  "scheduledDeparture": "2025-07-10T08:30:00Z",
  "estimatedDeparture": "2025-07-10T08:45:00Z",
  "scheduledArrival": "2025-07-10T16:45:00Z",
  "estimatedArrival": "2025-07-10T17:00:00Z",
  "status": "DELAYED",
  "statusUpdateTime": "2025-07-10T07:15:00Z",
  "departureTerminal": "4",
  "departureGate": "B12",
  "arrivalTerminal": "2",
  "arrivalGate": "A5"
}
```

### Update Flight Status (Admin Only)

```
PATCH /flight-status/{flightId}
```

**Authorization**: Bearer Token required (Admin role)

**Path Parameters**:
- `flightId`: Flight ID

**Request Body**:
```json
{
  "status": "DELAYED",
  "estimatedDeparture": "2025-07-10T08:45:00Z",
  "estimatedArrival": "2025-07-10T17:00:00Z",
  "departureGate": "B14",
  "remarks": "Delayed due to weather conditions"
}
```

**Response (200 OK)**:
```json
{
  "flightNumber": "AA123",
  "status": "DELAYED",
  "estimatedDeparture": "2025-07-10T08:45:00Z",
  "estimatedArrival": "2025-07-10T17:00:00Z",
  "departureGate": "B14",
  "remarks": "Delayed due to weather conditions",
  "statusUpdateTime": "2025-07-10T07:15:00Z"
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common HTTP Status Codes

- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Not authorized to access the resource
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Unauthenticated requests**: 30 requests per minute
- **Authenticated requests**: 60 requests per minute

When the rate limit is exceeded, the API returns a 429 Too Many Requests response with a Retry-After header indicating when to retry.

## Pagination

Endpoints that return collections support pagination using the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Example response with pagination:

```json
{
  "data": [
    // Collection items
  ],
  "pagination": {
    "total": 45,
    "page": 2,
    "limit": 10,
    "pages": 5
  }
}
```

## Data Types

### Enums

#### Trip Type
- `ONE_WAY`: One-way flight
- `ROUND_TRIP`: Round-trip flight

#### Cabin Class
- `ECONOMY`: Economy class
- `PREMIUM_ECONOMY`: Premium economy class
- `BUSINESS`: Business class
- `FIRST`: First class

#### Passenger Type
- `ADULT`: Adult (12+ years)
- `CHILD`: Child (2-11 years)
- `INFANT`: Infant (<2 years)

#### Flight Status
- `SCHEDULED`: Flight is scheduled as planned
- `DELAYED`: Flight is delayed
- `BOARDING`: Boarding has started
- `DEPARTED`: Flight has departed
- `IN_AIR`: Flight is in the air
- `LANDED`: Flight has landed
- `ARRIVED`: Flight has arrived at the gate
- `CANCELLED`: Flight has been cancelled
- `DIVERTED`: Flight has been diverted

#### Booking Status
- `PENDING`: Booking is pending confirmation
- `CONFIRMED`: Booking is confirmed
- `CANCELLED`: Booking has been cancelled
- `COMPLETED`: Flight has been completed

## Webhooks

The API supports webhooks for real-time notifications about events. To register a webhook:

```
POST /webhooks
```

**Authorization**: Bearer Token required

**Request Body**:
```json
{
  "url": "https://your-app.example.com/webhook",
  "events": ["booking.created", "flight.status_changed"],
  "secret": "your_webhook_secret"
}
```

**Response (201 Created)**:
```json
{
  "id": "wh_uuid",
  "url": "https://your-app.example.com/webhook",
  "events": ["booking.created", "flight.status_changed"],
  "createdAt": "2025-07-05T16:00:00Z"
}
```

### Webhook Events

- `booking.created`: When a new booking is created
- `booking.updated`: When a booking is updated
- `booking.cancelled`: When a booking is cancelled
- `flight.status_changed`: When a flight's status changes
- `ticket.issued`: When a ticket is issued

### Webhook Payload

```json
{
  "id": "evt_uuid",
  "type": "booking.created",
  "created": "2025-07-05T16:00:00Z",
  "data": {
    // Event-specific data
  }
}
```

## SDK Support

We provide SDKs for popular programming languages to simplify API integration:

- [JavaScript/TypeScript SDK](https://github.com/flightbooking/js-sdk)
- [Python SDK](https://github.com/flightbooking/python-sdk)
- [Java SDK](https://github.com/flightbooking/java-sdk)

## API Versioning

The API uses URL versioning. The current version is v1:

```
https://api.flightbooking.example.com/v1/flights/search
```

When new versions are released, the older versions will remain available for a deprecation period that will be announced.

## Support

For API support, please contact:
- Email: api-support@flightbooking.example.com
- Support Portal: https://developers.flightbooking.example.com/support
