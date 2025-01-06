# personal-library-API

a Personal Library API
It's a system where users can track their books, mark read/unread status, and add ratings/notes.

# Core Features:

- Book management (add/edit/delete)
- Basic user authentication
- Simple book search and filtering
- Personal notes and ratings for books

# Project Breakdown (estimated 20-30 hours):

# Phase 1: Basic Server Setup

## Create Express server

- Basic index.js
- Test endpoint
- Error handling middleware
- Request parsing


## Database Setup

- PostgreSQL installation
- Database connection
- Create tables:

  - Users (id, username, password_hash)
  - Books (id, user_id, title, author, status, rating, notes)


# Phase 2: Basic Book Operations (No Auth Yet)

## First Routes:

- GET /books (list all)
- GET /books/:id (single book)
- POST /books (create)
- PUT /books/:id (update)
- DELETE /books/:id (remove)

## Learn/Implement:

- Route handlers
- Database queries
- Error handling
- Request validation


# Phase 3: Authentication

## User Management:

- Registration endpoint
- Login endpoint
- Password hashing
- JWT tokens

## Security:

- Auth middleware
- Protected routes
- User context in requests


# Phase 4: Search & Filter

## Enhanced Queries:

- Search books by title/author
- Filter by status
- Basic reading statistics


# Phase 5: Frontend
- Basic frontend setup


Core concepts:
- RESTful API design
- Database relationships (though simpler)
- Authentication
- CRUD operations
- Query parameters
- Error handling


# Overall Project Flow
User Interaction → API Request


## User makes a request (e.g., "Add a new book")
### Request contains:

- HTTP method (POST)
- Endpoint (/api/books)
- Headers (Authentication token)
- Body (book data)


## Express Server (Entry Point)

- Request hits your Express server first
- Goes through global middleware

- CORS handling
- Body parsing (JSON)
- Request logging


## Authentication Middleware

- Checks if request has JWT token
- Validates token
- Adds user info to request object
- Either continues or returns auth error


## Route Handler

- Matches URL pattern (/api/books)
- Directs to correct controller function
- Handles specific HTTP method (POST)


## Controller Logic

- Receives request with validated user data
- Validates input data
- Prepares data for database
- Makes database query
- Handles any business logic
- Prepares response


## Database Interaction

- SQL query executes
- Database performs operation
- Returns results to controller


## Response Flow

- Controller formats database response
- Sends formatted response back
- Express sends HTTP response
- User receives response data


# Data Flow:

Request comes to Express server
Goes through middleware
Hits route handler
Controller processes request
Database query executes
Response sent back


# Example Flow of adding a new book:
- 1: User → POST /api/books with book data
↓
- 2: Express receives request
↓
- 3: Auth middleware validates token
↓
- 4: Books controller receives request
↓
- 5: Controller validates book data
↓
- 6: Database adds new book
↓
- 7: Success response back to user

# Example file structure: 

<img width="666" alt="Screenshot 2025-01-05 at 9 35 04 PM" src="https://github.com/user-attachments/assets/9f3a388b-d518-4f3f-a63b-050e08187076" />
