const dotenv = require("dotenv");

dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  CI_DB_USERNAME,
  CI_DB_PASSWORD,
  CI_DB_DATABASE,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_DATABASE,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      // underscored: true,
      timestamps: true,
      freezeTableName: true,
    },
  },
  test: {
    username: CI_DB_USERNAME,
    password: CI_DB_PASSWORD,
    database: CI_DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      // underscored: true,
      timestamps: true,
      freezeTableName: true,
    },
  },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_DATABASE,
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      // underscored: true,
      timestamps: true,
      freezeTableName: true,
    },
  },
};
