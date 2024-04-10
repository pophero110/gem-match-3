import TileEntity from "../entities/TileEntity";

export function findMatches(tileEntityGrid: TileEntity[][]): TileEntity[][] {
  const matchedTiles: TileEntity[][] = [];

  const rows = tileEntityGrid.length;
  const cols = tileEntityGrid[0].length;

  // Check horizontal matches
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols - 2; col++) {
      const currentTile = tileEntityGrid[row][col];
      const nextTile1 = tileEntityGrid[row][col + 1];
      const nextTile2 = tileEntityGrid[row][col + 2];

      if (
        currentTile.type === nextTile1.type &&
        currentTile.type === nextTile2.type
      ) {
        matchedTiles.push([currentTile, nextTile1, nextTile2]);
      }
    }
  }

  // Check vertical matches
  for (let row = 0; row < rows - 2; row++) {
    for (let col = 0; col < cols; col++) {
      const currentTile = tileEntityGrid[row][col];
      const belowTile1 = tileEntityGrid[row + 1][col];
      const belowTile2 = tileEntityGrid[row + 2][col];

      if (
        currentTile.type === belowTile1.type &&
        currentTile.type === belowTile2.type
      ) {
        matchedTiles.push([currentTile, belowTile1, belowTile2]);
      }
    }
  }

  return matchedTiles;
}
