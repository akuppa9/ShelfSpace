const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/auth");
const db = require("../config/database");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await db.query(query, [username]);

    const user = result.rows[0]; // user fetched from db based on username input
    if (!user) {
      return res.status(401).json({ error: "Username does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash); // check if password matches user in db
    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // create token, lets user stay logged in for 24 hrs
    const token = jwt.sign(
      {
        user_id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Error authenticating user", error);
    res.status(500).json({ error: "Failed to authenticate user" });
  }
};

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    if (username && username.includes(" ")) {
      return res
        .status(401)
        .json({ error: "Username cannot contain whitespace" });
    }

    if (password && password.length < 8) {
      return res
        .status(401)
        .json({ error: "Password must be atleast 8 characters long" });
    }

    const query = "SELECT * FROM users WHERE username = $1";
    const checkUser = await db.query(query, [username]);
    const existingUser = checkUser.rows[0];

    if (existingUser) {
      return res.status(400).json({ error: "Username has been taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { user_id: user.id, username: user.username }, // Changed to userId for consistency
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Error in register", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteAccount = (req, res) => {};

module.exports = { login, signup };
