require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || undefined;
    const tokenResult = await jwt.verify(token, process.env.AUTH_SECRET);
    console.log(tokenResult.role);
    next();
  } catch (error) {
    res.status(401).json({ message: "you must be logged in" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token || undefined;
    const tokenResult = await jwt.verify(token, process.env.AUTH_SECRET);

    if (tokenResult.role !== "admin") {
      res.status(401).json({ message: "Not checck" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "there was an error with your request" });
  }
};

module.exports = { checkToken: checkToken, checkAdmin: checkAdmin };
