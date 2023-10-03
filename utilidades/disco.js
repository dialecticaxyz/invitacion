const { exec } = require('child_process');
const maxSize = 150 //MB
const limit = maxSize*1024*1024 ////bytes
function diskSize(){
  return new Promise((resolve,reject)=>{
    exec('du -s', (error, stdout, stderr) => {
      if(error){console.error(`error: ${error.message}`);reject();return; }
      if (stderr) { console.error(`stderr: ${stderr}`);reject();return;  }
      console.log(stdout);
      let disk = parseInt((stdout).match(/(\d+)/)[0])*1024 //bytes
      let alerta
      if(disk>limit){alerta=true}else{alerta=false}
      resolve({"disk":disk,"limit":limit,"alerta":alerta})
    });
  })
}

function diskClear(){
  return new Promise((resolve,reject)=>{
    exec('rm -rf .git', (error, stdout, stderr) => {
      if(error){console.error(`error: ${error.message}`);reject();return; }
      if (stderr) { console.error(`stderr: ${stderr}`);reject();return;   }
      console.log(stdout);
      resolve()
    });
  })
}
module.exports = {
  diskSize,
  diskClear
}
