const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const booksRoutes = require("./routes/books-routes");
const usersRoutes = require("./routes/users-routes");

const generateUploadUrl = require("./controllers/s3");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/books/", booksRoutes);
app.use("/api/users/", usersRoutes);

app.get("/s3Url", async (req, res) => {
  const url = await generateUploadUrl();
  res.send({ url });
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://Pasindu:Pasindu@cluster0.9mlarce.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000);
  });

module.exports = app;
