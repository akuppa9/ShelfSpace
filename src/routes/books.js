// books routes

const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById } = require("../controllers/booksController");

// Route for GET api/books
router.get('/', getAllBooks);

// Route for GET api/books/:id
router.get('/:id', getBookById);

module.exports = router;