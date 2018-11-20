const express = require("express");
const router = express.Router();

const mysqlConnection = require("../connectionDataBase/databaseConnection");
// GET all Professors Acc
router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM PROFESSOR", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// INSERT A Professor
router.post("/", (req, res) => {
  var person = {
    idNumber: req.body.idNumber,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    lastName1: req.body.lastName1,
    lastName2: req.body.lastName2,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email
  };
  const sql =
    "SET @p0= ?; SET @p1= ?; SET @p2= ?; SET @p3= ?; SET @p4= ?; SET @p5= ?; SET @p6= ?; SET @p7= ?; SET @p8= ?; CALL `INSERT_REGISTER_PROFESSOR`(@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8);";

  mysqlConnection.query(
    sql,
    [
      person.idNumber,
      person.firstName,
      person.secondName,
      person.lastName1,
      person.lastName2,
      person.birthDate,
      person.phone,
      person.address,
      person.email
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Professor Registered" });
      } else {
        console.log(err);
        console.log(rows);
        console.log(fields);
      }
    }
  );
});

module.exports = router;