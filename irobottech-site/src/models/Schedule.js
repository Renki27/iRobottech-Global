const Sequelize = require("sequelize");
const mysqlConnection = require("../connectionDataBase/databaseConnection");

module.exports = mysqlConnection.sequelize.define(
    'SCHEDULE',
    {
        DAY_NUMBER:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }, 
        ST_GROUP_NUMBER:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }, 
        COURSE_NAME:{
            type: Sequelize.STRING,
            primaryKey: true
        }, 
        ASSIGNED_DAY:{
            type: Sequelize.STRING
        }, 
        ASSIGNED_HOURS:{
            type: Sequelize.INTEGER,
        }, 
        START_TIME:{
            type: Sequelize.TIME,
        }, 
        END_TIME:{
            type: Sequelize.TIME,
        }
    },
    {
        timestamps: false,
        tableName: 'SCHEDULE'
    }
);