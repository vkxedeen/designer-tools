export const degreesToRads = (deg: number): number => Math.PI * deg / 180;

export const getRotated = (
  x: number,
  y: number,
  axisX: number,
  axisY: number,
  angle: number,
): { x: number, y: number } => {
  const rotationInRads = degreesToRads(angle);
  const sin = Math.sin(rotationInRads);
  const cos = Math.cos(rotationInRads);
  const xFromCenter = x - axisX;
  const yFromCenter = y - axisY;

  return ({
    x: xFromCenter * cos - yFromCenter * sin + axisX,
    y: xFromCenter * sin + yFromCenter * cos + axisY,
  });
}

export const getScaled = (
  x: number,
  y: number,
  shapeX: number,
  shapeY: number,
  scale: number,
): { x: number, y: number } => {
  return ({
    x: shapeX + (x - shapeX) * scale,
    y: shapeY + (y - shapeY) * scale,
  });
}

export const getSquareCenter = (
  squareX: number,
  squareY: number,
  size: number,
  rotation: number,
): { x: number, y: number } => {
  const FORTY_FIVE_DEGREES = 45;

  const diagonalAngle = degreesToRads(FORTY_FIVE_DEGREES + rotation);
  const diagonalHalf = size * Math.sqrt(2) / 2;

  return ({
    x: diagonalHalf * Math.cos(diagonalAngle) + squareX,
    y: diagonalHalf * Math.sin(diagonalAngle) + squareY,
  });
};
