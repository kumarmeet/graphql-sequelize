const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: "root",
  password: "meet4629",
  database: "blog",
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
