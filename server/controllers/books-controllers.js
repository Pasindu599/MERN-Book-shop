const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const e = require("express");

const Book = require("../models/book");
const User = require("../models/user");
const user = require("../models/user");

const getBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching books failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ books: books.map((book) => book.toObject({ getters: true })) });
};
// find by category
// const getBooks = async (req, res, next) => {
//   let query = {};
//   if (req.query.category) {
//     query.category = req.query.category;
//   }
//   let books;
//   try {
//     books = await Book.find(query);
//   } catch (err) {
//     const error = new HttpError(
//       "Fetching books failed, please try again later.",
//       500
//     );
//     return next(error);
//   }
//   res.json({ books: books.map((book) => book.toObject({ getters: true })) });
// };

// get a single book

const getBookById = async (req, res, next) => {
  const bookId = req.params.id;
  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a book.",
      500
    );
    return next(error);
  }

  if (!book) {
    const error = new HttpError(
      "Could not find a book for the provided id.",
      404
    );
    return next(error);
  }

  res.json({
    book: book.toObject({ getters: true }),
  });
};

const uploadBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  console.log(req.body, "req.body");

  const {
    productName,
    description,
    productImage,
    normalPrice,
    salePrice,
    discount,
    category,
    email,
  } = req.body;

  //find id using email
  const userEmail = email;
  // console.log(userEmail, "userEmail");
  let currentUser;
  try {
    currentUser = await User.findOne({ userEmail: userEmail });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }
  // console.log(currentUser, "currentUser");
  if (!currentUser) {
    const error = new HttpError(
      "Could not find a user for the provided email.",
      404
    );
    return next(error);
  }

  const user = currentUser;

  const createdBook = new Book({
    productName,
    description,
    productImage,
    normalPrice,
    salePrice,
    discount,
    category,
    user,
  });

  try {
    const existingBook = await Book.findOne({ productName: productName });
    if (existingBook) {
      const error = new HttpError("Book already exists", 422);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Creating book failed, please try again.", 500);
    return next(error);
  }

  try {
    // console.log(user.products, "user.products");
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdBook.save({ session: sess });
    user.products.push(createdBook);
    // console.log(user.products, "user.products");
    await user.save({ session: sess });
    // console.log(user.products, "user.products");
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating book failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ book: createdBook.toObject({ getters: true }) });
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

    user = await User.findById(book.user);
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

  if (book.user._id.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to delete this book", 401);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    console.log(user, "book.user");
    console.log(user.products, "book.user.products");
    user.products.pull(book);
    console.log(user.products, "book.user.products");
    await user.save({ session: sess });
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
exports.getBookById = getBookById;
