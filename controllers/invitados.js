const {createdDB,readUserDB,countDB} = require('../apiNedb/crudDb.js');



async function createdInvitado(req,rsp){
  req.body["idCrip"] = ""
  await createdDB(req.body,"invitados")
  rsp.send({msg:"success"})
};


module.exports = {
  createdInvitado,
}
