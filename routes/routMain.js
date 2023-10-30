const {readIdDB} = require('../apiNedb/crudDb.js');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

async function routMain(req,rsp){
  let ruta = path.join(__dirname,'../public/indexM.html')
  let q = req.query.q
  fs.readFile(ruta, (err, data) => {
    const $ = cheerio.load(data);
    readIdDB(q,"invitados").then((dat)=>{
      if(dat[0]!=undefined){
        $('#datos').attr('data-id',q);
        $('#datos').attr('data-nom',dat[0].nom);
      }else{
        $('#conf').html('<div class="conf"><a class="btnConfg" href="/login/login.html"><span class="iconUSECONFG"></span></a></div>');
      }
      rsp.setHeader("Content-Type","text/html");
      rsp.writeHead(200);
      rsp.end($.root().html());
    })
  });
};

function onServer(req,rsp){
  rsp.send({msg:"active"})
};

module.exports = {
  routMain,
  onServer
}