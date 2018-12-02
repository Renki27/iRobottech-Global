const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connectionDataBase/databaseConnection");
var generator = require('generate-password');
var nodemailer = require('nodemailer');
const Account = require("../models/Account");
const cors = require("cors");
router.use(cors());

var password = generator.generate({
  length: 10,
  numbers: true
});


router.put("/recover", (req, res) => {
    Account.update(
      {password: password},
      { where: {email: req.body.email}}
      
    )
      .then(account => {
        if (account) {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'centralirobottech@gmail.com',
              pass: 'occidente'
            }
          });
          
          var mailOptions = {
            from: 'centralirobottech@gmail.com',
            to: req.body.email,
            subject: 'Cambio de contraseña',
            text:'Se realizo la recuperacion de su cuenta, su nueva contraseña para acceder al sitio de Irobottech es: ' + password + '\nSe recomienda cambiar su contraseña apenas inicie sesion '
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });
        } else {
          res.status(400).json({ error: "Account does not exist" });
        }
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  });


  router.post("/message", (req, res) => {  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'centralirobottech@gmail.com',
        pass: 'occidente'
      }
    });
    
    var mailOptions = {
      from: 'centralirobottech@gmail.com',
      to: 'centralirobottech@gmail.com',
      subject: req.body.asunto,
      text:"El usuario: " + req.body.nombre + "\nCorreo: " + req.body.correo +  "\nSolicita un cambio de clase por este motivo:\n" +req.body.mensaje
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  
});
module.exports = router;