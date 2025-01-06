# personal-library-API

a Personal Library API
It's a system where users can track their books, mark read/unread status, and add ratings/notes.

# Core Features:

- Book management (add/edit/delete)
- Basic user authentication
- Simple book search and filtering
- Personal notes and ratings for books

Project Breakdown (estimated 20-30 hours):

Setup (3-4 hours):

- Set up Node/Express project
- Configure PostgreSQL
- Basic project structure

Authentication (4-5 hours):

- Implement user registration/login
- JWT middleware
- Password hashing

Book Management (8-10 hours):

- Create CRUD endpoints
- Input validation
- Error handling
- Basic query functionality

Testing & Documentation (3-4 hours):

- Test endpoints with Postman
- Basic API documentation
- Error handling improvements

Optional Frontend (2-3 hours):

- Simple React form to test API
- Basic list view of books

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
