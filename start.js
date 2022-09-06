function linkScript(body, loc){
    var a = document.createElement("script");
    a.src = loc;
    body.appendChild(a);
}
document.getElementById("startGame").onclick = () => {
    document.getElementById('startBox').style.display = 'none';
    linkScript(document.body, "/script.js");
    linkScript(document.body, "/timer.js");
    console.log(1)
}
