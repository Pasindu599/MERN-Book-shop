const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const booksRoutes = require("./routes/books-routes");
const usersRoutes = require("./routes/users-routes");
const s3Routes = require("./routes/s3-routes");

// const generateUploadUrl = require("./controllers/s3");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/books/", booksRoutes);
app.use("/api/users/", usersRoutes);
app.use("/s3Url/", s3Routes);

// app.get("/s3Url", async (req, res) => {
//   const url = await generateUploadUrl();
//   res.send({ url });
// });

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to database!");
  app.listen(process.env.PORT || 5000);
});

module.exports = app;
