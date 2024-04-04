import TileEntity from "../entities/TileEntity";

export default function handleSwapTile(
  sourceTile: TileEntity,
  destinationTile: TileEntity,
  tileEntityGrid: TileEntity[][]
): void {
  // Swap the index in the grid
  [sourceTile.row, destinationTile.row] = [destinationTile.row, sourceTile.row];
  [sourceTile.col, destinationTile.col] = [destinationTile.col, sourceTile.col];
  [
    tileEntityGrid[sourceTile.row][sourceTile.col],
    tileEntityGrid[destinationTile.row][destinationTile.col],
  ] = [sourceTile, destinationTile];

  // Swap the position on the board
  [sourceTile.x, destinationTile.x] = [destinationTile.x, sourceTile.x];
  [sourceTile.y, destinationTile.y] = [destinationTile.y, sourceTile.y];
}
