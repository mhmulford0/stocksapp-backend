require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || undefined;
    await jwt.verify(token, process.env.AUTH_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "you must be logged in" });
  }
};

module.exports = checkToken;
