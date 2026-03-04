import { Snake } from './snake.js';
import { Food } from './food.js';

export function startGame() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  // grid configuration – 25 cells per side (700/28 = 25)
  const cellSize = 28;
  const gridCount = 25;

  canvas.width = cellSize * gridCount;
  canvas.height = cellSize * gridCount;

  const snake = new Snake({ x: 7, y: 7 }, cellSize, gridCount);
  const food = new Food(cellSize, gridCount);
  let score = 0;

  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
        snake.setDirection({ x: 1, y: 0 });
        break;
      case 'ArrowLeft':
        snake.setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowUp':
        snake.setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        snake.setDirection({ x: 0, y: 1 });
        break;
    }
  });

  function checkFoodCollision() {
    const head = snake.getHeadPosition();
    if (head.x === food.x && head.y === food.y) {
      score += 1;
      snake.grow(1);
      food.respawn();
    }
  }

  function checkSelfCollision() {
    const head = snake.getHeadPosition();
    // skip the head itself when checking
    for (let i = 1; i < snake.segments.length; i++) {
      const seg = snake.segments[i];
      if (seg.x === head.x && seg.y === head.y) {
        // simple restart
        snake.segments = [{ x: 7, y: 7 }];
        snake.direction = { x: 1, y: 0 };
        snake.growth = 0;
        score = 0;
        break;
      }
    }
  }

  function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.fillText(`Score: ${score}`, 10, 24);
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    food.draw(ctx);
    snake.update();
    snake.draw(ctx);

    checkFoodCollision();
    checkSelfCollision();
    drawScore();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
