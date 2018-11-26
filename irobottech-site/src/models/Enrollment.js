const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
  "ENROLLMENT",
  {
    ST_GROUP_NUMBER: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      
    },
    COURSE_NAME: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    STU_ID_ACCOUNT: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    STU_ID_PERSON: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
   
    
  },
  {
    timestamps: false,
    tableName: "ENROLLMENT"
  }
);