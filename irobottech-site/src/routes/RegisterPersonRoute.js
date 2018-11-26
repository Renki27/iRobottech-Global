const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const person = require("../models/Person");
const professor = require("../models/Professor");
router.use(cors());
process.env.SECRET_KEY = "secret";
const mysqlConnection = require("../connectionDataBase/databaseConnection");

const groupData = person;


router.get("/", (req, res) => {

    mysqlConnection.sequelize.query("CALL SELECT_PROFESSOR")
        .then(function (group) {
            res.json(group);
        })

});


router.post("/", (req, res) => {
    groupData.create(req.body)
        .then(result => res.json(result))
});

module.exports = router;