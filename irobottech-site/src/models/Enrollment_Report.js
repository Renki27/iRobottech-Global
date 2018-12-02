
const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
  "ENROLLMENT_REPORT",
  {
    RESERVATION_NUMBER: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      
    },
    SEC_ID_ACCOUNT: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true
    },
    SEC_ID_PERSON: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true
        
    },
    STU_ID_ACCOUNT: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    STU_ID_PERSON: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ADM_ID_ACCOUNT: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true
    },
    ADM_ID_PERSON: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true
        
    },
    START_DATE:{
        type: Sequelize.DATE
    },

    END_DATE:{
        type: Sequelize.DATE
    },
    NUMBER_WEEKS:{
        type: Sequelize.INTEGER
    },
    COURSE_NAME:{
        type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    tableName: "ENROLLMENT_REPORT"
  }
);