const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  allUsers,
  addUser,
  getUserById,
  userLookup,
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

  bcrypt.hash(password, 10, (err, hash) => {
    hashedPassword = hash;
  });

  const userExists = await userLookup(email);
  console.log(userExists);
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
  const { username, passsword } = req.body;
});

module.exports = router;
