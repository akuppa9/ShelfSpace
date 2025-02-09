require("dotenv").config(); // Load environment variables from .env file

const express = require("express"); // Import the express module
const cors = require("cors"); // Import CORS 
const booksRouter = require("./routes/booksRoutes"); // Import the books router
const authRouter = require("./routes/authRoutes");
const app = express(); // Create an instance of an express app object
const port = process.env.SERVER_PORT || 3000; // Define the port number


app.use(cors({
  origin: 'http://localhost:5174', // React app URL
  credentials: true
}));

app.use(express.json()); // Middleware to parse JSON data (cannot parse HTTP request bodies without this (post requests))

// mount the books router to the api/books path, so relative root path is api/books
app.use("/auth", authRouter);

// mount the books router to the api/books path, so relative root path is api/books
app.use("/api/books", booksRouter);

// Route for handing GET requests for the root '/' url
app.get("/", (req, res) => {
  res.send("Hello from Server!"); // Send a response to the client at given url
});

// Start the server and listen for requests at specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


