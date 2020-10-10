const db = require("../data/db-config");

const allUsers = () => {
  return db("users");
};

const addUser = (username, email, password) => {
  return db("users").insert({ username, email, password });
};

const getUserById = (id) => {
  return db("users").where({ id });
};

const userLookup = (email) => {
  return db("users").where({ email });
};

module.exports = { allUsers, addUser, getUserById, userLookup };
