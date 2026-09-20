const $=s=>document.querySelector(s);
const enter=$("#enterBtn"), machine=$("#machine");
enter.addEventListener("click",()=>{machine.classList.remove("hidden");machine.scrollIntoView({behavior:"smooth"});});

function bindRange(id,val){const r=$("#"+id),v=$("#"+val);r.addEventListener("input",()=>v.textContent=r.value+"%")}
bindRange("radioVol","radioVal");bindRange("natureVol","natureVal");bindRange("rainVol","rainVal");

function toggle(btn){
  btn.classList.toggle("on");
  const sp=btn.querySelector("span");
  if(sp) sp.textContent=btn.classList.contains("on")?"ON":"OFF";
}
$("#radioBtn").onclick=()=>toggle($("#radioBtn"));
$("#natureSwitch").onclick=()=>toggle($("#natureSwitch"));
$("#rainSwitch").onclick=()=>toggle($("#rainSwitch"));
$("#headsetSwitch").onclick=()=>toggle($("#headsetSwitch"));
$("#rainBtn").onclick=()=>{toggle($("#rainSwitch")); machine.classList.remove("hidden"); machine.scrollIntoView({behavior:"smooth"});};

const nature=$("#natureBtn");
nature.onclick=()=>toggle($("#natureSwitch"));

document.querySelectorAll(".program-grid button").forEach((b)=>{
  b.addEventListener("click",()=>{
    const title=b.parentElement.querySelector("b").textContent;
    $("#programName").textContent=title.replace(/^[^ ]+ /,"");
    $("#timeSlot").textContent="ON AIR";
  });
});
