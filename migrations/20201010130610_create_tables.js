exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username", 35).unique().notNullable();
    tbl.string("email", 96).unique().notNullable();
    tbl.string("password").notNullable();
    tbl.string("role").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
