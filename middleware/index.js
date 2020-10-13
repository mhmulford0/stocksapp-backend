require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.token || undefined;
    jwt.verify(token, process.env.AUTH_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "you must be logged in" });
  }
};

const checkAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token || undefined;
    const tokenResult = jwt.verify(token, process.env.AUTH_SECRET);

    if (tokenResult.role !== "admin") {
      res.status(401).json({ message: "Not Authorized" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "there was an error with your request" });
  }
};

module.exports = { checkToken: checkToken, checkAdmin: checkAdmin };
