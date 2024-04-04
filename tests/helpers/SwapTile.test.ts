import swapTile from "../../src/helpers/SwapTile";
import { createMockTileEntity } from "../common/MockData";

describe("swapTile", () => {
  function createMockTileEntityGrid(rows: number, cols: number) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, createMockTileEntity)
    );
  }

  it("should swap tiles correctly", () => {
    const rows = 6;
    const cols = 6;
    const sourceTileRow = 0;
    const sourceTileCol = 0;
    const destinationTileRow = 1;
    const destinationTileCol = 1;
    const tileEntityGrid = createMockTileEntityGrid(rows, cols);

    const sourceTile = tileEntityGrid[sourceTileRow][sourceTileCol];
    sourceTile.row = sourceTileRow;
    sourceTile.col = sourceTileCol;
    const destinationTile =
      tileEntityGrid[destinationTileRow][destinationTileCol];
    destinationTile.row = destinationTileRow;
    destinationTile.col = destinationTileCol;

    const sourceTileX = sourceTile.x;
    const sourceTileY = sourceTile.y;
    const destinationTileX = destinationTile.x;
    const destinationTileY = destinationTile.y;

    // Act
    swapTile(sourceTile, destinationTile, tileEntityGrid);

    // Assert that the tiles are swapped correctly
    expect(tileEntityGrid[0][0]).toBe(destinationTile);
    expect(tileEntityGrid[1][1]).toBe(sourceTile);

    expect(sourceTile.x).toEqual(destinationTileX);
    expect(sourceTile.y).toEqual(destinationTileY);
    expect(destinationTile.x).toEqual(sourceTileX);
    expect(destinationTile.y).toEqual(sourceTileY);

    expect(sourceTile.row).toEqual(destinationTileRow);
    expect(sourceTile.col).toEqual(destinationTileCol);
    expect(destinationTile.row).toEqual(sourceTileRow);
    expect(destinationTile.col).toEqual(sourceTileCol);
  });
});
