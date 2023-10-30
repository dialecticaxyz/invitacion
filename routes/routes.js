var express = require('express');
var router = express.Router();
const midFun = require("../middleware/middleware")
const crudFun = require("../controllers/crud");
const logFun = require('../controllers/login');
const useFun = require("../controllers/usuarios");
const admFun = require('../controllers/datSistem');

const {routMain,onServer} = require('../routes/routMain.js');

router.get('/',[],routMain)
router.get('/onServer',[],onServer)

router.post("/created",[],crudFun.created);
router.post("/readAll",[],crudFun.readAll);
router.post('/readTime',[],crudFun.readTime);
router.post('/readTimeTime',midFun.verifyLog,crudFun.readTimeTime);
router.post("/readId",[],crudFun.readId);
router.post('/update',[],crudFun.update);
router.post('/delet',[],crudFun.delet);
router.post("/readIds",[],crudFun.readIds);
router.post("/count",[],crudFun.count);

router.post('/login',[],logFun.login);
router.post('/updatePassword',[],logFun.updatePassword);

router.post("/createdAdminInit",[],useFun.createdAdminInit);
router.post("/createdUse",[],useFun.createdUse);

router.post("/sizeDB",[], admFun.sizeDB);
router.post("/sizeDisk",[], admFun.sizeDisk);
router.post("/clearDisk",[], admFun.clearDisk);

module.exports = router;