const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connectionDataBase/databaseConnection");
const cors = require("cors");
const _Class = require("../models/Class");
const Group = require("../models/Group");

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
    });
});

//Get Professor classes
router.get("/getMyClasses/:id", (req, res) => {
  mysqlConnection.sequelize
    .query("CALL SELECT_GET_PROFESSOR_CLASSES_BY_ID(:p0)", {
      replacements: {
        p0: req.params.id
      }
    })
    .then(function(data) {
      if (data) {
        res.json(data);
      }
    });
});

//Get professor groups
router.get("/getMyGroups/:id", (req, res) => {
  Group.findAll({
    where: {
      prof_id_account: req.params.id
    }
  }).then(function(data) {
    if (data) {
      res.json(data);
    } else {
      res.json(0);
    }
  });
});



//Get all groups
router.get("/getAllGroupsNCourses", (req, res) => {
  mysqlConnection.sequelize
  .query("CALL SELECT_GET_ALL_GROUPS_N_COURSES ()")
  .then(function(data) {
    if (data) {
      res.json(data);
    } else {
      res.json(0);
    }
  });
});



//Get Professor courses
router.get("/getMyCourses/:id", (req, res) => {
  mysqlConnection.sequelize
    .query("CALL SELECT_GET_PROFESSOR_COURSES_BY_ID(:p0)", {
      replacements: {
        p0: req.params.id
      }
    })
    .then(function(data) {
      if (data) {
        res.json(data);
      }
    });
});

module.exports = router;
