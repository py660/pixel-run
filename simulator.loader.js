window.win = {closed: true};
window.origRespawnX = 50;
window.origRespawnY = 250;
window.player = {
  //x: 1400,
  //y: -300,
  color: "white",
  x: origRespawnX,
  y: origRespawnY,
  nh: 15,
  nw: 15,
  height: 21, // 6 more than nh
  width: 21, // 6 more than nw
  speed: 2,
  jumping: true
};
// Indexes starting from 1, defines which coins are to be used as respawn points
var respawn_i = [];


//GROUPS OF 4, (X, Y, W, H)
var platforms = [
                0, 850, 10000, 10000,
                  0, 310, 80, 700
];

//GROUPS OF 6, (START_X, START_Y, W, H, END_X, END_Y)
var moving = [];


//GROUPS OF 2, (CURR_X, CURR_Y)
var movingpos = []; // Value=(start_x, start_y), moving.length/3


//DECIMAL < 1 DEFINES POSITION OF PLATFORM RELATIVE TO START AND END COORDS
var movingtick = []; // Value = 0, moving.length/6

var movingdir = []; // Value = 1, moving.length/6


var lava_k = 700;
//GROUPS OF 4, DEFINES THE GROUND. (START_X, START_Y, END_X, END_Y), RELATIVE TO THE TOP LEFT
var lava = [0, lava_k, 10000, 10000, 0, lava_k + 30, 10000, 10000, 0, lava_k + 60, 10000, 10000];

//GROUPS OF 4, (X, Y, X_LENGTH, JUMP_HEIGHT = 7)
var bounce = [];

//GROUPS OF 2, (X, Y)
var coins = [];
//REMEMBER TO CHANGE LINE 21 IF STATEMENT NUMBER (DEFAULT 23) IN timer.js TO THE NUMBER OF REQUIRED COINS

//coins += [1050, 280, 850, 180, 1050, -20, 850, -120];

//GROUPS OF 3, (???, X, Y)
//var enemies = [62, 595, 380, 31, 455, 490, 31, 1473, 480, 
//                62, 1048, -120];
var enemies = [];
var collected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // coins.length
var backing = [700, 400, 450, 600, 500, 520, 410, 400, 700, 450, 450, 600, 650, 440, 650, 700, 540, 650, 605, 405, 400, 550, 520, 599, 678, 689, 399, 320, 540, 530, 520, 654, 546]; //distance from top of the screen


//SPEED OF BOUNCE PADS, DEFAULT 20
var bouncetick = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]; // bounce.length/4 * 9
var cointick = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 
               20, 20]; // coins.length divided by 2

var particles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //coins.length
var bouncepart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //bounce.length*10

var iter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//bounce.length*10
window.totalCoins = parseInt(coins.length/2);



function openEditor(type){
    switch(type){
        case "fixed":
            editFixed();
            break;
        case "player":
            editPlayer();
            break;
        case "moving":
            editMoving();
            break;
        case "coins":
            editCoins();
            break;
        case "save":
            save();
            break;
        case "load":
            load();
            break;
        default:
            alert("Invalid option: " + type.toString());
            break;
    }
}