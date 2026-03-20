import { Snake } from './snake.js';
import { Food } from './food.js';
import { UIManager } from './uiManager.js';
import { ScoreManager } from './scoreManager.js';

export function startGame() {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  // Initialize managers
  const scoreManager = new ScoreManager();
  const uiManager = new UIManager(scoreManager);

  // grid configuration – 25 cells per side (700/28 = 25)
  const cellSize = 28;
  const gridCount = 25;

  canvas.width = cellSize * gridCount;
  canvas.height = cellSize * gridCount;

  // Game state
  let gameState = {
    isRunning: false,
    isPaused: false,
    score: 0,
  };

  // Game objects
  let snake = null;
  let food = null;
  let animationFrameId = null;

  function initializeGame() {
    snake = new Snake({ x: 7, y: 7 }, cellSize, gridCount);
    food = new Food(cellSize, gridCount);
    gameState.score = 0;
  }

  function setupKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      if (!gameState.isRunning || gameState.isPaused) return;

      switch (e.key) {
        case 'ArrowRight':
          snake.setDirection({ x: 1, y: 0 });
          e.preventDefault();
          break;
        case 'ArrowLeft':
          snake.setDirection({ x: -1, y: 0 });
          e.preventDefault();
          break;
        case 'ArrowUp':
          snake.setDirection({ x: 0, y: -1 });
          e.preventDefault();
          break;
        case 'ArrowDown':
          snake.setDirection({ x: 0, y: 1 });
          e.preventDefault();
          break;
      }
    });
  }

  function checkFoodCollision() {
    const head = snake.getHeadPosition();
    if (head.x === food.x && head.y === food.y) {
      gameState.score += 1;
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
        return true;
      }
    }
    return false;
  }

  function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`Score: ${gameState.score}`, 15, 30);
    
    // Draw border for better visibility
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  }

  function gameLoop() {
    if (gameState.isRunning && !gameState.isPaused) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      food.draw(ctx);
      snake.update();
      snake.draw(ctx);

      checkFoodCollision();

      if (checkSelfCollision()) {
        endGame();
        return;
      }

      drawScore();
    }

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  function startGameplay() {
    initializeGame();
    gameState.isRunning = true;
    gameState.isPaused = false;
    uiManager.showPlayingScreen();
    gameLoop();
  }

  function endGame() {
    gameState.isRunning = false;
    gameState.isPaused = true;

    // Show game over screen after a short delay
    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      uiManager.showGameOverScreen(gameState.score);

      // Setup UI callbacks for game over
      uiManager.onRestartGame(() => {
        startGameplay();
      });

      uiManager.onMenuReturn(() => {
        showMenu();
      });
    }, 300);
  }

  function showMenu() {
    gameState.isRunning = false;
    gameState.isPaused = true;
    cancelAnimationFrame(animationFrameId);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    uiManager.showMenuScreen();

    // Setup UI callback
    uiManager.onStartGame(() => {
      startGameplay();
    });
  }

  // Initialize
  setupKeyboardControls();
  showMenu();
}

