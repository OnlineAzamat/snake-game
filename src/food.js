import { images } from './assets.js';

export class Food {
  constructor(cellSize, gridCount) {
    this.cellSize = cellSize;
    this.gridCount = gridCount;
    this.image = images.apple;
    this.respawn();
  }

  respawn() {
    this.x = Math.floor(Math.random() * this.gridCount);
    this.y = Math.floor(Math.random() * this.gridCount);
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.x * this.cellSize,
      this.y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}
