const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
    "COURSE",
    {
        COURSE_NAME: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        ADM_ID_ACCOUNT: {
            type: Sequelize.INTEGER,
        },
        ADM_ID_PERSON: {
            type: Sequelize.INTEGER,
        },
        SEC_ID_ACCOUNT: {
            type: Sequelize.INTEGER,
        },
        SEC_ID_PERSON: {
            type: Sequelize.INTEGER,
        },
        CATEGORY: {
            type: Sequelize.STRING
        },
        COUSE_CODE: {
            type: Sequelize.STRING
        },
        STATUS: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,
        tableName: "COURSE"
    }
);