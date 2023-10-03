const {LocalStorage} = require("node-localstorage");
const localStorage = new LocalStorage('./localStorage');
const fs = require('fs');
const {countDB} = require('../apiNedb/crudDb.js');
const {diskSize,diskClear} = require("../utilidades/disco.js")

function readNumNota(req, resp){
  let numNota = localStorage.getItem('numNota')
  resp.send(numNota)
};
function writeNumNota(req, resp){
  let numNota = req.body["numNota"]
  localStorage.setItem('numNota', parseInt(numNota))
  resp.send("write")
};
const readFile = (path) =>
new Promise((resolve, reject) => {
  fs.stat("./data/"+path, (error, stats) => {
    if(error){ console.log(error); }
    else { resolve(stats.size) }
  });
})

async function sizeDB(req,rsp){
  let cInv = await countDB("inventarios")
  let cUse = await countDB("usuarios") 
  let cVen = await countDB("ventas")  
  let cCli = await countDB("clientes")  
  let inv = await readFile("inventarios.dat")
  let use = await readFile("usuarios.dat")
  let ven = await readFile("ventas.dat")
  let cli = await readFile("clientes.dat")
  rsp.send({inv,use,ven,cli,cInv,cUse,cVen,cCli})
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
  readNumNota,
  writeNumNota,
  sizeDisk,
  clearDisk
}