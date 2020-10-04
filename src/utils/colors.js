import Color from 'color';

export const black = new Color('black');
export const white = new Color('white');
export const gray = new Color('gray');

export const red = new Color('red');
export const green = new Color('green');
export const blue = new Color('blue');

export const cyan = new Color('cyan');
export const magenta = new Color('magenta');
export const yellow = new Color('yellow');

export const randomColor = () =>
  new Color(
    {
      r: Math.random() * 255,
      g: Math.random() * 255,
      b: Math.random() * 255,
    },
    'rgb'
  );

export const randomColorHex = () => randomColor().hex();

export const isValidColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
};
