const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;

const gridSize = 70; // assuming each cell is 50x50 pixels

let score = 0;

// Keydown
let key = "";
window.addEventListener("keydown", (e) => {
  key = e.key;
});

let snakeArray = [{x: 7, y: 7}]; // snake starts at grid position (7, 7)
let direction = {x: 0, y: 0}; // initial direction (moving right)
let head = {};
let gameFrame = 0;

const snakeRight = new Image();
snakeRight.src = "assets/head_right.png";
const snakeLeft = new Image();
snakeLeft.src = "assets/head_left.png";
const snakeUp = new Image();
snakeUp.src = "assets/head_up.png";
const snakeDown = new Image();
snakeDown.src = "assets/head_down.png";

class Player {
  constructor() {
    this.width = 28;
    this.height = 28;
    this.x = snakeArray[0].x * this.width;
    this.y = snakeArray[0].y * this.height;
    this.speed = 7;
  }
  draw() {
    // ctx.beginPath();
    // ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "red";
    // ctx.fill();
    ctx.drawImage(snakeRight, this.x, this.y, this.width, this.height);
    if (key === "ArrowRight") {
      ctx.drawImage(snakeRight, this.x, this.y, this.width, this.height);
    } else if (key === "ArrowLeft") {
      ctx.drawImage(snakeLeft, this.x, this.y, this.width, this.height);
    } else if (key === "ArrowUp") {
      ctx.drawImage(snakeUp, this.x, this.y, this.width, this.height);
    } else if (key === "ArrowDown") {
      ctx.drawImage(snakeDown, this.x, this.y, this.width, this.height);
    }
  }
  update() {
    head = {...snakeArray[0]} // Copy the current head position
    gameFrame++;

    if (key === "ArrowRight") {
      direction = {
        x: gameFrame % this.speed === 0 ? 1 : 0, 
        y: 0
      }
    } else if (key === "ArrowLeft") {
      direction = {
        x: gameFrame % this.speed === 0 ? -1 : 0, 
        y: 0
      }
    } else if (key === "ArrowUp") {
      direction = {
        x: 0, 
        y: gameFrame % this.speed === 0 ? -1 : 0
      }
    } else if (key === "ArrowDown") {
      direction = {
        x: 0, 
        y: gameFrame % this.speed === 0 ? 1 : 0
      }
    };
    
    head.x += direction.x;
    head.y += direction.y;

    // Add the new head position to the front of the snake array
    snakeArray.unshift(head);
    
    // Remove the last element to simulate movement (if not eating a frog)
    snakeArray.pop();
    
    // Update the player's position to the new head position
    this.x = head.x * 28;
    this.y = head.y * 28;
    
    // Handle boundary collision (wrap around for now)
    if (this.x < 0) this.x = 0;
    if (this.x >= canvas.width) this.x = canvas.width - this.width;
    if (this.y < 0) this.y = 0;
    if (this.y >= canvas.height) this.y = canvas.height - this.height;
  }
}
const player = new Player();

// Frog
class Frog {
  constructor() {
    this.width = 28;
    this.height = 28;
    this.x = Math.floor(Math.random() * 25) * this.width; // floor(0.452 * 25)= 32 * 28 >>>>>>>> 28, 56, 84, 112...
    this.y = Math.floor(Math.random() * 25) * this.height;
    this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
const frog = new Frog();

const frogsArray = [new Frog()];

// handleFrog
function handleFrog() {
  if (frogsArray.length === 0) {
    frogsArray.push(new Frog());
  }

  for (let i = 0; i < frogsArray.length; i++) {
    frogsArray[i].draw();

    if (
      player.x < frogsArray[i].x + frogsArray[i].width &&
      player.x + player.width > frogsArray[i].x &&
      player.y < frogsArray[i].y + frogsArray[i].height &&
      player.y + player.height > frogsArray[i].y
    ) {
      score++;
      frogsArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleFrog();

  player.draw();
  player.update();

  requestAnimationFrame(animate);
}
animate();