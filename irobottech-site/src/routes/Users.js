const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connectionDataBase/databaseConnection");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const Account = require("../models/Account");
const Person = require("../models/Person");
const Class = require("../models/Class");
const Student = require("../models/Student");
const Enrollment = require("../models/Enrollment");
const Enrollment_Report = require("../models/Enrollment_Report");
router.use(cors());

process.env.SECRET_KEY = "secret";

//Registrar profesor
router.post("/registerProfessor", (req, res) => {
  const professorData = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    lastName1: req.body.lastName1,
    lastName2: req.body.lastName2,
    idNumber: req.body.idNumber,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email
  };
  Account.findOne({
    where: {
      email: req.body.email
    }
  }).then(newProfessor => {
    if (!newProfessor) {
      mysqlConnection.sequelize.query(
        "CALL `INSERT_REGISTER_PROFESSOR`(:p0, :p1, :p2, :p3, :p4, :p5, :p6, :p7, :p8)",
        {
          replacements: {
            p0: professorData.idNumber,
            p1: professorData.firstName,
            p2: professorData.secondName,
            p3: professorData.lastName1,
            p4: professorData.lastName2,
            p5: professorData.birthDate,
            p6: professorData.phone,
            p7: professorData.address,
            p8: professorData.email
          }
        }
      );
    } else {
      res.json({ error: "User already exists" });
    }
  });
});

//Register Secretary
router.post("/registerSecretary", (req, res) => {
  const secretaryData = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    lastName1: req.body.lastName1,
    lastName2: req.body.lastName2,
    idNumber: req.body.idNumber,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email
  };
  Account.findOne({
    where: {
      email: req.body.email
    }
  }).then(newSecretary => {
    if (!newSecretary) {
      mysqlConnection.sequelize.query(
        "CALL `INSERT_REGISTER_SECRETARY`(:p0, :p1, :p2, :p3, :p4, :p5, :p6, :p7, :p8)",
        {
          replacements: {
            p0: secretaryData.idNumber,
            p1: secretaryData.firstName,
            p2: secretaryData.secondName,
            p3: secretaryData.lastName1,
            p4: secretaryData.lastName2,
            p5: secretaryData.birthDate,
            p6: secretaryData.phone,
            p7: secretaryData.address,
            p8: secretaryData.email
          }
        }
      );
    } else {
      res.json({ error: "User already exists" });
    }
  });
});

//Register Student
router.post("/registerStudent", (req, res) => {
  const studentData = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    lastName1: req.body.lastName1,
    lastName2: req.body.lastName2,
    idNumber: req.body.idNumber,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    guardianName: req.body.guardianName,
    guardianID: req.body.guardianID,
    emergencyPhone: req.body.emergencyPhone,
    email: req.body.email
  };
  Account.findOne({
    where: {
      email: req.body.email
    }
  }).then(newSecretary => {
    if (!newSecretary) {
      mysqlConnection.sequelize.query(
        "CALL `INSERT_REGISTER_STUDENT`(:p0, :p1, :p2, :p3, :p4, :p5, :p6, :p7, :p8, :p9, :p10, :p11)",
        {
          replacements: {
            p0: studentData.idNumber,
            p1: studentData.firstName,
            p2: studentData.secondName,
            p3: studentData.lastName1,
            p4: studentData.lastName2,
            p5: studentData.birthDate,
            p6: studentData.phone,
            p7: studentData.address,
            p8: studentData.guardianName,
            p9: studentData.guardianID,
            p10: studentData.emergencyPhone,
            p11: studentData.email
          }
        }
      );
      res.json({ success: "Student Registered" });
    } else {
      res.json({ error: "User already exists" });
    }
  });
});

//LOGIN
router.post("/login", (req, res) => {
  Account.findOne({
    where: {
      email: req.body.email,
      account_type: req.body.account_type,
      status: "ACTIVE"
    }
  })
    .then(account => {
      if (account) {
        //bcrypt.compareSync(req.body.password, account.password
        if (req.body.password == account.password) {
          let token = jwt.sign(account.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440 //SEGUNDOS
          });
          res.send(token);
        } else {
          res.status(400).json({ error: "INVALID PASSWORD" });
        }
      } else {
        res.status(400).json({ error: "Account does not exist" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

//Get  account
router.get("/verifyAccount/:email", (req, res) => {
  Account.find({
    where: {
      status: "ACTIVE",
      email: req.params.email,
      account_type: ["SECRETARY", "PROFESSOR", "STUDENT", "ADMIN"]
    }
  }).then(function (account) {
    if (account) {
      res.send(account);
    } else {
      console.log(res.err);
    }
  });
});


router.get("/verifyAllAccount/:email", (req, res) => {
  Account.find({
    where: {
      email: req.params.email,
      account_type: ["SECRETARY", "PROFESSOR", "STUDENT", "ADMIN"]
    }
  }).then(function (account) {
    if (account) {
      res.send(account);
    } else {
      console.log(res.err);
    }
  });
});


router.get("/accountData/:id", (req, res) => {
  Account.find({
    where: {
      id_person: req.params.id,
    }
  }).then(function (account) {
    if (account) {
      res.send(account);
    } else {
      console.log(res.err);
    }
  });
});


//Get Account type
router.get("/getAccountType/:email", (req, res) => {
  mysqlConnection.sequelize
    .query("CALL SELECT_ACCOUNT_TYPE(:p0)", {
      replacements: {
        p0: req.params.email
      }
    })
    .then(function(data) {
      if (data) {
        res.send(data);
      }
    });
});

//Get Person Data
router.get("/getPersonData/:id", (req, res) => {
  Person.findOne({
    where: {
      id_person: req.params.id
    }
  }).then(function (person) {
    if (person) {
      res.send(person);
    } else {
      console.log(res.err);
    }
  });
});

//Disable Account Admin
router.put("/disableAccount/:email", (req, res) => {
  Account.update(
    { status: "INACTIVE" },
    { where: { email: req.params.email } }
  );
});


router.put("/enableAccount/:email", (req, res) => {
  Account.update(
    { status: "ACTIVE" },
    { where: { email: req.params.email } }
  );
});

//Get  Classes
router.get("/getClasses", (req, res) => {
  Class.findAll().then(function (classes) {
    if (classes) {
      res.send(classes);
    } else {
      console.log(res.err);
    }
  });
});

//Get Students from group and course
router.get("/getStudentsFromGroupAndCourse/:group/:course", (req, res) => {
  const enrollment = {
    group: req.params.group,
    course: req.params.course
  };
  mysqlConnection.sequelize
    .query("CALL `SELECT_GET_GROUP_STUDENTS`(:p0, :p1)", {
      replacements: {
        p0: enrollment.group,
        p1: enrollment.course
      }
    })
    .then(function (students) {
      if (students) {
        res.send(students);
      } else {
        console.log(res.err);
      }
    });
});

router.get("/getStudentsFromCourse/:course", (req, res) => {
  mysqlConnection.sequelize
    .query("CALL `SELECT_STUDENTS_FROM_COURSE`(:p0)", {
      replacements: {
        p0: req.params.course,
      }
    })
    .then(function (students) {
      if (students) {
        res.send(students);
      } else {
        console.log(res.err);
      }
    });
});



//enrollment
router.post("/matricular", (req, res) => {
  Enrollment.create({
    ST_GROUP_NUMBER: req.body.numberCurse,
    COURSE_NAME: req.body.curseName,
    STU_ID_ACCOUNT: req.body.id_person,
    STU_ID_PERSON: req.body.id_person
  });

  if (req.body.accountType == "ADMIN") {
    Enrollment_Report.create({
      STU_ID_ACCOUNT: req.body.id_person,
      STU_ID_PERSON: req.body.id_person,
      ADM_ID_ACCOUNT: req.body.id_accountUser,
      ADM_ID_PERSON: req.body.id_personUser,
      START_DATE: req.body.startDate,
      END_DATE: req.body.endDate,
      NUMBER_WEEKS: req.body.number_weeks,
      COURSE_NAME:req.body.curseName
    });
    res.send("Mensaje");
  }
  if (req.body.accountType == "SECRETARY") {
    Enrollment_Report.create({
      STU_ID_ACCOUNT: req.body.id_person,
      STU_ID_PERSON: req.body.id_person,
      SEC_ID_ACCOUNT: req.body.id_accountUser,
      SEC_ID_PERSON: req.body.id_personUser,
      START_DATE: req.body.startDate,
      END_DATE: req.body.endDate,
      NUMBER_WEEKS: req.body.number_weeks,
      COURSE_NAME:req.body.curseName
    });
    res.send("Mensaje");
  }
});

//enrollment report
router.get("/inform/:id", (req, res) => {
  mysqlConnection.sequelize
    .query("CALL SELECT_ENROLLMENT(:p0)", {
      replacements: {
        p0: req.params.id
      }
    })
    .then(function (inform) {
      if (inform) {
        res.send(inform);
      }
    });
});


router.get("/Uniqueinform/:id/:courseName", (req, res) => {
  mysqlConnection.sequelize
    .query("CALL SELECT_UNIQUE_ENROLLMENT(:p0, :p1)", {
      replacements: {
        p0: req.params.id,
        p1: req.params.courseName
      }
    })
    .then(function (inform) {
      if (inform) {
        res.send(inform);
      }
    });
});


router.get("/showEnrollmentFromStudent/:id", (req, res) => {
  Enrollment.findAll(
    {
      where: {
        STU_ID_ACCOUNT: req.params.id
      }
    }
  ).then(function (enrollments) {
    if (enrollments) {
      res.send(enrollments);
    } else {
      console.log(res.err);
    }
  });
});



router.get("/deleteInform/:id/:courseName/:reservationNumber", (req, res) => {
  mysqlConnection.sequelize
    .query("CALL `DELETE_FULL_ENROLLMENT`(:p0, :p1, :p2)", {
      replacements: {
        p0: req.params.id,
        p1: req.params.courseName,
        p2: req.params.reservationNumber,
      }
    })
});


router.put("/editInform/:groupNumber/:startDate/:endDate/:numberWeeks/:reservationNumber/:courseName/:id_person", (req, res) => {
  Enrollment.update(
    {ST_GROUP_NUMBER: req.params.groupNumber},
    { where: { STU_ID_PERSON: req.params.id_person,
         COURSE_NAME: req.params.courseName}}
  )

  Enrollment_Report.update(
    {START_DATE: req.params.startDate,
      END_DATE: req.params.endDate,
      NUMBER_WEEKS: req.params.numberWeeks
    },
    { where: { RESERVATION_NUMBER: req.params.reservationNumber}}
  )
});

module.exports = router;
