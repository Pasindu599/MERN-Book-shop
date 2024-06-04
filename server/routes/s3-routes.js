const express = require("express");

const s3Controllers = require("../controllers/s3-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// router.use(checkAuth);

router.get("/upload-file/", s3Controllers.uploadFile);
// router.put("/s3Url/upload", s3Controllers.uploadFile);

module.exports = router;
