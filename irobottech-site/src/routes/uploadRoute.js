const account = require("../models/Account");
const express = require("express");
const router = express.Router();
const path = require("path");
var fs = require('fs');
var util = require('util');
 var multer = require('multer')({
   dest: path.join(__dirname, "../../dist/uploads")
 });


router.get('/', function (req, res, next) {
  res.render(path.join(__dirname, "../views/uploadForm.ejs"))
})//cambiar por componente de form solicitud

router.get('/success', function (req, res, next) {
  var {fileName} = req.query
//  <Redirect to="/login" />
 //res.render(path.join(__dirname, "../views/uploadOK.ejs"), {fileName})
})//para devolver la vista de respuesta agregado

router.post('/', [multer.single('attachment')], function (req, res, next) {
  
  return storeWithOriginalName(req.file, req.body.id_persona)
    .then(encodeURIComponent)
    .then(encoded => {

    res.redirect(`/upload/success?fileName=${encoded}`)
    })
    .catch(next)
})

function storeWithOriginalName (file, nombre) {
  var fullNewPath = path.join(file.destination, file.originalname)
  var rename = util.promisify(fs.rename)

  return rename(file.path, fullNewPath)
    .then(() => {
      account.update(
        {path: file.originalname
      },
        { where: {id_person: nombre}}   
      )
      return file.originalname
     
    })
}
    

module.exports = router