/**
 * Finds the row and column indices of a tile based on its position.
 * @param x The x-coordinate of the position.
 * @param y The y-coordinate of the position.
 * @param tileWidth The width of each tile.
 * @param tileHeight The height of each tile.
 * @param rows The total number of rows in the grid.
 * @param cols The total number of columns in the grid.
 * @returns An object containing the row and column indices of the tile, or null if the position is out of bounds.
 */
export function findTileIndicesByPosition(
  x: number,
  y: number,
  tileSize: number,
  rows: number,
  cols: number
) {
  const row = Math.floor(y / tileSize);
  const col = Math.floor(x / tileSize);
  if (row >= rows || col >= cols) return null;
  return { row, col };
}
