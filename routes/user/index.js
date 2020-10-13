
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  allUsers,
  addUser,
  getUserById,
  emailLookup,
  login,
} = require("../../models/User");

const {checkToken, checkAdmin} = require("../../middleware");

router.get("/", checkToken, checkAdmin, async (req, res) => {
  try {
    res.status(200).json(await allUsers());
  } catch (error) {
    res.status(500).json({ message: "there was an error with your request" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return res
      .send(500)
      .json({ message: "there was an error with your request" });
  }

  const userExists = await emailLookup(email);
  if (userExists.length === 1) {
    return res
      .status(400)
      .json({ message: "There is already an account with that email" });
  }

  if (username.length > 3 && password.length > 5 && email !== undefined) {
    try {
      await addUser(username, email, hashedPassword, "user");
      res.status(201).json({ message: "user added" });
    } catch (error) {
      res.status(500).json({ message: "there was an error with your request" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);
    if (!user) {
      res.status(401).json({ message: "Incorrect username or password" });
    } else {
      res.cookie("token", user, { httpOnly: true });
      res.status(200).send();
    }
  } catch (error) {
    
    res.status(500).json({ message: "Error with request" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(204).end();
});

module.exports = router;
