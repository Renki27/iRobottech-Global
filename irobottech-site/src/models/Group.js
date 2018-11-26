const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");


module.exports = mysqlConnection.sequelize.define(
    "ST_GROUP",
    {
        ST_GROUP_NUMBER: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        PROF_ID_ACCOUNT: {
            type: Sequelize.INTEGER,
        },
        PROF_ID_PERSON: {
            type: Sequelize.INTEGER,
        },
        COURSE_NAME: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        AVAILABLE_QUOTA: {
            type: Sequelize.INTEGER,
        },
    },
    {
        timestamps: false,
        tableName: "ST_GROUP"
    }
);