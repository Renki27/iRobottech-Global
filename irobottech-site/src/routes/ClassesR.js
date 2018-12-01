const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connectionDataBase/databaseConnection");
const cors = require("cors");
const _Class = require("../models/Class");

router.use(cors());

//Get Students from group and course
router.get("/getClassNumber/:courseName/:groupNumber", (req, res) => {
  _Class
    .count({
      where: {
        course_name: req.params.courseName,
        st_group_number: req.params.groupNumber
      }
    })
    .then(function(counter) {
      if (counter) {
        res.json(counter);
      } else {
        res.json(0);
      }
    });
});

//insert class
router.post("/createClass", (req, res) => {
  _Class
    .create({
      number_class: req.body.lastClassN,
      st_group_number: req.body.groupNumber,
      course_name: req.body.courseName,
      time: req.body.currentTime,
      date: req.body.currentDate
    })
    .then(function(msj) {
      if (msj) {
        // res.send(msj);
        res.send(msj);
      } else {
        console.log(res.err);
      }
    })
});

module.exports = router;
