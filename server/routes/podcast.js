const express = require("express");

const { adminCheck } = require("../middleware/admin");
const {
  create,
  list,
  getOne,
  update,
  remove,
  related,
} = require("../controller/podcast");

const router = express.Router();

// creating podcast

router.post("/podcast", adminCheck, create);

// listing all podcasts
router.get("/podcasts", list);

// // getting one podcast for updation
router.get("/podcast/:slug", adminCheck, getOne);

// // update and remove podcast
router.put("/podcast/:slug", adminCheck, update);
router.delete("/podcast/:slug", adminCheck, remove);

// category wise
router.get("/podcasts/:category", related);

// featured only

module.exports = router;
