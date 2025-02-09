const { Pool } = require("pg");
const path = require("path");

// Load dotenv with specific path to .env file
require("dotenv").config({ path: path.join(__dirname, "../../../.env") });

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to database:", process.env.DB_DATABASE);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

module.exports = {
  query: (text, params) => pool.query(text, params),
};

/* PSQL:
Enter: psql -U amoghkuppa -d library
List DBs: \l
Create DB: CREATE DATABASE db_name
Switch DB: \c database_name
List Tables in current DB: \dt
Describe schema of specific table: \d table_name
Exit: \q



/* DB Schemas:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'unread',
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

** user_id is a foreign key and is used to associate books with users, eg. user with id of 2 has all books with user_id of 2 **

Data Insertion:
INSERT INTO users (username, password_hash)
VALUES ('john_doe', 'hashed_password_value');

INSERT INTO books (user_id, title, author, status, rating)
VALUES (1, 'The Catcher in the Rye', 'J.D. Salinger', 'unread', 4);

all commands end with semicolon ;
*/
