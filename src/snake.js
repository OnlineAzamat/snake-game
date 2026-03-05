import { images } from './assets.js';
import { dirToKey } from './utils.js';
import { getBodyImage } from './snakeBody.js';

export class Snake {
  constructor(startPos, cellSize, gridCount) {
    this.cellSize = cellSize;
    this.gridCount = gridCount;

    // segments are stored in grid units
    this.segments = [{ x: startPos.x, y: startPos.y }];
    this.direction = { x: 1, y: 0 };
    this.speed = 60;
    this.frame = 0;

    // number of extra pieces to add (growth) when eating food
    this.growth = 0;
  }

  setDirection(newDir) {
    // prevent reversing directly
    if (
      (newDir.x === -this.direction.x && newDir.x !== 0) ||
      (newDir.y === -this.direction.y && newDir.y !== 0)
    ) {
      return;
    }
    this.direction = newDir;
  }

  grow(amount = 1) {
    this.growth += amount;
  }

  getHeadPosition() {
    return this.segments[0];
  }

  update() {
    this.frame++;
    if (this.frame % this.speed !== 0) return;

    const head = { ...this.segments[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;

    // wrap around edges
    if (head.x < 0) head.x = this.gridCount - 1;
    if (head.x >= this.gridCount) head.x = 0;
    if (head.y < 0) head.y = this.gridCount - 1;
    if (head.y >= this.gridCount) head.y = 0;

    this.segments.unshift(head);
    if (this.growth > 0) {
      this.growth -= 1;
    } else {
      this.segments.pop();
    }
  }

  draw(ctx) {
    // iterate through each segment and pick the correct sprite
    for (let i = 0; i < this.segments.length; i++) {
      const seg = this.segments[i];
      let img;
      let rotation = 0;

      if (i === 0) {
        // head
        img = images.head[dirToKey(this.direction)];
      } else if (i === this.segments.length - 1) {
        // tail: orientation depends on previous segment
        const prev = this.segments[i - 1];
        const tailDir = { x: seg.x - prev.x, y: seg.y - prev.y };
        img = images.tail[dirToKey(tailDir)];
      } else {
        const result = getBodyImage(this.segments, i);
        img = result.img;
        rotation = result.rotation || 0;
      }

      const px = seg.x * this.cellSize;
      const py = seg.y * this.cellSize;

      if (rotation !== 0) {
        ctx.save();
        ctx.translate(px + this.cellSize / 2, py + this.cellSize / 2);
        ctx.rotate(rotation);
        ctx.drawImage(
          img,
          -this.cellSize / 2,
          -this.cellSize / 2,
          this.cellSize,
          this.cellSize
        );
        ctx.restore();
      } else {
        ctx.drawImage(
          img,
          px,
          py,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }
}
