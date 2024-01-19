const express = require("express");
const router = express.Router();

// middlewares
const { adminCheck } = require("../middleware/admin");

// controllers
const { upload, remove } = require("../controller/cloudinary");

router.post("/uploadimages", adminCheck, upload);
router.post("/removeimage", adminCheck, remove);

module.exports = router;
