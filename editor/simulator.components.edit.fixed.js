function editFixed(){ //Fixed Platform
    if (win.closed){
        window.win = window.open("", "_blank", "title=Configuration Window");
    }
    win.focus()
    win.document.title = "New Platform";
    win.document.body.innerHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
  margin: 0;
  min-width: 250px;
  font: helvetica;
}

/* Include the padding and border in an element's total width and height */
* {
  box-sizing: border-box;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  list-style-type: none;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  
  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.header {
  background-color: #f44336;
  padding: 30px 40px;
  color: white;
  text-align: center;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>
</head>
<body>

<div id="myDIV" class="header">
  <h2 style="margin:5px">Fixed Platforms</h2>
  <input type="text" id="myInput" placeholder="x,y,width,height">
  <span onclick="newElement()" id="add" class="addBtn">Add</span>
</div>

<ul id="myUL">
</ul>

<script>
document.getElementById('myInput').onkeydown = function(event) {
    if (event.keyCode == 13) {
    	newElement();
    }
}// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
//var list = document.querySelector('ul');
//list.addEventListener('click', function(ev) {
//  if (ev.target.tagName === 'LI') {
//    ev.target.classList.toggle('checked');
//  }
//}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
update();

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
        div.remove();
        update();
    }
  }
}
</script>

</body>
</html>

`;
function executeScriptElements(containerElement) {
  var scriptElements = containerElement.querySelectorAll("script");

  Array.from(scriptElements).forEach((scriptElement) => {
    var clonedElement = document.createElement("script");

    Array.from(scriptElement.attributes).forEach((attribute) => {
      clonedElement.setAttribute(attribute.name, attribute.value);
    });
    
    clonedElement.text = scriptElement.text;

    scriptElement.parentNode.replaceChild(clonedElement, scriptElement);
  });
}
    executeScriptElements(win.document.documentElement);
    win.update = () => {
        //if (edited){
            platforms = [];
        //}
        //else{
        //    platforms = [0, 850, 10000, 10000, 0, 310, 80, 700];
        //}
        //platforms = [];
        /*
        win.document.querySelectorAll("ul li").forEach((el) => {
            var a = el.innerHTML.slice(0, -28).split(",");
            win.alert("Item: [" + a + "]");
            if (a.length == 4){
                win.alert("Length is 4");
                platforms += [100, 100, 100, 100];
                win.alert(platforms);
            }
            else{
                el.style.background = "red";
            }
        })
        */
        ///*
        win.document.querySelectorAll("ul li").forEach((el) => {
            var a = el.innerHTML.slice(0, -28).split(",");
            if (a.length == 4){
                var c = true;
                var d = [];
                a.forEach((e) => {
                    //win.alert("hi");
                    b = parseInt(e);
                    //win.alert(e);
                    d.push(b);
                    c = false;
                    if (b){
                        c = true;
                    }
                    if (b === 0){
                        c = true;
                    }
                });
                if (c){
                    platforms = platforms.concat(d);
                    //win.alert("append");
                }
                else{
                    el.style.background = "orange";
                }
            }
            else{
                el.style.background = "red";
            }
        });
        //*/
    };
    var l = parseInt(platforms.length/4);
    var p = [...platforms];
    for (let index = 0; index < l; index++) {
        var item = index * 4;
        win.document.querySelector("#myInput").value = p.slice(item, item + 4).toString();
        win.document.querySelector("#add").click();
        console.log(p.length);
    }
}
