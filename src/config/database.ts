import knex from "knex";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("nama_orang", "root", "admin123!", {
  host: "localhost",
  dialect: "mysql",
});

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

export { sequelize, adapKnex };
