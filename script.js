// alert("Welcome to Pixel Run!");
v = "--";
$.get("/update", function(data){
    v = data;
    // alert("This is version: " + v);
    setInterval(function(){
        $.get("/update", function(data){
            if (data != v){
                document.getElementById("update").style.opacity = "100%";
            }
        });
    }, 20000); // Every 20 seconds
});
// alert("Also try Text Adventure! https://bit.ly/text660");

const ctx = document.getElementById('canvas');
const c = ctx.getContext('2d');

let velocity = 0;
let velX = 0;
let timer = 0;
let deaths = 0;
let timer2 = 0;

let scrollX = 0;
let scrollY = 0;

window.respawnX = 0;
window.respawnY = 0;

let coinCollect = new Audio('/GameSounds/coinCollected.mp3');
let setSpawn = new Audio("/GameSounds/setSpawn.mp3");
let jump = new Audio('/GameSounds/jump.wav');
let music = new Audio('/GameSounds/backing.mp3');
let click = new Audio('/GameSounds/Start.wav');
let deathsound = new Audio('/GameSounds/restart.wav');
let bouncesound = new Audio('/GameSounds/bounce.wav');

document.getElementById('reset').addEventListener("click", reset);
//document.getElementById('forcereset').addEventListener("click", reset);

  //x: 1400,
  //y: -300,
var player = {
  //x: 1400,
  //y: -300,
  color: "white",
  x: 50,
  y: 300,
  nh: 15,
  nw: 15,
  height: 21,
  width: 21,
  speed: 2,
  jumping: true
},



keys = [];

document.getElementById("color").addEventListener("input", function(ev){
    player.color = this.value;
    document.getElementById("colorlabel").style.border = "2px solid " + this.value;
});
document.getElementById("bgcolor").addEventListener("input", function(ev){
    ctx.style.background = this.value;
    document.getElementById("bgcolorlabel").style.border = "2px solid " + this.value;
    
})
// ARRAY OF RESPAWN POINT INDICES (24 means the 25th group in the coins array)
var respawn_i = [24, 25];


//GROUPS OF 4, (X, Y, W, H)
const platforms = [
                0, 850, 10000, 10000,
                  0, 310, 80, 700,
                  80, 400, 200, 20, 
                  380, 240, 100, 10, 
                  260, 400, 20, 500, 
                  400, 520, 20, 500, 
                  360, 510, 200, 10, 
                  410, 680, 180, 10, 
                  580, 680, 10, 300, 
                  550, 400, 100, 10, 
                  740, 680, 80, 200, 
                  940, 640, 80, 250, 
                  1140, 600, 80, 300, 
                  1380, 500, 200, 10, 
                  1400, 505, 10, 400, 
                  1550, 505, 10, 400, 
                  1750, 400, 70, 10, 
                  1600, 300, 70, 10, 
                  1750, 200, 70, 10, 
                  1600, 100, 70, 10, 
                  1750, 0, 70, 10, 
                  1600, -100, 70, 10,
                  1300, -150, 200, 10,

                   1200, -350, 10, 200, 
                   1200, 400, 100, 10,
                   1300, -90, 10, 500,

                   1000, 300, 100, 10, 
                   800, 200, 100, 10,
                   1000, 100, 100, 10,
                   800, 0, 100, 10,
                   1000, -100, 100, 10, 
                   800, -500, 100, 10
];

//GROUPS OF 6, (START_X, START_Y, W, H, END_X, END_Y)
const moving = [500, -100, 100, 10, 880, -100, 
               420, -100, 50, 10, 700, -500];


//GROUPS OF 2, (CURR_X, CURR_Y)
const movingpos = [500, -100, 450, -100];


//DECIMAL < 1 DEFINES POSITION OF PLATFORM RELATIVE TO START AND END COORDS
const movingtick = [0, 0];

const movingdir = [1, 1];

//GROUPS OF 4, DEFINES THE GROUND. (START_X, START_Y, END_X, END_Y), RELATIVE TO THE TOP LEFT
const lava = [0, 700, 10000, 10000, 0, 730, 10000, 10000, 0, 760, 10000, 10000];

//GROUPS OF 4, (X, Y, X_LENGTH, JUMP_HEIGHT)
const bounce = [250, 388, 20, 7, 570, 667, 20, 7];

//GROUPS OF 2, (X, Y)
var coins = [400, 200, 420, 200, 440, 200, 450, 620, 470, 620, 490, 620, 420, 480, 500, 480, 800, 650, 780, 650, 760, 650, 990, 610, 970, 610, 950, 610, 1200, 570, 1180, 570, 1160, 570, 1400, 460, 1470, 460, 1540, 460, 1330, -190, 1400, -190, 1470, -190];
//REMEMBER TO CHANGE LINE 21 IF STATEMENT NUMBER (DEFAULT 23) IN timer.js TO THE NUMBER OF REQUIRED COINS
coins.push(520);
coins.push(620);

coins.push(1240);
coins.push(350);

//coins += [1050, 280, 850, 180, 1050, -20, 850, -120];

coins.push(1050, 270, 850, 170, 1050, 70, 850, -30, 1050, -130);

coins.push(900, -130, 600, -130);
coins.push(850, -540);

//GROUPS OF 4, (???, X, Y)
const enemies = [62, 595, 380, 31, 455, 490, 31, 1473, 480, 
                62, 1048, -120];

//GROUPS OF 7, (X, Y, W, H, TARGET_X, TARGET_Y, COLOR)
const teleport = [50, 250, 20, 20, 0, 0, "#ffffff"];

var collected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var backing = [700, 400, 450, 600, 500, 520, 410, 400, 700, 450, 450, 600, 650, 440, 650, 700, 540, 650, 605, 405, 400, 550, 520, 599, 678, 689, 399, 320, 540, 530, 520, 654, 546];


//SPEED OF BOUNCE PADS, DEFAULT 20
var bouncetick = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
var cointick = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 
               20, 20];

var particles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var bouncepart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var iter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var stars = [];
for(var i = 0; i <= 200; i += 2) {

  var x = Math.floor(Math.random() * 5000);
  var y = Math.floor(Math.random() * 500);
  var size = Math.floor(Math.random() * 10) + 1;

    stars.push(x);
    stars.push(y);
    stars.push(size);
}

  document.getElementById('maxcollected').innerHTML = '/ ' + (coins.length / 2);


function draw() {
  document.getElementById('deathcount').innerHTML = deaths;

c.globalAlpha = 1;

timer += 0.0005;
timer2 += 0.0005;

drawBacking();
drawTeleport();
drawBounce();
drawGround();
drawLava();
drawCoin();
drawEnemies();

drawMoving();


player.jumping = true;

velocity = velocity + 0.4;
player.y += velocity;

if (player.x >= 1800 - player.width) {
  player.x = 1800 - player.width;
  velX = 0;
}

if (player.x <= -20 + player.width) {
  player.x = -20 + player.width;
  velX = 0;
}

scroll();

detect();

input();

velX = velX * 0.7;
player.x += velX;

//setTimeout(function(){
    requestAnimationFrame(draw);
//}, 10)
}

document.getElementById("jump").ontouchstart = function(ev){keys[38] = true;ev.preventDefault()};
document.getElementById("jump").onmousedown = function(ev){keys[38] = true;ev.preventDefault()};
document.getElementById("jump").ontouchend = function(ev){keys[38] = false;ev.preventDefault()};
document.getElementById("jump").ontouchcancel = function(ev){keys[38] = false;ev.preventDefault()};
document.getElementById("jump").onmouseup = function(ev){keys[38] = false;ev.preventDefault()};

document.getElementById("left").ontouchstart = function(ev){keys[37] = true;ev.preventDefault()};
document.getElementById("left").onmousedown = function(ev){keys[37] = true;ev.preventDefault()};
document.getElementById("left").ontouchend = function(ev){keys[37] = false;ev.preventDefault()};
document.getElementById("left").ontouchcancel = function(ev){keys[37] = false;ev.preventDefault()};
document.getElementById("left").onmouseup = function(ev){keys[37] = false;ev.preventDefault()};

document.getElementById("right").ontouchstart = function(ev){keys[39] = true;ev.preventDefault()};
document.getElementById("right").onmousedown = function(ev){keys[39] = true;ev.preventDefault()};
document.getElementById("right").ontouchend = function(ev){keys[39] = false;ev.preventDefault()};
document.getElementById("right").ontouchcancel = function(ev){keys[39] = false;ev.preventDefault()};
document.getElementById("right").onmouseup = function(ev){keys[39] = false;ev.preventDefault()};

/*unction touchstart(ev){
    //var touchlist = ev.targetTouches;
    //for (let touch of touchlist) {
    //    console.log(touch.clientX, touch.clientY);
    //    if (!player.jumping){
    //        player.jumping = true;
    //        velocity = -10;
    //        jump.play();
    //    }
    //console.log(player.jumping);
    //if (!player.jumping){
    //    player.jumping = true;
    //    velocity = -10;
    //    jump.play();
    //}
    keys[38] = true;
}


function touchend(ev){
    //var untouchlist = ev.targetTouches;
    //for (let untouch of untouchlist) {
    //    console.log(touch.clientX, touch.clientY);
    //}
    keys[38] = false;
}
*/


    function input() {
      // check keys
      if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space      or W
        if (!player.jumping) {  // BAD: //player.jumping doesn't seem to work
          player.jumping = true;
          velocity = -10;
          jump.play();
        }
      }

      if (keys[39] || keys[68]) { // right arrow
          velX = velX + player.speed; 
      }
      if (keys[37] || keys[65]) {
        // left arrow
        velX = velX - player.speed; 
      }
      //if (keys[82]){
      //    reset();
      //}

return;





    }  // Closes input()

function detect() {

  let iterations = platforms.length / 4;

  for(var i = 0; i <= iterations; i++) {
    let item = i * 4;
    item -= 1;

    var playerSize = player.width / 2;
    var playerHeight = player.height;

          if (platforms[item - 3] - player.width - 5 + scrollX <= player.x && platforms[item - 3] + platforms[item - 1] + 5 + scrollX >= player.x) {
            if (platforms[item - 2] - playerHeight + scrollY <= player.y && platforms[item - 2] + platforms[item] + scrollY >= player.y) {
              if (player.y - 5 > platforms[item - 2] + scrollY) {
                while (platforms[item - 3] - player.width - 5 + scrollX <= player.x && platforms[item - 3] + platforms[item - 1] + 5 + scrollX >= player.x) {
                    // DOES NOT WORK: velX *= -1;// CUSTOM WALL REFLECT
                  if (velX < 0) {
                    player.x += 1;
                  } else {
                    player.x -= 1;
                  }
                }
                velX *= -1;
              }
            }
      }

  if (platforms[item - 2] - 5 + scrollY <= player.y && platforms[item - 2] + platforms[item] + 9 + scrollY >= player.y) {
    if (platforms[item - 3] - player.width - 5 + scrollX <= player.x && platforms[item - 3] + platforms[item - 1] + 5 + scrollX >= player.x) {

        player.y += velocity * -1;
        velocity = 0;
        //player.jumping = false;
    }
  }

    if (platforms[item - 2] - playerHeight + scrollY <= player.y && platforms[item - 2] + platforms[item] + scrollY >= player.y) {
      if (platforms[item - 3] - player.width + scrollX <= player.x && platforms[item - 3] + platforms[item - 1] + scrollX >= player.x) {
          player.y = platforms[item - 2] - playerHeight - 1 + scrollY;
          velocity = 0;
          player.jumping = false;
      }
    }
    
  }



// Moving platform
  iterations = moving.length / 6;

  for(var i = 1; i <= iterations; i++) {
    let item = i * 6;
    item -= 1;
    let pos_i = i * 2;
    pos_i -= 1;

    var playerSize = player.width / 2;
    var playerHeight = player.height;

      var x = movingpos[pos_i - 1];
      var y = movingpos[pos_i];
      var w = moving[item - 3];
      var h = moving[item - 2];
      //console.log(item, pos_i, i, x, y, w, h);

          if (x - player.width - 5 + scrollX <= player.x && x + w + 5 + scrollX >= player.x) {
            if (y - playerHeight + scrollY <= player.y && y + h + scrollY >= player.y) {
              if (player.y - 5 > y + scrollY) {
                while (x - player.width - 5 + scrollX <= player.x && x + w + 5 + scrollX >= player.x) {
                  if (velX < 0) {
                    player.x += 1;
                  } else {
                    player.x -= 1;
                  }
                }
                velX *= -1;
              }
            }
      }

  if (y - 5 + scrollY <= player.y && y + moving[item-2] + 9 + scrollY >= player.y) {
    if (x - player.width - 5 + scrollX <= player.x && x + w + 5 + scrollX >= player.x) {

        player.y += velocity * -1;
        velocity = 0;
    }
  }

    if (y - playerHeight + scrollY <= player.y && y + h + scrollY >= player.y) {
      if (x - player.width + scrollX <= player.x && x + w + scrollX >= player.x) {
          player.y = y - playerHeight - 1 + scrollY;
          velocity = 0;
          player.jumping = false;
      }
    }
    
  }
// Teleport Element
  iterations = moving.length / 7;

  for(var i = 1; i <= iterations; i++) {
    let item = i * 7;
    item -= 1;

    var playerSize = player.width / 2;
    var playerHeight = player.height;

      var x = teleport[item-6];
      var y = teleport[item-5];
      var w = teleport[item-4];
      var h = teleport[item-3];
      var tx = teleport[item-2];
      var ty = teleport[item-1];
      //console.log(item, pos_i, i, x, y, w, h);
      /*
      function intersectRect(r1, r2) {

          //300 200 320 220
          //306.6666681358367 754.0058175990582 327.6666681358367 775.0058175990582

          //300 200 320 220
          //302.00012025603013 400.6303886353699 323.00012025603013 421.6303886353699
        if (r2.left <= r1.left <= r2.right || r2.left <= r1.right <= r2.right){
            if (r2.top <= r1.top <= r2.bottom || r2.top <= r1.bottom <= r2.bottom){
                return true;
            }
        }
        return false;
      }

      console.log(intersectRect(
          {left: Math.min(x, x+w), 
           right: Math.max(x, x+w), 
           top: Math.min(y, y+h), 
           bottom: Math.max(y, y+h)}, 
          {left: player.x, 
           right: player.x + player.width, 
           top: player.y, 
           bottom: player.y + player.height}
      ));
      console.log(x, y, x+w, y+h);
      console.log(player.x, player.y, player.x + player.width, player.y + player.height);
        */
/*GFG example
// JavaScript program to check if rectangles overlap
      console.log("A: ", x+scrollX, y+scrollY, x+w+scrollX, y+h+scrollY);
      console.log("B: ", player.x, player.y, player.x + player.width, player.y + player.height);
class Point {

			constructor(val) {
				this.x = val;
				this.y = val;
			}
		}

	// Returns true if two rectangles
	// (l1, r1) and (l2, r2) overlap
	function doOverlap( l1, r1, l2, r2) {

	
		// If one rectangle is on left side of other
		if (l1.x > r2.x || l2.x > r1.x) {
			return false;
		}

		// If one rectangle is above other
		if (r1.y > l2.y || r2.y > l1.y) {
			return false;
		}

		return true;
	}

	// Driver program to test above function //
	//50 251.972 70 271.972
    //50 252.372 71 273.372
		var l1 = new Point(), r1 = new Point(),
		l2 = new Point(), r2 = new Point();
		l1.x = x+scrollX;
		l1.y = y+scrollY;
		r1.x = x+w+scrollX;
		r1.y = y+h+scrollY;
		l2.x = player.x;
		l2.y = player.y;
		r2.x = player.x + player.width;
		r2.y = player.y + player.height;

		if (doOverlap(l1, r1, l2, r2)) {
            console.log("yes==================================================================================================================================================================================================================================================================================================");
		} else {
		}

// This code contributed by umadevi9616

*/
          if (x - player.width - 5 + scrollX <= player.x && x + w + 5 + scrollX >= player.x) {
            if (y - playerHeight + scrollY <= player.y && y + h + scrollY >= player.y) {
              if (player.y - 5 > y + scrollY) {
                while (x - player.width - 5 + scrollX <= player.x && x + w + 5 + scrollX >= player.x) {
                    player.x = tx;
                    player.y = ty;
                  if (velX < 0) {
                    //player.x += 1;
                      
                  } else {
                    //player.x -= 1;
                  }
                }
                //velX *= -1;
              }
            }
      }
  if (y - 5 + scrollY <= player.y && y + h + 8 + scrollY >= player.y) { // used to be "&& y + h + 9 + scrollY"
    if (x - player.width - 5 + scrollX <= player.x && x + w + 5 + scrollX >= player.x) {

        player.y += velocity * -1;
        velocity = 0;
    }
  }

    if (y - playerHeight + scrollY <= player.y && y + h + scrollY >= player.y) {
      if (x - player.width + scrollX <= player.x && x + w + scrollX >= player.x) {
          player.y = y - playerHeight - 1 + scrollY;
          velocity = 0;
          player.jumping = false;
      }
    }
  }
    
}

function drawTeleport(){
    let iterations = teleport.length / 7;
    for (var i = 1; i <= iterations; i++){
        let item = i*7;
        item -= 1;
        //console.log(item);
        /*c.beginPath();
        c.strokeStyle = "white";
        c.moveTo(teleport[item-6] + scrollX, teleport[item-5] + scrollY);
        c.lineTo(teleport[item-6] + scrollX, 10000 + scrollY);
        c.moveTo(teleport[item-6] + scrollX + teleport[item-4], teleport[item-5] + scrollY);
        c.lineTo(teleport[item-6] + scrollX + teleport[item-4], 10000 + scrollY);
        c.stroke();
        */
        c.fillStyle = "#6b06d0";
        c.fillRect(teleport[item-6] + scrollX - 6, teleport[item-5] + scrollY - 6, teleport[item-4] + 12, teleport[item-3] + 6);
        c.fillStyle = teleport[item];
        c.fillRect(teleport[item-6] + scrollX, teleport[item-5] + scrollY, teleport[item-4], teleport[item-3] + 3);
    }
}

function drawMoving(){
    let iterations = moving.length / 6;
    //c.globalAlpha = 1;

    //c.fillStyle = "#f46d75";
    //c.fillStyle = "#ffe135";

    for (var i = 1; i <= iterations; i++){
        let item = i*6;
        item -= 1;
        let pos_i = i*2;
        pos_i -= 1;

        startX = moving[item-5]
        startY = moving[item-4]
        width  = moving[item-3]
        height = moving[item-2]
        endX   = moving[item-1]
        endY   = moving[item]
        tick   = movingtick[i-1]
        dir    = movingdir[i-1]
        currX = startX - (startX - endX)*tick;
        currY = startY - (startY - endY)*tick;
        //console.log(i);
        movingpos[pos_i-1] = currX;
        movingpos[pos_i] = currY;
        if (tick > 1){
            movingtick[i-1] = 1;
            movingdir[i-1] = -1;
        }
        if (tick < 0){
            movingtick[i-1] = 0;
            movingdir[i-1] = 1;
        }
        movingtick[i-1] += dir/200;
        c.strokeStyle = "white";
        c.beginPath();
        c.moveTo(startX + width/2 + scrollX, startY + height/2 + scrollY);
        c.lineTo(endX + width/2 + scrollX, endY + height/2 + scrollY);
        c.stroke();
        c.fillStyle = "#d0b206";
        c.fillRect(currX + scrollX - 6, currY + scrollY - 6, width + 12, height + 12);
        c.fillStyle = "#ffe135";
        c.fillRect(currX + scrollX, currY + scrollY, width, height);
        //console.log(width, height, dir, tick, currX, currY);
    }
}

function drawGround() {
  c.fillStyle = player.color;
  c.fillRect(player.x, player.y, player.nh, player.nw);

    let iterations = platforms.length / 4;

    c.globalAlpha = 1;

  for(var i = 1; i <= iterations; i++) {
    let item = i * 4;
    item -= 1;

    c.fillStyle = "#0077b6";
    c.fillRect(platforms[item-3] - 6 + scrollX, platforms[item - 2] - 6 + scrollY, platforms[item - 1] + 12, platforms[item] + 12);
  }

      for(var i = 1; i <= iterations; i++) {
    let item = i * 4;
    item -= 1;
      c.fillStyle = "#0096c7";
    c.fillRect(platforms[item-3] + scrollX, platforms[item - 2] + scrollY, platforms[item - 1], platforms[item]);
      }
}

function drawLava() {

    let iterations = lava.length / 4;

    c.fillStyle = "#0db39e"

    c.globalAlpha = 0.2;

  for(var i = 1; i <= iterations; i++) {
    let item = i * 4;
    item -= 1;
    
    let wave = 5 * Math.cos((timer + (2 * (i - 1))) * 120);

    c.fillRect(lava[item-3], lava[item - 2] + wave + scrollY, lava[item - 1], lava[item]);

    if(player.y > lava[item - 2] + scrollY) {
      restart();
    }

  }
}

function drawBounce() {

    let iterations = bounce.length / 4;

    c.globalAlpha = 1;

  for(var i = 1; i <= iterations; i++) {
    let item = i * 4;
    item -= 1;

    c.fillStyle = "#efea5a";
    c.fillRect(bounce[item-3] + scrollX, bounce[item - 2] + scrollY, bounce[item - 1], bounce[item]);

        if(player.y > bounce[item - 2] - 14 + scrollY && player.y < bounce[item - 2] + 14 + scrollY) {
          if (player.x > bounce[item - 3] - player.nw + scrollX && player.x < bounce[item - 3] + 20 + player.nw + scrollX) {
            velocity = -12;
              bouncesound.pause();
              bouncesound.currentTime = 0;
              bouncesound.play();
            bouncetick[i] = 0;
            let known = item;
              for(var i = 1; i <= 20; i++) {
              let item = i * 5;
              item -= 1;
                particles[item - 3] = bounce[known - 3]; 
                particles[item - 2] = bounce[known - 2];
                particles[item - 1] = Math.floor(Math.random() * 20) - 10;
                particles[item] = Math.floor(Math.random() * -10);
                particles[item - 4] = 1;
              }
          }
    }

    if (bouncetick[i] < 10) {
        drawParticles(2);
    }
    bouncetick[i]++;

    drawParticles(1);
  }
}

function drawCoin() {

    c.globalAlpha = 1;

    let iterations = coins.length / 2;
    let got = 0;

    for (var i = 0; i < (collected.length / 2); i++) {
      if ( collected[i + 1] == 1) {
        got++;
          if (respawn_i.includes(i+1)){
              if (respawnX != coins[i*2] && respawnY != coins[i*2+1]){
                  respawnX = coins[i*2];
                  respawnY = coins[i*2+1];
                  //alert("RESPAWN SET");
                  //console.log(respawnX, respawnY);
              }
          }
      }
    }

    document.getElementById('collected').innerHTML = got;

  for(var i = 1; i <= iterations; i++) {
    let item = i * 2;
    item -= 1;

    let wave = 5 * Math.cos((timer + (2 * (i - 1))) * 120);

    c.fillStyle = "#fee440";
    var w = 8;
      //console.log(i);
    if (respawn_i.includes(i)){
        c.fillStyle = "#00ffff";
        w = 16;
    }
    if (collected[(item + 1) / 2] == 0) {
    c.fillRect(coins[item-1] + scrollX, coins[item] + wave + scrollY, w, w);

      if(player.y + player.nh > coins[item] - 4 + scrollY && player.y - player.nh < coins[item] + 4 + scrollY) {
          if (player.x > coins[item - 1] - player.nw + scrollX && player.x < coins[item - 1] + player.nw + scrollX) {
            collected[(item + 1) / 2] = 1;
            if (respawn_i.includes(i)){
                setSpawn.pause();
                setSpawn.currentTime = 0;
                setSpawn.play();
            }
            else{
                coinCollect.pause();
                coinCollect.currentTime = 0;
                coinCollect.play();
            }
            cointick[i] = 0;
            let known = item;
              for(var i = 1; i <= 20; i++) {
              let item = i * 5;
              item -= 1;
                particles[item - 3] = coins[known - 1]; 
                particles[item - 2] = coins[known];
                particles[item - 1] = Math.floor(Math.random() * 20) - 10;
                particles[item] = Math.floor(Math.random() * -5) - 5;
                particles[item - 4] = 1;
              }
          }
      }
    }

    if (cointick[i] < 20) {
      drawParticles(3);
    }
    cointick[i]++;
    c.globalAlpha = 1;
  }
}

function drawEnemies() {

    c.globalAlpha = 1;

    let iterations = enemies.length / 3;

  for(var i = 1; i <= iterations; i++) {
    let item = i * 3;
    item -= 1;

    c.fillStyle = "#FF6161";
    c.fillRect(enemies[item-1] + scrollX, enemies[item] + scrollY, 15, 15);

      if(player.y + player.nh > enemies[item] - 7.5  + scrollY && player.y - player.nh < enemies[item] + 7.5  + scrollY) {
          if (player.x > enemies[item - 1] - player.nw + scrollX && player.x < enemies[item - 1] + player.nw + scrollX) {
            restart();
          }
      }

      let value = enemies[item - 2]
      let wave = Math.cos((timer2) * value);

        if (wave >= 0) {
          enemies[item - 1]++;
        } else {
          enemies[item - 1]--;
        }
  }
}



function drawParticles(value) {

  if (value == 2) {

    let iterations = 20;

    c.fillStyle = "#efea5a";

    for(var i = 1; i <= iterations; i++) {
      let item = i * 5;
      item -= 1;

      particles[item - 3] += particles[item - 1] / 5;
      particles[item - 2] += particles[item] / 2;
      particles[item] += 0.5;

      c.globalAlpha = particles[item - 4];
      particles[item - 4] -= 0.1;

      c.fillRect(particles[item - 3] + scrollX + 10, particles[item - 2] + scrollY + 5, 3, 3);

    }
  } else if (value == 1) {
    
    let iterations = 20;

    c.fillStyle = "#efea5a";

    for(var i = 1; i <= iterations; i++) {
      let item = i * 4;
      item -= 1;

      if (iter[i] < 1) {
        bouncepart[item - 3] = bounce[item - 3] + 5; 
        bouncepart[item - 2] = bounce[item - 2] - 20;
        iter[i] = 40;
      }

      c.globalAlpha = iter[i] / 20;

      c.fillRect(bouncepart[item - 3] + scrollX - 5, bouncepart[item - 2] + scrollY + iter[i] , 20, 2);

      iter[i] -= 0.5;

      c.globalAlpha = 1;
    }
  } else if (value == 3) {
  
    let iterations = 20;

    c.fillStyle = "#fee440";

    for(var i = 1; i <= iterations; i++) {
      let item = i * 5;
      item -= 1;

      particles[item - 3] += particles[item - 1] / 5;
      particles[item - 2] += particles[item] / 5;

      particles[item] += 0.25;

      c.globalAlpha = particles[item - 4];
      particles[item - 4] -= 0.05;

      c.fillRect(particles[item - 3] + scrollX + 10, particles[item - 2] + scrollY, 4, 4);
    }
  }
}

function drawBacking() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.globalAlpha = 0.8;

     c.fillStyle = "#ffffff";

        let iterations = stars.length;

      for(var i = 0; i <= iterations; i += 3) {
        var parralax = ( stars[i + 2] * -1 ) + 25;

    c.fillRect(stars[i] + (scrollX / parralax ), stars[i + 1] + (scrollY / parralax), stars[i + 2], stars[i + 2]);
  }

     iterations = backing.length;

    c.globalAlpha = 1;
    c.fillStyle = "#010d23";

  for(var i = 0; i <= iterations; i++) {

    c.fillRect((i * 150) + (scrollX / 10), backing[i + 1] - 200 + (scrollY / 10), 155, 1000);
  }

    c.fillStyle = player.color;
  c.fillRect(player.x, player.y, player.nh, player.nw);
}

function scroll() {

    //930
  let change = (ctx.width/2 - player.x) / 20;

scrollX += change;
if (scrollX > 0) {
  scrollX = 0;
} else {
  player.x += change;
}

change = (ctx.height/2 - player.y) / 50;

scrollY += change;
//if (scrollY < -40) {
//  scrollY = -40;
//} else {
  player.y += change;
//}

}

function restart() {
      player.x = respawnX;
      player.y = respawnY;
      velX = 0;
      player.jumping = true;
      deaths++;
      scrollX = 0;
      scrollY = 0;
      deathsound.play();
}
respawnX = 50;
respawnY = 250;
function reset() {
      player.x = 50; //50
      player.y = 250; //250
      respawnX = 50;
    respawnY = 250;
      player.jumping = true;
      velocity = 0;
      velX = 0;
      timer = 0;
      deaths = 0;
      scrollX = 0;
      scrollY = 0;
    for (var i = 0; i < (collected.length); i++) {
      if ( collected[i + 1] == 1) {
        collected[i + 1] = 0;
      }
    }

      document.getElementById('collected').innerHTML = 0;
      click.play();

      music.pause();
      music.currentTime = 0;
      music.loop = true;
      music.play();
}

 
// start prompt implemented, so there is no need.

//window.addEventListener("load",function(){
    draw();
//});

    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
    });

    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });









/*
///////////
TIMER JS
---START---
*/









/*
----END-----
  */

/////////////
