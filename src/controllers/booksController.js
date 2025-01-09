const db = require("../config/database.js"); // Import the db module so we can query the database

// routes:
// C - create: POST /api/books
// R - read: GET /api/books, GET /api/books/:id
// U - update: PUT /api/books/:id
// D - delete: DELETE /api/books/:id


// C - create: POST /api/books
const createBook = async(res, req) =>{
    try {
        
    }
}

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

module.exports = {
  getAllBooks,
  getBookById,
};
