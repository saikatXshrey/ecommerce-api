const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log("Connected to DB");
  return mongoose.connect(url);
};

module.exports = connectDB;
