require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {

    const token = req.headers.authorization || undefined;
    
    if(token) {
      jwt.verify(token, process.env.AUTH_SECRET);
      next();
    } else {
      res.status(401).json({ message: " poop you must be logged in" });
    }
};

const checkAdmin = (req, res, next) => {
 
    const token = req.headers.authorization;
    const tokenResult = jwt.verify(token, process.env.AUTH_SECRET);

    if (tokenResult.role !== "admin") {
      res.status(401).json({ message: "Not Authorized" });
    } else {
      next();
    }

};

module.exports = { checkToken: checkToken, checkAdmin: checkAdmin };
