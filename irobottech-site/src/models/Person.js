const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
  "PERSON",
  {
    id_person: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identification: {
      type: Sequelize.INTEGER,
    },
    first_name: {
      type: Sequelize.STRING
    },
    second_name: {
      type: Sequelize.STRING
    },
    last_name_1: {
      type: Sequelize.STRING
    },
    last_name_2: {
      type: Sequelize.STRING
    },
    birth_date: {
      type: Sequelize.DATE
    },
  },
  {
    timestamps: false,
    tableName: "PERSON"
  }
);
