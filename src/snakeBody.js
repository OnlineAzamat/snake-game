import { images } from './assets.js';

// Determine the appropriate body sprite for a segment that is neither head nor tail.
// returns an object containing the image plus the relative direction vectors so that
// the caller can decide whether a rotation is needed.
export function getBodyImage(segments, index) {
  const prev = segments[index - 1];
  const curr = segments[index];
  const next = segments[index + 1];

  // direction vectors from previous segment toward current, and from current toward next
  const dirPrev = { x: curr.x - prev.x, y: curr.y - prev.y };
  const dirNext = { x: next.x - curr.x, y: next.y - curr.y };

  // straight lines (both neighbours are in the same column -> vertical, same row -> horizontal)
  if (dirPrev.x === 0 && dirNext.x === 0) {
    return { img: images.body.vertical, dirPrev, dirNext, rotation: 0 };
  }
  if (dirPrev.y === 0 && dirNext.y === 0) {
    return { img: images.body.horizontal, dirPrev, dirNext, rotation: 0 };
  }

  // turns: determine which corner based on combination of directions
  // the PNG files themselves are rotated 90° relative to the way we compute
  // the vectors, so later we will apply an extra quarter‑turn in the drawing code.
  const turnRotation = Math.PI / 2; // constant 90° adjustment for every corner image
  if (
    (dirPrev.x === 0 && dirPrev.y === -1 && dirNext.x === -1 && dirNext.y === 0) ||
    (dirPrev.x === -1 && dirPrev.y === 0 && dirNext.x === 0 && dirNext.y === -1)
  ) {
    return { img: images.body.topleft, dirPrev, dirNext, rotation: turnRotation };
  }
  if (
    (dirPrev.x === 0 && dirPrev.y === -1 && dirNext.x === 1 && dirNext.y === 0) ||
    (dirPrev.x === 1 && dirPrev.y === 0 && dirNext.x === 0 && dirNext.y === -1)
  ) {
    return { img: images.body.topright, dirPrev, dirNext, rotation: turnRotation };
  }
  if (
    (dirPrev.x === 0 && dirPrev.y === 1 && dirNext.x === -1 && dirNext.y === 0) ||
    (dirPrev.x === -1 && dirPrev.y === 0 && dirNext.x === 0 && dirNext.y === 1)
  ) {
    return { img: images.body.bottomleft, dirPrev, dirNext, rotation: turnRotation };
  }
  if (
    (dirPrev.x === 0 && dirPrev.y === 1 && dirNext.x === 1 && dirNext.y === 0) ||
    (dirPrev.x === 1 && dirPrev.y === 0 && dirNext.x === 0 && dirNext.y === 1)
  ) {
    return { img: images.body.bottomright, dirPrev, dirNext, rotation: turnRotation };
  }

  // fallback to horizontal if something unexpected happens
  return { img: images.body.horizontal, dirPrev, dirNext, rotation: 0 };
}
