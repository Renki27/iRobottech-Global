const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connectionDataBase/databaseConnection");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const Account = require("../models/Account");
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

module.exports = router;
