const db = require("../data/db-config");

const allUsers = async () => {
  return db("users");
};

const addUser = async (username, email, password) => {
  return db("users").insert({ username, email, password });
};

const getUserById = async (id) => {
  return db("users").where(id);
};

module.exports = { allUsers, addUser, getUserById };
