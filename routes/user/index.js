
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



router.get("/", async (req, res) => {
  try {
    const result = await allUsers();
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: "there was an error with your request" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const result = await getUserById(id);
      res.status(200).json({ data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "there was an error" });
    }
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
      await addUser(username, email, hashedPassword);
      res.status(201).json({ message: "user added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "there was an error with your request" });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await login(username, password);
    res.status(200).json({ token: user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "not authorizied" });
  }
  


});

module.exports = router;
