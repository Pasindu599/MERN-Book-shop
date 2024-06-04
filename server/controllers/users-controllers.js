const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const e = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Book = require("../models/book");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
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

const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const getUserByEmail = async (req, res, next) => {
  const userEmail = req.params.email;

  console.log(userEmail);

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
  if (!currentUser) {
    const error = new HttpError(
      "Could not find a user for the provided email.",
      404
    );
    return next(error);
  }

  const user = currentUser;
  res.json({ user: user.toObject({ getters: true }) });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    name,
    userEmail,
    mobile,
    address,
    city,
    state,
    zip,
    country,
    paymentMethod,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userEmail: userEmail });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  // get email in lowercase

  const createdUser = new User({
    name,
    userEmail,
    mobile,
    address,
    city,
    state,
    zip,
    country,
    paymentMethod,
    products: [],
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    console.log(createdUser);
    await createdUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, userEmail: createdUser.userEmail },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser, token: token });
};

// for google sign up

const signupUserGoogle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    name,
    userEmail,
    mobile,
    address,
    city,
    state,
    zip,
    country,
    paymentMethod,
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userEmail: userEmail });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const createdUser = new User({
      name,
      userEmail,
      mobile,
      address,
      city,
      state,
      zip,
      country,
      paymentMethod,
      products: [],
    });

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      console.log(createdUser);
      await createdUser.save({ session: sess });
      existingUser = createdUser;
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Creating user failed, please try again.",
        500
      );
      return next(error);
    }
  } else {
    console.log("User already exists");
  }

  let token;

  token = jwt.sign(
    { userId: existingUser.id, userEmail: existingUser.userEmail },
    "supersecret_dont_share",
    { expiresIn: "1h" }
  );

  res.status(201).json({ user: existingUser, token: token });
};

const loginUser = async (req, res, next) => {
  let token;
  const { userEmail } = req.body;

  token = jwt.sign(
    { userId: userEmail.id, userEmail: userEmail.userEmail },
    "supersecret_dont_share",
    { expiresIn: "1h" }
  );

  res.status(201).json({ user: userEmail, token: token });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const userId = req.params.id;

  const updateUserData = req.body;

  const filter = { _id: new mongoose.Types.ObjectId(userId) };

  const options = { upsert: true };

  const updateDoc = {
    $set: {
      ...updateBookData,
    },
  };
  const result = await User.updateOne(filter, updateDoc, options);
  res.status(201).json({ book: result });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await User.findById(userId);
    console.log(user);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong.Could not delete the user",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.deleteOne({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong.Could not delete the user",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted User." });
};

const getProductsByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let products;
  try {
    products = await User.findById(userId).populate("products");
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  //   if (!products || products.length === 0) {
  //     return next(
  //       new HttpError("Could not find products for the provided user id.", 404)
  //     );
  //   }

  res.json({
    products: products.products.map((product) =>
      product.toObject({ getters: true })
    ),
  });
};

const getProductsByEmail = async (req, res, next) => {
  const userEmail = req.params.email;

  console.log(userEmail);

  let products;
  try {
    products = await User.findOne({ userEmail: userEmail }).populate(
      "products"
    );
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  // if (!products || products.length === 0) {
  //     return next(
  //     new HttpError("Could not find products for the provided user email.", 404)
  //     );
  // }

  res.json({
    products: products.products.map((product) =>
      product.toObject({ getters: true })
    ),
  });
};

exports.signupUser = signupUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.getProductsByUserId = getProductsByUserId;
exports.getUserByEmail = getUserByEmail;
exports.getProductsByEmail = getProductsByEmail;
exports.signupUserGoogle = signupUserGoogle;
exports.loginUser = loginUser;
