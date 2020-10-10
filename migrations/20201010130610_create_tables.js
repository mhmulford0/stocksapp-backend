exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username", 35);
    tbl.string("email", 96).unique();
    tbl.string("password");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
