const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let score = 0;

// Keydown
let key = "";
window.addEventListener("keydown", (e) => {
  key = e.key;
});

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 20;
    this.height = 20;
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "red";
    ctx.fill();
  }
  update() {
    if (key === "ArrowRight") {
      this.x += 2;
    } else if (key === "ArrowLeft") {
      this.x -= 2;
    } else if (key === "ArrowUp") {
      this.y -= 2;
    } else if (key === "ArrowDown") {
      this.y += 2;
    };

    if (this.x <= 0 || this.x >= 800) {
      this.x = 0;
    } else if (this.y <= 0 || this.y >= 500) {
      this.y = 0;
    }
  }
}
const player = new Player();

// Frog
class Frog {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 20;
    this.height = 20;
    this.distance;
    this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.roundRect(this.x, this.y, this.width, this.height, 4);
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

    // if (frogsArray[i].y < 0 - frogsArray[i].radius * 2) {
    //   frogsArray.splice(i, 1);
    //   i--;
    // } else if (frogsArray[i].distance < frogsArray[i].radius + player.radius) { // collision
    //   if (!frogsArray[i].counted) {
    //     score++;
    //     frogsArray.splice(i, 1);
    //     i--;
    //   }
    // }
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