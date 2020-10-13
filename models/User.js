require("dotenv").config();
const db = require("../data/db-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const allUsers = () => {
  return db("users").select("id", "username", "role").orderBy("id");
};

const addUser = (username, email, password, role) => {
  return db("users").insert({ username, email, password, role: "user" });
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
      .select("username", "password", "role", "id")
      .from("users")
      .where({ username });
  } catch (error) {
    return false;
  }
  if(user){
    try {
      const authed = await bcrypt.compare(password, user[0].password);
      if(authed) {
        return jwt.sign(
          { sub: user[0].id, username: user[0].username, role: user[0].role },
          process.env.AUTH_SECRET,
          {
            expiresIn: "4h",
          }
        );
        
      } else {
        return false
      }
      
    } catch (error) {
      return false
    }
  }
};

module.exports = { allUsers, addUser, getUserById, emailLookup, login };
