exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 323,
          username: "matt",
          password: "",
          email: "matt@test.com",
          password:
            "$2b$10$y2kqCepnU7yQA2ec1FhPsO0xF9336Z6UMXen/mX/SJgv1FPnRbexK",
          role: "admin",
        },
      ]);
    });
};
