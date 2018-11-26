const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
  "CLASS",
  {
    number_class: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    st_group_number: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    course_name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    time: {
      type: Sequelize.TIME
    },
    date: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false,
    tableName: "CLASS"
  }
);
