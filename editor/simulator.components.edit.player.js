/*window.origRespawnX = 50;
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
};*/

function editPlayer(){
    if (win.closed){
        window.win = window.open("", "_blank", "title=Configuration Window");
    }
    win.focus()
    win.document.title = "Player Configuration";
win.document.body.innerHTML = `
    <h1>Player Configuration Window</h1><br/>
    <label for="respawnX">Default Spawn Point X: </label><input type="number" value="` + origRespawnX + `" id="respawnX"/><br/>
    <label for="respawnY">Default Spawn Point Y: </label><input type="number" value="` + origRespawnY + `" id="respawnY"/><br/>
    <label for="color">Default Player Color: </label><input type="color" value="` + (player.color == "white" ? "#ffffff" : player.color) + `" id="color"/><br/>
    <label for="speed">Player Speed: </label><input type="number" value="` + player.speed + `" id="speed"/><br/>
    <label for="size">Player Side Length: </label><input type="number" disabled readonly value="` + (Math.random() < 0.5 ? player.nh : player.nw) + `" id="size"/><br/>
    <button id="eval">Evaluate</button>
`;
    win.document.querySelector("#eval").onclick = () => {
        origRespawnX = parseInt(win.document.querySelector("#respawnX").value);
        origRespawnY = parseInt(win.document.querySelector("#respawnY").value);
        player.x     = origRespawnX;
        player.y     = origRespawnY;
        respawnX     = origRespawnX;
        respawnY     = origRespawnY;
        player.color = win.document.querySelector("#color").value;
        player.speed = parseInt(win.document.querySelector("#speed").value);
        player.nh    = parseInt(win.document.querySelector("#size").value);
        player.nw    = parseInt(win.document.querySelector("#size").value);
        player.height = player.nh + 6;
        player.width  = player.nw + 6;
        
    }
}