// books routes
const express = require("express");
const router = express.Router();
// middleware function import
const { authenticateToken } = require("../config/auth");  
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require("../controllers/booksController");

// Protect book routes, so cannot access without logging in 
router.use(authenticateToken);

// Route for POST api/books
router.post('/', createBook);

// Route for GET api/books
router.get('/', getAllBooks);

// Route for GET api/books/:id
router.get('/:id', getBookById);

// Route for PUT api/books/:id
router.put('/:id', updateBook);

// Route for DELETE api/books/:id
router.delete('/:id', deleteBook);

module.exports = router;