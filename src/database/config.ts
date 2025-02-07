import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  username: "user",
  password: "password",
  database: "lighthouse-backend-challenge",
  port: 5432,
});

export default sequelize;
