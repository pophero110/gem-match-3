const boardRows = 6;
const tileEntityGrid = [];
export function findEmptyTilesAbove(row, col) {
  let result = 0;
  for (let i = boardRows; i > row + 1; i--) {
    if (tileEntityGrid[i][col].isEmpty) {
      result++;
    }
  }
  return result;
}
