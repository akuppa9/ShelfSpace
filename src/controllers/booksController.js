const { body, validationResult } = require("express-validator"); // Import the express-validator module for input validation
const db = require("../config/database"); // Import the db module so we can query the database

// routes:
// C - create: POST /api/books
// R - read: GET /api/books, GET /api/books/:id
// U - update: PUT /api/books/:id
// D - delete: DELETE /api/books/:id

// C - create: POST /api/books
const createBook = async (req, res) => {
  // input validation
  await Promise.all([
    body('title')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Title is required and must be a string')
      .run(req),
    
    body('author')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Author is required and must be a string')
      .run(req),
    
    body('status')
      .isIn(['read', 'reading', 'unread'])
      .withMessage('Status must be one of "read", "reading", or "unread"')
      .run(req),
    
    body('rating')
      .optional()
      .isIn([1, 2, 3, 4, 5])
      .withMessage('Rating must be a number between 1 and 5')
      .run(req),
  ]);

  // check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // db interaction 
  try {
    const user_id = req.user.user_id;
    const { title, author, status, rating } = req.body; 
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
// Filtering endpoints with query params
const getAllBooks = async (req, res) => {
  // db interaction
  try {
    const { 
      title, 
      author, 
      status,
      rating,
      sortBy = 'title', 
      order = 'ASC'
    } = req.query;

    let query = `SELECT * FROM books WHERE 1=1`;
    const queryParams = [];
    let paramIndex = 1;

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
      query += ` AND status ILIKE $${paramIndex}`;
      queryParams.push(`${status}`);
      paramIndex++;
    }

    if (rating) {
      query += ` AND rating = $${paramIndex}`;
      queryParams.push(parseInt(rating));
      paramIndex++;
    }

    // Validate sort columns
    const validSortColumns = ['title', 'author', 'rating'];
    const sanitizedSortBy = validSortColumns.includes(sortBy) ? sortBy : 'title';
    const sanitizedOrder = ['ASC', 'DESC'].includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';
    
    query += ` ORDER BY ${sanitizedSortBy} ${sanitizedOrder}`;

    const result = await db.query(query, queryParams);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// R - read: GET /api/books/:id
const getBookById = async (req, res) => {
  // db interaction
  try {
    const user_id = req.user.user_id; 
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
  // input validation
  await Promise.all([
    body('title')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Title is required and must be a string')
      .run(req),
    body('author')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Author is required and must be a string')
      .run(req),
    body('status')
      .isIn(['read', 'reading', 'unread'])
      .withMessage('Status must be one of "read", "reading", or "to-read"')
      .run(req),
    body('rating')
      .isIn([1, 2, 3, 4, 5])
      .withMessage('Rating must be a number between 1 and 5')
      .run(req),
  ]);

  // check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // db interaction
  try {
    const user_id = req.user.user_id;
    const { title, author, status, rating } = req.body; 
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
  // db interaction
  try {
    const user_id = req.user.user_id; 
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
