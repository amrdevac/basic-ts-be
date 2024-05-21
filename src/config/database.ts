import knex from "knex";

const adapKnex = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "3306"),
    user: process.env.DB_ROOT,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

export { adapKnex };
