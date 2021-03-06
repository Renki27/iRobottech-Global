const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const group = require("../models/Group");
router.use(cors());
process.env.SECRET_KEY = "secret";

const groupData = group;


router.get("/", (req, res) => {

    groupData.findAll()
        .then(function (group) {
            res.json(group);
        })

});

router.get("/groupFind/:name", (req, res) => {

    groupData.findAll({where: { COURSE_NAME: req.params.name}})
        .then(function (group) {
            res.json(group);
        })

});

router.get("/group/:name", (req, res) => {
    groupData.count({ where: { COURSE_NAME: req.params.name} }
    ).then(function (account) {
        if (account) {
            res.json(account);
           // res.send(account);
        } else {
            console.log(res.err);
        }
    });
});

router.put("/groupU/:quota/:numberC/:name", (req, res) => {
    groupData.update({AVAILABLE_QUOTA: req.params.quota},{ where: {ST_GROUP_NUMBER: req.params.numberC, COURSE_NAME:  req.params.name}})
        .then(result => res.json(result))
});

router.delete("/groupD/:numberC/:name", (req, res) => {
    groupData.destroy({ where: {ST_GROUP_NUMBER: req.params.numberC, COURSE_NAME:  req.params.name}})
        .then(result => res.json(result))
});

router.post("/", (req, res) => {
    groupData.create(req.body)
        .then(result => res.json(result))
});

module.exports = router;