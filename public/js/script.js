function lnk(e){ var a = document.createElement("a"); a.href = e+".html"; a.click() }
/*pantalla spiner succses contador*/
const divLoad = document.createElement("div");
divLoad.innerHTML = `
<div id="pantallaSpiner">
<div class="modalSpiner">
  <div id="spinner" class="lds-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="conter">
    <div id="conter">.</div>
  </div>  
  <div id="cajaSuccess">
    <div class="circle">
      <div id="checkSucc" class=""></div>
    </div>
  </div> 
</div>
</div>           
` 
function loadData(){
  document.body.appendChild(divLoad);
  document.getElementById("pantallaSpiner").style.display = "inline-block"
  document.getElementById("spinner").style.display = "block"
} 
function successDat(r,l){
  document.getElementById("spinner").style.display = "none"
  document.getElementById("cajaSuccess").style.display= 'block';
  document.getElementById("checkSucc").classList.add('success');
  setTimeout(noSucsesDat,1000);
  if(l!=undefined){ localStorage.setItem(limp,"") } 
  if(r=="r"){ setTimeout(window.location.reload(),2500) } 
  if(r=="b"){ setTimeout(window.history.back(),3000) }
}
function noSucsesDat(){
  document.getElementById("pantallaSpiner").style.display = "none"
  document.getElementById("cajaSuccess").classList.add('desapareser');
  setTimeout(restarSucessesDat,750); 
}
function restarSucessesDat(){
  document.getElementById("cajaSuccess").style.display= 'none';
  document.getElementById("cajaSuccess").classList.remove('desapareser');
  document.getElementById("checkSucc").classList.remove('success');
}
/*pantalla spiner succses contador*/