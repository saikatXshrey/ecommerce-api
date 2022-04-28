// dotenv
require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// server start
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, (req, res) => {
      console.log(`Server listening to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
