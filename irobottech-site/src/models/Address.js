const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
  "ADDRESS",
  {
    id_address: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_person: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    full_address: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    tableName: "ADDRESS"
  }
);
