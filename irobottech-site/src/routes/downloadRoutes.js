const express = require("express");
const router = express.Router();
const path = require('path');


router.get('/:id',function(req,res){

res.download(path.join(__dirname, '../../public/'+ req.params.id),
req.params.id,function(err){
if(err){
console.log(err);

}else{
    console.log('Listo');
}

});
});

module.exports = router;