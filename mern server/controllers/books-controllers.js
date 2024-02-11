const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const e = require("express");

const Book = require("../models/book");

// const getBooks = async (req, res, next) => {
//   let books;
//   try {
//     books = await Book.find({});
//   } catch (err) {
//     const error = new HttpError(
//       "Fetching books failed, please try again later.",
//       500
//     );
//     return next(error);
//   }
//   res.json({ books: books.map((book) => book.toObject({ getters: true })) });
// };

const getBooks = async (req, res, next) => {
  let query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  let books;
  try {
    books = await Book.find(query);
  } catch (err) {
    const error = new HttpError(
      "Fetching books failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ books: books.map((book) => book.toObject({ getters: true })) });
};

const uploadBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, bookImage, authorName, price, category, pdfURL } =
    req.body;

  const createdBook = new Book({
    title,
    description,
    bookImage,
    authorName,
    price,
    category,
    pdfURL,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdBook.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating book failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ book: createdBook });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const bookId = req.params.id;

  const updateBookData = req.body;

  const filter = { _id: new mongoose.Types.ObjectId(bookId) };

  const options = { upsert: true };

  const updateDoc = {
    $set: {
      ...updateBookData,
    },
  };
  const result = await Book.updateOne(filter, updateDoc, options);
  res.status(201).json({ book: result });
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;
  let book;
  try {
    book = await Book.findById(bookId);
    console.log(book);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong.Could not delete the place",
      500
    );
    return next(error);
  }

  if (!book) {
    const error = new HttpError("Could not find book for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await book.deleteOne({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong.Could not delete the place",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted book." });
};

exports.uploadBook = uploadBook;
exports.getBooks = getBooks;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
