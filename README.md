# ShelfSpace - A Digital Personal Library

A system where users can track their books, mark read/unread status, and add ratings/notes.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Core Features](#core-features)
- [Project Setup](#project-setup)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Overall Project Flow](#overall-project-flow)
- [Data Flow](#data-flow)
- [Example Flow: Adding a New Book](#example-flow-adding-a-new-book)

## Project Overview
The Personal Library API is a web application backend designed to help users manage their personal book collections, track reading statuses, and maintain ratings or notes for each book. The project follows a RESTful API architecture and includes user authentication for secure data handling.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** React.js (basic frontend setup)
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Other Tools:** bcrypt for password hashing, CORS for cross-origin requests

## Core Features
- **Book Management:** Add, edit, delete, and retrieve book records
- **User Authentication:** Secure login and registration using JWT
- **Search and Filtering:** Search books by title/author and filter by status
- **Tracking:** Track reading statuses and add ratings or notes for books

## Project Setup
### Client Setup
1. Navigate to the client directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Server Setup
1. Navigate to the server directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start
   ```

## Overall Project Flow
1. **User Interaction:** User makes a request (e.g., "Add a new book")
   - Request contains:
     - HTTP method (POST)
     - Endpoint (`/api/books`)
     - Headers (Authentication token)
     - Body (book data)
2. **Express Server:**
   - Request hits the Express server
   - Goes through global middleware (CORS handling, body parsing, request logging)
3. **Authentication Middleware:**
   - Validates JWT token and adds user info to the request
4. **Route Handler:**
   - Matches URL pattern and directs to the correct controller function
   - Handles specific HTTP method (POST)
5. **Controller Logic:**
   - Validates input data
   - Prepares data for the database
   - Makes database query and handles business logic
   - Prepares the response
6. **Database Interaction:**
   - SQL query execution
   - Database operation
   - Results returned to the controller
7. **Response Flow:**
   - Controller formats the database response
   - Express sends the HTTP response
   - User receives response data

## Data Flow
1. Request comes to the Express server
2. Passes through middleware
3. Hits route handler
4. Controller processes request
5. Database query executes
6. Response sent back to the client

## Example Flow: Adding a New Book
1. **User:** Sends POST request to `/api/books` with book data
2. **Express:** Receives the request
3. **Auth Middleware:** Validates token
4. **Controller:** Receives and validates book data
5. **Database:** Adds the new book
6. **Response:** Success response sent back to the user

