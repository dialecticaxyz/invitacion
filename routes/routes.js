const {readIdDB} = require('../apiNedb/crudDb.js');
var express = require('express');
var router = express.Router();
const midFun = require("../middleware/middleware")
const crudFun = require("../controllers/crud");
const logFun = require('../controllers/login');
const useFun = require("../controllers/usuarios");
const useInv = require("../controllers/invitados");
const admFun = require('../controllers/datSistem');

router.get('/:token',[],(req, res)=>{
  const id = req.params.token;
  readIdDB(id,"invitados").then((dat)=>{
    if(dat[0]!=undefined){
      res.render('index',{"id":dat[0].id,"nom":dat[0].nom})
    }
  })
})

router.post("/created",[],crudFun.created);
router.post("/readAll",[],crudFun.readAll);
router.post('/readTime',[],crudFun.readTime);
router.post('/readTimeUser',midFun.verifyLog,crudFun.readTimeUser);
router.post('/readTimeTime',midFun.verifyLog,crudFun.readTimeTime);
router.post('/readTimeTimeUser',midFun.verifyLog,crudFun.readTimeTimeUser);
router.post("/readId",midFun.verifyLog,crudFun.readId);
router.post('/readUser',midFun.verifyLog,crudFun.readUser);
router.post('/update',midFun.verifyLog,crudFun.update);
router.post('/delet',midFun.verifyLog,crudFun.delet);
router.post("/readIds",midFun.verifyLog,crudFun.readIds);
router.post("/count",midFun.verifyLog,crudFun.count);

module.exports = router;