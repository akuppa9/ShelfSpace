// auth routes
const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authController");

// Route for login user (not first time)
router.post("/login", login);

// Route for signup user (first time)
router.post("/signup", signup);

module.exports = router;
