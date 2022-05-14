const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createJWT } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const usedEmail = await User.findOne({ email });

  if (usedEmail) {
    throw new CustomError.BadRequestError("Email already exits");
  }

  // first user is an admin
  const firstUser = (await User.countDocuments({})) === 0;
  const role = firstUser ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: tokenUser });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = {
  register,
  login,
  logout,
};
