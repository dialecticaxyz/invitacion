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
    let mesa = localStorage.getItem('msgInvMesa')
    if(data.rut=="readMsgInv"){ ws.send(JSON.stringify({"rut":"readMsgInv","dat":tx,"mesa":mesa})); return;}

    if(data.rut=="writeMsgInv"){
      for (let c in clients) {// brocast
        if(!(clients[c]==ws)){ clients[c].send(JSON.stringify({"rut":"readMsgInv","dat":data.dat,"mesa":data.mesa})) }
      }
      localStorage.setItem('msgInv',data.dat)
      localStorage.setItem('msgInvMesa',data.mesa)
    }
    
  }

  ws.on('message', message);
  ws.on('close', close);
}
module.exports = {
  handleWs
}