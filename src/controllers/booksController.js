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
    res.json(result.rows);
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).json({ error: "Failed to create book" });
  }
};

// R - read: GET /api/books
const getAllBooks = async (req, res) => {
  try {
    const query = "SELECT * FROM books;";
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching all books from database", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// R - read: GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const query = "SELECT * FROM books WHERE id = $1;";
    const result = await db.query(query, [bookId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching book by id from database", error);
    res.status(500).json({ error: "Failed to fetch book by id" });
  }
};

const deleteBookById = async(req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    //logic to delete 
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
};
