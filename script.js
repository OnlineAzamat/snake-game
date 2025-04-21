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

let gameFrame = 0;
let snakeArray = [{x: 7, y: 7}]; // snake starts at grid position (7, 7)
let direction = {x: 0, y: 0}; // initial direction (moving right)
let head = {};

let snakeBodyArr = [];

const snakeRight = new Image();
const snakeLeft = new Image();
const snakeUp = new Image();
const snakeDown = new Image();
snakeRight.src = "assets/head_right.png";
snakeLeft.src = "assets/head_left.png";
snakeUp.src = "assets/head_up.png";
snakeDown.src = "assets/head_down.png";

class Snake {
  constructor() {
    this.width = 28;
    this.height = 28;
    this.x = snakeArray[0].x * this.width;
    this.y = snakeArray[0].y * this.height;
    this.speed = 7;
    this.currentlyState = snakeRight;
  }
  draw() {
    // ctx.beginPath();
    // ctx.rect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = "red";
    // ctx.fill();
    switch(key) {
      case "ArrowRight": this.currentlyState = snakeRight
      break;
      case "ArrowLeft": this.currentlyState = snakeLeft
      break;
      case "ArrowUp": this.currentlyState = snakeUp
      break;
      case "ArrowDown": this.currentlyState = snakeDown
      break;
      default: this.currentlyState = snakeRight
    }
    
    ctx.drawImage(this.currentlyState, this.x, this.y, this.width, this.height);
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
    
    // Update the snake's position to the new head position
    this.x = head.x * 28;
    this.y = head.y * 28;
    
    // Handle boundary collision (wrap around for now)
    if (this.x < 0) this.x = 0;
    if (this.x >= canvas.width) this.x = canvas.width - this.width;
    if (this.y < 0) this.y = 0;
    if (this.y >= canvas.height) this.y = canvas.height - this.height;
  }
}
const snake = new Snake();

// snake body
class snakeBody {
  constructor() {
    this.width = snake.width;
    this.height = snake.height;
    // this.x = snakeArray[].x * this.width;
    // this.y = snakeArray[].y * this.height;
    this.speed = snake.speed;
    this.image = new Image();
    this.image.src = "assets/body_horizontal.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

// Frog
class Frog {
  constructor() {
    this.width = 28;
    this.height = 28;
    this.x = Math.floor(Math.random() * 25) * this.width; // floor(0.452 * 25)= 32 * 28 >>>>>>>> 28, 56, 84, 112...
    this.y = Math.floor(Math.random() * 25) * this.height;
    this.image = new Image();
    this.image.src = "assets/apple.png";
    this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  }
  draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.fill();

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
      snake.x < frogsArray[i].x + frogsArray[i].width &&
      snake.x + snake.width > frogsArray[i].x &&
      snake.y < frogsArray[i].y + frogsArray[i].height &&
      snake.y + snake.height > frogsArray[i].y
    ) {
      score++;
      frogsArray.splice(i, 1);
      i--;

      console.log(score);
    }
  }
}

  // setInterval(() => {
  //   console.log(snakeBodyArr)
  // }, [10000])

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleFrog();

  snake.draw();
  snake.update();

  requestAnimationFrame(animate);
}
animate();