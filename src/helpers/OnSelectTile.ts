import GameScene from "../scenes/GameScene";

export function onSelectTile(this: GameScene, pointer: Phaser.Input.Pointer) {
  if (this.canSelectTile) {
    this.canSwapTile = true;
    const startX = pointer.x;
    const startY = pointer.y;
    const tileIndices = findTileIndicesByPosition(
      startX,
      startY,
      this.tileSize,
      this.boardRows,
      this.boardCols,
      this.boardEntity.x,
      this.boardEntity.y
    );
    if (tileIndices) {
      this.selectedTile = this.tileEntityGrid[tileIndices.row][tileIndices.col];
    }
  }
}

/**
 * Finds the row and column indices of a tile based on its position within a grid.
 * @param pointerX The x-coordinate of the position.
 * @param pointerY The y-coordinate of the position.
 * @param tileSize The size of each tile.
 * @param rows The total number of rows in the grid.
 * @param cols The total number of columns in the grid.
 * @param boardTopLeftX The x-coordinate of the top-left corner of the grid.
 * @param boardTopLeftY The y-coordinate of the top-left corner of the grid.
 * @returns An object containing the row and column indices of the tile, or null if the position is out of bounds.
 */
export function findTileIndicesByPosition(
  pointerX: number,
  pointerY: number,
  tileSize: number,
  rows: number,
  cols: number,
  boardTopLeftX: number,
  boardTopLeftY: number
) {
  // Calculate the position of the bottom-right corner of the board
  const boardBottomRightX = boardTopLeftX + cols * tileSize;
  const boardBottomRightY = boardTopLeftY + rows * tileSize;

  // Check if the pointer is outside the board boundaries
  if (
    pointerX < boardTopLeftX ||
    pointerX > boardBottomRightX ||
    pointerY < boardTopLeftY ||
    pointerY > boardBottomRightY
  ) {
    return null;
  }

  // Calculate the row and column indices based on the pointer position
  const row = Math.floor((pointerY - boardTopLeftY) / tileSize);
  const col = Math.floor((pointerX - boardTopLeftX) / tileSize);

  // Check if the calculated indices are within the valid range
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return null;
  }

  return { row, col };
}
