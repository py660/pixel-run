function save() {
    var data = setData();
    download_file("Snapshot " + new Date(Date.now()).toLocaleString(), JSON.stringify(data), "application/json");
}
function load() {
    if (win.closed){
        window.win = window.open("", "_blank", "title=Configuration Window");
    }
    win.focus()
    win.document.title = "Import Snapshot";
    win.document.body.innerHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<label for="levelData">Data File: </label><input type="file" id="levelData"/>
<button onclick="loadFile();">Load</button>
</body>
</html>

`;
    win.loadFile = function(){
        console.log("loadfile");
        var file = win.document.getElementById("levelData").files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {  
                var data = JSON.parse(evt.target.result);
                getData(data);
            }
            reader.onerror = function (evt) {
                alert("Error reading file");
            }
        }
    }
}


function setData(){
    return {
        date: new Date().getTime(),
        origRespawnX: window.origRespawnX,
        origRespawnY: window.origRespawnY,
        player: window.player,
        respawn_i: respawn_i,
        platforms: platforms,
        moving: moving,
        movingpos: movingpos,
        movingtick: movingtick,
        movingdir: movingdir,
        lava_k: lava_k,
        lava: lava,
        bounce: bounce,
        coins: coins,
        enemies: enemies,
        collected: collected,
        backing: backing,
        bouncetick: bouncetick,
        cointick: cointick,
        particles: particles,
        bouncepart: bouncepart,
        iter: iter
    }
}
function getData(data){
    window.origRespawnX = data.origRespawnX;
    window.origRespawnY = data.origRespawnY;
    window.player = data.player;
    
    window.player.color = data.player.color;
    window.player.x = window.origRespawnX;
    window.player.y = window.origRespawnY;
    window.respawn_i = data.respawn_i;
    window.platforms = data.platforms;
    window.moving = data.moving;
    window.movingpos = data.movingpos;
    window.movingtick = data.movingtick.fill(0);
    window.movingdir = data.movingdir.fill(1);
    window.lava_k = data.lava_k;
    window.lava = data.lava;
    window.bounce = data.bounce;
    window.coins = data.coins;
    window.enemies = data.enemies;
    window.collected = data.collected.fill(0);
    window.backing = data.backing;
    window.bouncetick = data.bouncetick;
    window.cointick = data.cointick;
    window.particles = data.particles.fill(0);
    window.bouncepart = data.bouncepart.fill(0);
    window.iter = data.iter.fill(0);
    window.totalCoins = parseInt(coins.length/2);
    document.getElementById("reset").click();
    document.getElementById('maxcollected').innerHTML = '/ ' + (coins.length / 2);
}