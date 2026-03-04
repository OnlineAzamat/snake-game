// convert a unit direction vector ({x: -1|0|1, y: -1|0|1}) to key used by images
export function dirToKey(dir) {
  if (dir.x === 1) return 'right';
  if (dir.x === -1) return 'left';
  if (dir.y === 1) return 'down';
  if (dir.y === -1) return 'up';
  return 'right';
}
