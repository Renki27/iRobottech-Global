const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const group = require("../models/Group");
const mysqlConnection = require("../connectionDataBase/databaseConnection");
const secretary = require("../models/Secretary");
const proffesor = require("../models/Professor");
router.use(cors());
process.env.SECRET_KEY = "secret";
const account = require("../models/Account");

const groupData = group;


router.get("/", (req, res) => {

    account.findAll(
        {
            where: {
                account_type: ["SECRETARY", "PROFESSOR", "STUDENT"]
            }
        }

    )
        .then(function (group) {
            res.json(group);
        })

});



router.get("/personal", (req, res) => {

    account.findAll(
        {
            where: {
                account_type: ["SECRETARY", "PROFESSOR"]
            }
        }
    )
        .then(function (group) {
            res.json(group);
        })

});

router.get("/students", (req, res) => {

    account.findAll(
        {
            where: {
                account_type: ["STUDENT"],
                status: ["ACTIVE"]
            }
        }

    )
        .then(function (group) {
            res.json(group);
        })

});

router.get("/proffesors", (req, res) => {
    mysqlConnection.sequelize
    .query("CALL SELECT_PROFFESOR_REPORT", {
    })
        .then(function (group) {
            res.json(group);
        })

});


router.get("/secretary", (req, res) => {
    mysqlConnection.sequelize
    .query("CALL SELECT_SECRETARY_REPORT", {
    })
        .then(function (group) {
            res.json(group);
        })
});






router.get("/group/:name", (req, res) => {
    groupData.count({ where: { COURSE_NAME: req.params.name } }
    ).then(function (account) {
        if (account) {
            res.json(account);
            res.send(account);
        } else {
            console.log(res.err);
        }
    });
});


router.post("/", (req, res) => {
    groupData.create(req.body)
        .then(result => res.json(result))
});

module.exports = router;