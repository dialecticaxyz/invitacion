const {LocalStorage} = require("node-localstorage");
const localStorage = new LocalStorage('./localStorage');

let clients = new Array;
function handleWs(ws, request) {
  console.log("New Connection"); 
  clients.push(ws);
  
  function close(){
    var position = clients.indexOf(ws);
    clients.splice(position, 1);
    console.log("connection closed");
  } 

  function message(d){
    let data = JSON.parse(d); //console.log(data);

    let tx = localStorage.getItem('msgInv')
    if(data.rut=="readMsgInv"){ ws.send(JSON.stringify({"rut":"readMsgInv","dat":tx})); return;}

    if(data.rut=="writeMsgInv"){
      for (let c in clients) {// brocast
        if(!(clients[c]==ws)){ clients[c].send(JSON.stringify({"rut":"readMsgInv","dat":data.dat})) }
      }
      localStorage.setItem('msgInv',data.dat)
    }
    
  }

  ws.on('message', message);
  ws.on('close', close);
}
module.exports = {
  handleWs
}