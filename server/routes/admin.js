const express = require("express");
const {
  createAdmin,
  addNewAdmin,
  loginAdmin,
  changeAdminPass,
  mailAdmin,
  currentAdmin,
} = require("../controller/admin");
const { adminCheck } = require("../middleware/admin");
const router = express.Router();

//endpoint for creating an admin
router.post("/create-admin", createAdmin);

// admin endpoint for creating new admin
router.post("/add-admin", addNewAdmin);

// login endpoint for admin to login
router.post("/login-admin", loginAdmin);

// current admin
router.get("/current-admin", adminCheck, currentAdmin);

// forgot password
router.put("/forgot-password", adminCheck, changeAdminPass);
module.exports = router;

router.post("/send-email", adminCheck, mailAdmin);
