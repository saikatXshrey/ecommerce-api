// package
const express = require("express");
const router = express.Router();

// controller
const { register, login, logout } = require("../controllers/authController");

// http req
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
