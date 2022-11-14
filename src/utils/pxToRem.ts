export const convertPxToRem = (pixel: number) => {
  const htmlDefaultFontSize = 16;
  const oneRem = 1 / htmlDefaultFontSize;
  return pixel * oneRem;
};
