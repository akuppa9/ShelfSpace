require("dotenv").config(); // Load environment variables from .env file

const express = require("express"); // Import the express module
const db = require("../db/db"); // Import the db module

const app = express(); // Create an instance of an express app object
const port = process.env.SERVER_PORT || 3000; // Define the port number

app.use(express.json()); // Middleware to parse JSON data (cannot parse HTTP request bodies without this (post requests))

// Route for handing GET requests for the root '/' url
app.get("/", (req, res) => {
  res.send("Hello from Server!"); // Send a response to the client at given url
});

app.get("/db", async (req, res) => {
  try {
    // Get all books from the database and send it to the client
    const result = await db.query("SELECT * FROM books;"); 
    res.json(result.rows);
  } catch (error) {
    //console.error("Error details:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server and listen for requests at specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
