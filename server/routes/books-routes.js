const express = require("express");

const booksControllers = require("../controllers/books-controllers");

const router = express.Router();

router.get("/all-books", booksControllers.getBooks);

router.get("/book/:id", booksControllers.getBookById);

router.post("/upload-book", booksControllers.uploadBook);

router.patch("/book/:id", booksControllers.updateBook);

router.delete("/book/:id", booksControllers.deleteBook);

module.exports = router;
