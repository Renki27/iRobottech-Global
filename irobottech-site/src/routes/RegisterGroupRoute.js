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


router.post("/", (req, res) => {
    groupData.create(req.body)
        .then(result => res.json(result))
});

module.exports = router;