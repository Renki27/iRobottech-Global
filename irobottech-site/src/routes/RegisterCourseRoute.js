const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const course = require("../models/Course");
const Group = require("../models/Group");

router.use(cors());
process.env.SECRET_KEY = "secret";

const courseData = course;

router.get("/", (req, res) => {
  courseData.findAll().then(function(course) {
    res.json(course);
  });
});

router.get("/course/:CourseName", (req, res) => {
    courseData.findOne({
        where: {
            COURSE_NAME: req.params.CourseName
        }
      }).then(function (group) {
            res.json(group);
        })

});

router.get("/groups/:CourseName", (req, res) => {
  Group.findAll({
      where: {
          COURSE_NAME: req.params.CourseName
      }
    }).then(function (group) {
          res.json(group);
      })

});

router.post("/", (req, res) => {
  courseData.create(req.body).then(result => res.json(result));
});

module.exports = router;
