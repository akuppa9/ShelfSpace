const db = require("../config/database.js"); // Import the db module so we can query the database

// routes:
// C - create: POST /api/books
// R - read: GET /api/books, GET /api/books/:id
// U - update: PUT /api/books/:id
// D - delete: DELETE /api/books/:id

// C - create: POST /api/books
const createBook = async (req, res) => {
  try {
    const { user_id, title, author, status, rating } = req.body;
    const query = `INSERT INTO books (user_id, title, author, status, rating) 
                      VALUES ($1, $2, $3, $4, $5)
                      RETURNING *;
                      `;
    const result = await db.query(query, [
      user_id,
      title,
      author,
      status,
      rating,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).json({ error: "Failed to create book" });
  }
};

// R - read: GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const user_id = parseInt(req.body.user_id);
    const bookId = parseInt(req.params.id);
    const query = "SELECT * FROM books WHERE user_id = $1 AND bookId = $2;";
    const result = await db.query(query, [user_id, bookId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all books from database", error);
    res.status(500).json({ error: "Failed to fetch books for particular user" });
  }
};

// R - read: GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const user_id = parseInt(req.body.user_id);
    const bookId = parseInt(req.params.id);
    const query = "SELECT * FROM books WHERE user_id = $1 AND id = $2;";
    const result = await db.query(query, [user_id, bookId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching book by id from database", error);
    res.status(500).json({ error: "Failed to fetch book by id for particular user" });
  }
};

// U - update: PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const { user_id, title, author, status, rating } = req.body;
    const bookId = parseInt(req.params.id);
    const query = "SELECT * FROM books WHERE user_id = $1 AND id = $2;";
    const result = await db.query(query, [user_id, bookId]);
    const book = result.rows[0];

    const updateBook = {
      user_id: user_id || book.user_id,
      title: title || book.title,
      author: author || book.author,
      status: status || book.status,
      rating: rating || book.rating,
    };

    const updateQuery = `UPDATE books SET 
      user_id = $1, 
      title = $2, 
      author = $3, 
      status = $4, 
      rating = $5
      WHERE id = $6
      RETURNING *;
      `;
    const updateResult = await db.query(updateQuery, [
      updateBook.user_id,
      updateBook.title,
      updateBook.author,
      updateBook.status,
      updateBook.rating,
      bookId,
    ]);
    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error("Error updating book by id", error);
    res.status(500).json({ error: "Failed to update book by id" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const user_id = parseInt(req.body.user_id);
    const bookId = parseInt(req.params.id);
    const query = `DELETE FROM books WHERE user_id = $1 AND id = $2
    RETURNING *;`;
    const result = await db.query(query, [user_id, bookId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting book by id from database", error);
    res.status(500).json({ error: "Failed to delete book by id" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
