let clients = new Array;
function handleWs(ws, request) {
  console.log("New Connection");        
  clients.push(ws);
  function endClient(){
    var position = clients.indexOf(ws);
    clients.splice(position, 1);
    console.log("connection closed");
  } 
  function clientResponse(data){
    for (let c in clients) { //brocast
      if(!(clients[c]==ws)){
        clients[c].send(data);
      }
    }
  }
  ws.on('message', clientResponse);
  ws.on('close', endClient);
}
module.exports = {
    handleWs
}