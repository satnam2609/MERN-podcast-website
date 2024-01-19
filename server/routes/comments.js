const express = require("express");
const { getComments } = require("../controller/comments");

const router = express.Router();

router.get("/comments/:blog", getComments);

module.exports = router;
