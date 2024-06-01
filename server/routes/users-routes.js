const express = require("express");
const { check, validationResult } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/all-users", usersControllers.getUsers);

router.get("/user/:id", usersControllers.getUserById);

router.get("/user-email/:email", usersControllers.getUserByEmail);

//validate the input fields
router.post("/signup", usersControllers.signupUser);

router.patch("/user/:id", usersControllers.updateUser);

router.delete("/user/:id", usersControllers.deleteUser);

router.get("/:id/products", usersControllers.getProductsByUserId);

router.get("/products/:email", usersControllers.getProductsByEmail);

module.exports = router;
