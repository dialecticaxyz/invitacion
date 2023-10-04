const fs = require('fs');
const {countDB} = require('../apiNedb/crudDb.js');
const {diskSize,diskClear} = require("../utilidades/disco.js")

const readFile = (path) =>
new Promise((resolve, reject) => {
  fs.stat("./data/"+path, (error, stats) => {
    if(error){ console.log(error) }else{ resolve(stats.size) }
  });
})

async function sizeDB(req,rsp){
  let cInv = await countDB("invitados")
  let cUse = await countDB("usuarios") 
  let inv = await readFile("invitados.dat")
  let use = await readFile("usuarios.dat")
  rsp.send({inv,use,cInv,cUse})
}
async function sizeDisk(req, resp){
  let disk = await diskSize()
  resp.send(disk)
};
async function clearDisk(req,resp){
  await diskClear()
  resp.send({msg:"success"})
};
module.exports = {
  sizeDB,
  sizeDisk,
  clearDisk
}