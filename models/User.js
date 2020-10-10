require("dotenv").config();
const db = require("../data/db-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const allUsers = () => {
  return db("users");
};

const addUser = (username, email, password) => {
  console.log(username, email, password);
  return db("users").insert({ username, email, password });
};

const getUserById = (id) => {
  return db("users").where({ id });
};

const emailLookup = (email, username) => {
  return db("users").where({ email });
};

const login = async (username, password) => {
  let user;
  try {
    user = await db
      .select("username", "password")
      .from("users")
      .where({ username });
  } catch (error) {
    console.log(error);
  }
  
  try {
    const authed = await bcrypt.compare(password, user[0].password);
    if(authed) {
      const token = jwt.sign(user[0].username, process.env.AUTH_SECRET, {expiresIn: "4h"});
    } else {
      return ({message: "Username or password incorrect"})
    }
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = { allUsers, addUser, getUserById, emailLookup, login };
