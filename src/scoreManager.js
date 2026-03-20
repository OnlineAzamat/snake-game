export class ScoreManager {
  constructor() {
    this.storageKey = 'snakeGameScores';
  }

  /**
   * Save a new score
   */
  saveScore(score) {
    const scores = this.getScores();
    scores.push({
      score,
      date: new Date().toLocaleString(),
    });

    // Sort by score descending and keep top 10
    scores.sort((a, b) => b.score - a.score);
    scores.splice(10);

    localStorage.setItem(this.storageKey, JSON.stringify(scores));
    return scores;
  }

  /**
   * Get all scores sorted by highest first
   */
  getScores() {
    try {
      const scores = localStorage.getItem(this.storageKey);
      return scores ? JSON.parse(scores) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Get the highest score
   */
  getHighScore() {
    const scores = this.getScores();
    return scores.length > 0 ? scores[0].score : 0;
  }

  /**
   * Clear all scores
   */
  clearScores() {
    localStorage.removeItem(this.storageKey);
  }
}
