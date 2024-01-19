const express = require("express");

const {
  create,
  list,
  related,
  getOne,
  update,
  remove,
  addComment,
  replyToAuthor,
  filterBlogs,
} = require("../controller/blog");

const router = express.Router();

const { adminCheck } = require("../middleware/admin");

router.post("/blog", adminCheck, create);
router.get("/blogs", list);
router.get("/blog/:slug", getOne);
router.put("/blog/:slug", adminCheck, update);
router.delete("/blog/:slug", adminCheck, remove);
router.get("/blogs-related/:category", related);
// creating an end-point for commenting
router.put("/blog/comment/:blog", addComment);
router.put("/blog/reply/:blog", replyToAuthor);

// filter
router.post("/blogs/filter", filterBlogs);
module.exports = router;
