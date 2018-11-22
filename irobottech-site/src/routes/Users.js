const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connectionDataBase/databaseConnection");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
const Account = require("../models/Account");
router.use(cors());

process.env.SECRET_KEY = "secret";
router.post("/login", (req, res) => {

  Account.findOne({
    where: {
      email: req.body.email,
      account_type: req.body.account_type,
      status: 'ACTIVE'
    }
  })
    .then(account => {
      if (account) {
        //bcrypt.compareSync(req.body.password, account.password
        if ((req.body.password == account.password)) {
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
