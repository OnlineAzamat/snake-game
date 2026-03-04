// new file: asset loading
function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export const images = {
  head: {
    up: loadImage('assets/head_up.png'),
    down: loadImage('assets/head_down.png'),
    left: loadImage('assets/head_left.png'),
    right: loadImage('assets/head_right.png'),
  },
  body: {
    horizontal: loadImage('assets/body_horizontal.png'),
    vertical: loadImage('assets/body_vertical.png'),
    topleft: loadImage('assets/body_topleft.png'),
    topright: loadImage('assets/body_topright.png'),
    bottomleft: loadImage('assets/body_bottomleft.png'),
    bottomright: loadImage('assets/body_bottomright.png'),
  },
  tail: {
    up: loadImage('assets/tail_up.png'),
    down: loadImage('assets/tail_down.png'),
    left: loadImage('assets/tail_left.png'),
    right: loadImage('assets/tail_right.png'),
  },
  apple: loadImage('assets/apple.png'),
  background: loadImage('assets/background1.png'),
  backgroundSm: loadImage('assets/background1-sm.png'),
};
