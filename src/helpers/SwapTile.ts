import TileEntity from "../entities/TileEntity";

export default function swapTile(
  sourceTileIndices: { row: number; col: number },
  direction: string,
  tileEntityGrid: TileEntity[][]
): { sourceTile: TileEntity; destinationTile: TileEntity } {
  const sourceTile =
    tileEntityGrid[sourceTileIndices.row][sourceTileIndices.col];

  // Find destination tile indices
  const destinationTileIndices = findDestinationTileIndices();

  if (destinationTileIndices == null) return null;

  // Access destination tile using destinationTileIndices
  const destinationTile =
    tileEntityGrid[destinationTileIndices.row][destinationTileIndices.col];

  // Swap the source tile and destination tile in the grid (Data)
  [
    tileEntityGrid[sourceTileIndices.row][sourceTileIndices.col],
    tileEntityGrid[destinationTileIndices.row][destinationTileIndices.col],
  ] = [destinationTile, sourceTile];

  return { sourceTile, destinationTile };

  function findDestinationTileIndices() {
    let destRow = sourceTileIndices.row;
    let destCol = sourceTileIndices.col;
    switch (direction) {
      case "up":
        destRow--;
        break;
      case "down":
        destRow++;
        break;
      case "left":
        destCol--;
        break;
      case "right":
        destCol++;
        break;
      default:
        return null;
    }

    // Check if the destination indices are within the grid bounds
    if (
      destRow >= 0 &&
      destRow < tileEntityGrid.length &&
      destCol >= 0 &&
      destCol < tileEntityGrid[destRow].length
    ) {
      return { row: destRow, col: destCol };
    } else {
      return null;
    }
  }
}
