// package
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      message: "Please provide a valid email",
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
