const express = require("express");

const router = express.Router();
const {
  allUsers,
  addUser,
  getUserById,
  userLookup,
} = require("../../models/User");
const db = require("../../data/db-config");

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

  const userExists = await userLookup(email);
  console.log(userExists);
  if (userExists.length === 1) {
    return res
      .status(500)
      .json({ message: "There is already an account with that email" });
  } 

  if (username.length > 3 && password.length > 5 && email !== undefined) {
    try {
      await addUser(username, email, password);
      res.status(201).json({ message: "user added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "there was an error with your request" });
    }
  }
});

module.exports = router;
