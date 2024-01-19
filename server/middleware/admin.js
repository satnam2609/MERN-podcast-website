const jwt = require("jsonwebtoken");

exports.adminCheck = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, admin) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403); // Forbidden
    }

    req.admin = admin;
    next();
  });
};
