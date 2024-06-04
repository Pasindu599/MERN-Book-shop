const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const e = require("express");

const generateUploadUrl = require("../middleware/s3");

const uploadFile = async (req, res) => {
  const url = await generateUploadUrl();
  res.send({ url });
};

exports.uploadFile = uploadFile;
