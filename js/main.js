const gameEngine = new Engine(document.getElementById('app'));
let app = document.getElementById("app")
app.style.margin = "0 auto";
app.style.width = "825px";
app.style.position = "relative";
const keydownHandler = (event) => {
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }
  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }
};
document.addEventListener('keydown', keydownHandler);

let start = document.createElement("button");
start.className = "start"
start.innerText = "START"

app.appendChild(start);

start.addEventListener("click", beginGame)

function beginGame(){
  start.style.display ="none"
  gameEngine.gameLoop();
  
}


