export function calculateTileCenter(
  row: number,
  col: number,
  tileSize: number
) {
  const x = col * tileSize + tileSize / 2;
  const y = row * tileSize + tileSize / 2;
  return { x, y };
}

// export function calculateBoardCenter(): { x: number; y: number } {
//   const screenWidth = this.scale.width;
//   const screenHeight = this.scale.height;

//   const x = (screenWidth - this.boardWidth) / 2; // X position to center the board
//   const y = (screenHeight - this.boardHeight) / 2; // Y position to center the board

//   return { x, y };
// }
