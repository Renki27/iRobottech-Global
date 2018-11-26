const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
  "STUDENT",
  {
    id_account: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_person: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    guardian_name: {
      type: Sequelize.STRING
    },
    guardian_id: {
      type: Sequelize.INTEGER
    },
    emergency_number: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: "STUDENT"
  }
  
);
