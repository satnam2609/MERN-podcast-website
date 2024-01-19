const express = require("express");

const { adminCheck } = require("../middleware/admin");
const {
  create,
  list,
  getOne,
  update,
  remove,
} = require("../controller/category");

const router = express.Router();

// creating category

router.post("/category", adminCheck, create);

// listing all categories
router.get("/categories", list);

// getting one category for updation
router.get("/category/:slug", adminCheck, getOne);

// update and remove category
router.put("/category/:slug", adminCheck, update);
router.delete("/category/:slug", adminCheck, remove);
module.exports = router;
