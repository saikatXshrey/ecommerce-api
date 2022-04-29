// packages
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
const connectDB = require("./db/connect");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ecommerce");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
