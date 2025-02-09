const db = require("../config/database");

// C - create: POST /api/books
const createBook = async (req, res) => {
  try {
    const { title, author, status, rating } = req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Title is required and must be a string" });
    }

    if (!author || typeof author !== "string") {
      return res
        .status(400)
        .json({ error: "Author is required and must be a string" });
    }

    if (!["read", "reading", "unread"].includes(status)) {
      return res
        .status(400)
        .json({
          error: "Status must be one of 'read', 'reading', or 'unread'",
        });
    }

    if (rating && ![1, 2, 3, 4, 5].includes(rating)) {
      return res
        .status(400)
        .json({ error: "Rating must be a number between 1 and 5 if provided" });
    }

    const user_id = req.user.user_id;
    const query = `INSERT INTO books (user_id, title, author, status, rating) 
                      VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
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
    const user_id = req.user.user_id;
    const {
      title,
      author,
      status,
      rating,
      sortBy = "title",
      order = "ASC",
    } = req.query;

    const validSortColumns = ["title", "author", "rating"];
    if (!validSortColumns.includes(sortBy)) {
      return res.status(400).json({ error: "Invalid sort column" });
    }

    if (!["ASC", "DESC"].includes(order.toUpperCase())) {
      return res.status(400).json({ error: "Invalid sort order" });
    }

    let query = `SELECT * FROM books WHERE user_id = $1`;
    const queryParams = [user_id];
    let paramIndex = 2;

    if (title) {
      query += ` AND title ILIKE $${paramIndex}`;
      queryParams.push(`%${title}%`);
      paramIndex++;
    }

    if (author) {
      query += ` AND author ILIKE $${paramIndex}`;
      queryParams.push(`%${author}%`);
      paramIndex++;
    }

    if (status) {
      query += ` AND status = $${paramIndex}`;
      queryParams.push(status);
      paramIndex++;
    }

    if (rating) {
      query += ` AND rating = $${paramIndex}`;
      queryParams.push(parseInt(rating));
      paramIndex++;
    }

    query += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;
    const result = await db.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
};

// R - read: GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const bookId = parseInt(req.params.id);

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const query = "SELECT * FROM books WHERE user_id = $1 AND id = $2;";
    const result = await db.query(query, [user_id, bookId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching book by id", error);
    res.status(500).json({ error: "Failed to fetch book by id" });
  }
};

// U - update: PUT /api/books/:id
const updateBook = async (req, res) => {
  try {
    const { title, author, status, rating } = req.body;
    const bookId = parseInt(req.params.id);
    const user_id = req.user.user_id;

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    if (title && typeof title !== "string") {
      return res.status(400).json({ error: "Title must be a string" });
    }

    if (author && typeof author !== "string") {
      return res.status(400).json({ error: "Author must be a string" });
    }

    if (status && !["read", "reading", "unread"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    if (rating && ![1, 2, 3, 4, 5].includes(rating)) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const query = "SELECT * FROM books WHERE user_id = $1 AND id = $2;";
    const result = await db.query(query, [user_id, bookId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const updateQuery = `UPDATE books SET title = $1, author = $2, status = $3, rating = $4 WHERE id = $5 RETURNING *;`;
    const updateResult = await db.query(updateQuery, [
      title || result.rows[0].title,
      author || result.rows[0].author,
      status || result.rows[0].status,
      rating,
      bookId,
    ]);
    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).json({ error: "Failed to update book" });
  }
};

// D - delete: DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const bookId = parseInt(req.params.id);

    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const query = `DELETE FROM books WHERE user_id = $1 AND id = $2 RETURNING *;`;
    const result = await db.query(query, [user_id, bookId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
