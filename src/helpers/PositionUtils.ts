export function calculateTileCenter(
  row: number,
  col: number,
  tileSize: number,
  boardX: number,
  boardY: number
) {
  const x = col * tileSize + tileSize / 2 + boardX;
  const y = row * tileSize + tileSize / 2 + boardY;
  return { x, y };
}

export function calculateBoardCenter(
  screenWidth: number,
  screenHeight,
  boardWidth: number,
  boardHeight: number
): { x: number; y: number } {
  const x = (screenWidth - boardWidth) / 2; // X position to center the board
  const y = (screenHeight - boardHeight) / 2; // Y position to center the board

  return { x, y };
}
