import knex from "knex";

const adapKnex = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "admin123!",
    database: "nama_orang",
  },
});

export { adapKnex };
