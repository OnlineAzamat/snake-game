export class UIManager {
  constructor(scoreManager) {
    this.scoreManager = scoreManager;
    this.canvasContainer = null;
    this.menuScreen = null;
    this.gameOverScreen = null;
    this.currentScreen = 'menu'; // menu | playing | gameOver
  }

  createMenuScreen() {
    const menuScreen = document.createElement('div');
    menuScreen.id = 'menu-screen';
    menuScreen.className = 'game-screen menu-screen';

    const highScore = this.scoreManager.getHighScore();
    const scores = this.scoreManager.getScores();

    menuScreen.innerHTML = `
      <div class="menu-container">
        <h1 class="game-title">🐍 SNAKE GAME 🐍</h1>
        
        <div class="menu-stats">
          <div class="stat-item">
            <span class="stat-label">High Score:</span>
            <span class="stat-value">${highScore}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Games:</span>
            <span class="stat-value">${scores.length}</span>
          </div>
        </div>

        <button id="start-btn" class="menu-btn start-btn">
          <span class="btn-text">START GAME</span>
          <span class="btn-icon">▶</span>
        </button>

        ${scores.length > 0 ? `
          <div class="scores-section">
            <h2>📊 TOP SCORES</h2>
            <div class="scores-list">
              ${scores.slice(0, 5).map((s, i) => `
                <div class="score-item">
                  <span class="score-rank">#${i + 1}</span>
                  <span class="score-points">${s.score}</span>
                  <span class="score-date">${s.date}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="menu-footer">
          <p>🎮 Use Arrow Keys to control the snake</p>
          <p>🍎 Eat food to grow and score points</p>
        </div>
      </div>
    `;

    return menuScreen;
  }

  createGameOverScreen(finalScore) {
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'game-over-screen';
    gameOverScreen.className = 'game-screen game-over-screen';

    const highScore = this.scoreManager.getHighScore();
    const isNewHighScore = finalScore >= highScore;
    const scores = this.scoreManager.getScores();

    gameOverScreen.innerHTML = `
      <div class="game-over-container">
        <h1 class="game-over-title">💀 GAME OVER 💀</h1>
        
        ${isNewHighScore && finalScore > 0 ? `
          <div class="new-high-score">🏆 NEW HIGH SCORE! 🏆</div>
        ` : ''}

        <div class="final-score">
          <span class="score-label">Your Score:</span>
          <span class="score-number">${finalScore}</span>
        </div>

        <div class="score-comparison">
          <div class="comparison-item">
            <span>High Score:</span>
            <span>${highScore}</span>
          </div>
          <div class="comparison-item">
            <span>Total Games:</span>
            <span>${scores.length}</span>
          </div>
        </div>

        <button id="restart-btn" class="menu-btn restart-btn">
          <span class="btn-text">PLAY AGAIN</span>
          <span class="btn-icon">🔄</span>
        </button>

        <button id="menu-btn" class="menu-btn menu-return-btn">
          <span class="btn-text">BACK TO MENU</span>
          <span class="btn-icon">🏠</span>
        </button>

        ${scores.length > 0 ? `
          <div class="game-over-scores-section">
            <h3>RECENT SCORES</h3>
            <div class="scores-list">
              ${scores.slice(0, 5).map((s, i) => `
                <div class="score-item ${i === 0 ? 'best' : ''}">
                  <span class="score-rank">#${i + 1}</span>
                  <span class="score-points">${s.score}</span>
                  <span class="score-date">${s.date}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    return gameOverScreen;
  }

  showMenuScreen() {
    this.hideAllScreens();
    if (!this.menuScreen) {
      this.menuScreen = this.createMenuScreen();
      document.body.appendChild(this.menuScreen);
    } else {
      this.menuScreen = this.createMenuScreen();
      const old = document.getElementById('menu-screen');
      if (old) old.remove();
      document.body.appendChild(this.menuScreen);
    }
    this.currentScreen = 'menu';
  }

  showGameOverScreen(finalScore) {
    this.hideAllScreens();
    this.scoreManager.saveScore(finalScore);
    this.gameOverScreen = this.createGameOverScreen(finalScore);
    document.body.appendChild(this.gameOverScreen);
    this.currentScreen = 'gameOver';
  }

  showPlayingScreen() {
    this.hideAllScreens();
    this.currentScreen = 'playing';
  }

  hideAllScreens() {
    const menuScreen = document.getElementById('menu-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    if (menuScreen) menuScreen.remove();
    if (gameOverScreen) gameOverScreen.remove();
  }

  onStartGame(callback) {
    setTimeout(() => {
      const startBtn = document.getElementById('start-btn');
      if (startBtn) {
        startBtn.addEventListener('click', callback);
      }
    }, 0);
  }

  onRestartGame(callback) {
    setTimeout(() => {
      const restartBtn = document.getElementById('restart-btn');
      if (restartBtn) {
        restartBtn.addEventListener('click', callback);
      }
    }, 0);
  }

  onMenuReturn(callback) {
    setTimeout(() => {
      const menuBtn = document.getElementById('menu-btn');
      if (menuBtn) {
        menuBtn.addEventListener('click', callback);
      }
    }, 0);
  }
}
