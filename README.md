# Personal Library API

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
