// auth routes
const express = require("express");
const router = express.Router();
// middleware function import
const { authenticateToken } = require("../config/auth");
const { login, signup, deleteAccount } = require("../controllers/authController");

// Route for login user (not first time)
router.post("/login", login);

// Route for signup user (first time)
router.post("/signup", signup);

// Route for delete existing account/user (protected)
router.post("/delete-account", authenticateToken, deleteAccount);

module.exports = router;
