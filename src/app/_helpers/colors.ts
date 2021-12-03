import tinycolor from "tinycolor2";

export const rgbToHex = (color) => tinycolor.fromRatio(color).toHexString();
export const hexToRgba = (color) => tinycolor(color).toRgb();


export const rgbToRgba = (color, alpha):any => {
  const rgb = tinycolor.fromRatio(color);

  return {
    // @ts-ignore
    r: rgb._r, g: rgb._g, b: rgb._b, a: alpha,
  }
}

export const rgbaToFigma = (color) => {
  return {
    r: parseFloat((color.r/255).toFixed(17)),
    g: parseFloat((color.g/255).toFixed(17)),
    b: parseFloat((color.b/255).toFixed(17)),
    a: color.a,
  }
}
