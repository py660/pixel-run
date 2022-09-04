let seconds = 0;
let able = 1;
let record = 1000;

let winsound = new Audio('/GameSounds/Complete.wav');

document.getElementById('reset').addEventListener("click", reset);
//document.getElementById('forcereset').addEventListener("click", reset);

var dataGotFromFiles = localStorage.getItem('recordedBest');

if (dataGotFromFiles != null) {
  document.getElementById('best').innerHTML = '<i class="fas fa-trophy" style="color: yellow;"></i> ' + dataGotFromFiles;

  record = Number(dataGotFromFiles);
}
else {
  document.getElementById('best').innerHTML = '<i class="fas fa-trophy" style="color: yellow;"></i> ' + 'N/A';
}

start();

function time() {
  if (able != 1) {
    return;
  }
//console.log(seconds);
seconds = seconds * 100 + 1;
seconds = seconds/100;
//console.log("after", seconds)
seconds = Math.round(seconds*100)/100
secondstr = seconds.toFixed(2);
document.getElementById('time').innerHTML = '<i class="fas fa-stopwatch-20" style="color: #0066ff ;"></i> ' + secondstr;

let coins = document.getElementById('collected').innerHTML;


if (coins == 33) {// 33
  if (able == 1) {
    able++;
    finish(seconds);
  
    if (record > seconds) {
      record = seconds;
      document.getElementById('best').innerHTML = '<i class="fas fa-trophy" style="color: yellow;"></i> ' + record;

      localStorage.setItem('recordedBest', record);
    }
  }
}

}

var update = setInterval(time, 10);

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

eventFire(document.getElementById("reset"), "click");

function finish(secs) {
  document.getElementById("reset").className = "reset";
  var deaths = document.getElementById('deathcount').innerHTML;
  let seconds = document.getElementById('time').innerHTML;

   document.getElementById("text").innerHTML = '<div class="thick"><i class="fas fa-trophy" style="color: yellow;"></i> You Win <i class="fas fa-trophy" style="color: yellow;"></i></div>' + '<br><br>' + '<i class="far fa-clock" style="color: #0066ff ;"></i> Time: ' + secs + ' seconds' + '<br><br> ' + '<i class="fas fa-skull-crossbones" style="color: red;"></i> Deaths: ' + deaths + '<br><br>' + '<i class="far fa-question-circle" style="color: #F229DE;" ></i> Can you get better next time??';
openModal();
   winsound.play();
}
//finish(100);
function reset() {
  document.getElementById("reset").innerHTML = "Play again?";
        document.getElementById("reset").className = "hidden";
    //seconds = -1;
    seconds = -0.01;
    able = 1;
}

function start() {
  able = 2;
  seconds = 0;
    document.getElementById("reset").className = "reset";
    document.getElementById("reset").innerHTML = 'Start'
  var deaths = document.getElementById('deathcount').innerHTML;
   }





