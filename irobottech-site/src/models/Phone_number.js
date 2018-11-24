const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
  "PHONE_NUMBER",
  {
    id_person: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    phone_number: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  },
  {
    timestamps: false,
    tableName: "PHONE_NUMBER"
  }
);
