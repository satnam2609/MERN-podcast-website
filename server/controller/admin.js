const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.mailAdmin = async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "satnamm143@gmail.com", // Replace with your email address
        pass: "xrrbmtdggcxvcnxj", // Replace with your email password
      },
    });

    // Define the email options
    let mailOptions = {
      from: "satnamm143@@gmail.com", // Replace with your email address
      to: email, // Replace with recipient email address
      subject: subject,
      text: text,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(200).json({ error: error.message });
      } else {
        res.status(200).json({ result: info.response });
      }
    });
  } catch (error) {
    console.log("Mail user error", error);
    throw new Error("Something went wrong");
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the admin already exists
    const adminExits = await Admin.findOne({ email: email });
    if (adminExits) {
      console.log("Admin already exists", adminExits);
      res.json({
        message: "Admin already exists",
      });
    }

    // if not exits then create an admin
    // the password need to be hashed before adding to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("Admin created!", admin);
    res.json(admin);
  } catch (error) {
    console.log("Create admin error:", error);
    res.json({
      error: error.message,
    });
  }
};

exports.addNewAdmin = async (req, res) => {
  try {
    // i will implement latter this one!
  } catch (error) {
    console.log("Create extra admin error:", error);
    res.json({
      error: error.message,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // i need to check that the admin is existing in the database
  const adminExits = await Admin.findOne({ email: email });
  // now we will compare the password
  if (adminExits && (await bcrypt.compare(password, adminExits.password))) {
    // @notice we will not give the full password in login endpoint but create an token admin
    res.json({
      admin: {
        id: adminExits._id,
        email,
        token: generateToken(adminExits._id),
      },
      success: true,
    });
  } else {
    res.json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

exports.changeAdminPass = async (req, res) => {
  try {
    // first we will send the email to the amdin and then by clicking the link ,the admin can change password
    const { email, newPassword } = req.body;

    // check if admin exists
    const isAdmin = await Admin.findOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedAdmin = await Admin.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    console.log("Admin password change", updatedAdmin);
    res.json({
      updatedAdmin,
      hashedPassword,
    });
  } catch (error) {
    console.log("Change password error:", error);
    res.json({
      error: error.message,
    });
  }
};

exports.currentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ _id: req.admin.id });
    res.json({
      email: admin.email,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};
