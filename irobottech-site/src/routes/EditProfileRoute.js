const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const Person = require("../models/Person");
const Address = require("../models/Address");
const Phone_number = require("../models/Phone_number");
const Account = require("../models/Account");
router.use(cors());

router.put("/editFull", (req, res) => {
  var person = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    lastName1: req.body.lastName1,
    lastName2: req.body.lastName2,
    idNumber: req.body.idNumber,
    birthDate: req.body.birthDate,
    phone: req.body.phone,
    address: req.body.address,
    id_person: req.body.id_person,
  };
  Person.update(
    {first_name: person.firstName, 
    second_name: person.secondName, 
    last_name_1: person.lastName1,
    last_name_2: person.lastName2,
    identification : person.idNumber},
    { where: {id_person: person.id_person}}   
  )
  Address.update(
    {full_address: person.address},
    { where: {id_person: person.id_person}}   
  )
  Phone_number.update(
    {phone_number: person.phone},
    { where: {id_person: person.id_person}}   
  )
});

router.put("/editPass", (req, res) => {
  var person = {
    pass: req.body.newPass,
    id_person: req.body.id_person,
  };
  Account.update(
    {password: person.pass},
    { where: {id_person: person.id_person}}   
  )
});


router.post('/edit', function (req, res, next) {
  let firstName = "";
  let secondName = "";
  let lastName1 = "";
  let lastName2 = "";
  let identification = "";
  let birthDate = "";
  let address = "";
  let phone = "";
  Person.findOne({ where: { ID_PERSON: req.body.id_person } }).then(token => {
    console.log("Estoy buscando la persona " + req.body.id_person )
    
    if (token){
      firstName = token.first_name;
      secondName = token.second_name;
      lastName1 = token.last_name_1;
      lastName2 = token.last_name_2;
      birthDate = token.birth_Date
      identification = token.identification
      Address.findOne({ where: { ID_PERSON: req.body.id_person } }).then(myAddress => {
        if (myAddress){
          address = myAddress.full_address;
          Phone_number.findOne({ where: { ID_PERSON: req.body.id_person } }).then(myPhone => {
            if (myPhone){
              phone = myPhone.phone_number;
              res.send([{
                FirstNameJs: '' + firstName,
                SecondNameJs: '' + secondName,
                lastName1Js: '' + lastName1,
                lastName2Js: '' + lastName2,
                birthDateJs: '' + birthDate,
                identificationJs: '' + identification,
                addressJs: '' + address,
                phoneJs: '' + phone
              }]);
            }})
        }})
    }})
  });


module.exports = router;