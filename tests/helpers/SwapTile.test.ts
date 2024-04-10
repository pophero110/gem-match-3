import { createMockTileEntityGrid } from "../../tests/common/MockData";
import swapTile from "../../src/helpers/SwapTile";
import TileEntity from "../../src/entities/TileEntity";

describe("swapTile", () => {
  let tileEntityGrid: TileEntity[][];

  beforeEach(() => {
    // Create a fresh mock tile entity grid before each test
    tileEntityGrid = createMockTileEntityGrid();
  });

  // Test swapping tiles in the up direction
  it("should swap tiles in up direction", () => {
    // Define source and destination tile indices
    const sourceTileIndices = { row: 1, col: 1 };
    const destinationTileIndices = { row: 0, col: 1 };

    // Retrieve source and destination tiles
    const sourceTile =
      tileEntityGrid[sourceTileIndices.row][sourceTileIndices.col];
    const destinationTile =
      tileEntityGrid[destinationTileIndices.row][destinationTileIndices.col];

    // Act
    const actual = swapTile(sourceTileIndices, "up", tileEntityGrid);

    // Assert that tiles are swapped correctly
    expect(tileEntityGrid[1][1]).toBe(destinationTile); // Destination tile moved to source position
    expect(tileEntityGrid[0][1]).toBe(sourceTile); // Source tile moved to destination position
    expect(actual).toBeDefined();
    expect(actual.sourceTile).toEqual(sourceTile);
    expect(actual.destinationTile).toEqual(destinationTile);
  });

  // Test swapping tiles in the left direction
  it("should swap tiles in left direction", () => {
    // Define source and destination tile indices
    const sourceTileIndices = { row: 0, col: 1 };
    const destinationTileIndices = { row: 0, col: 0 };

    // Retrieve source and destination tiles
    const sourceTile =
      tileEntityGrid[sourceTileIndices.row][sourceTileIndices.col];
    const destinationTile =
      tileEntityGrid[destinationTileIndices.row][destinationTileIndices.col];

    const actual = swapTile(sourceTileIndices, "left", tileEntityGrid);

    // Assert that tiles are swapped correctly
    expect(tileEntityGrid[0][1]).toBe(destinationTile); // Destination tile moved to source position
    expect(tileEntityGrid[0][0]).toBe(sourceTile); // Source tile moved to destination position
    expect(actual).toBeDefined();
    expect(actual.sourceTile).toEqual(sourceTile);
    expect(actual.destinationTile).toEqual(destinationTile);
  });

  it("should swap tiles in right direction", () => {
    // Define source and destination tile indices
    const sourceTileIndices = { row: 0, col: 0 };
    const destinationTileIndices = { row: 0, col: 1 };

    // Retrieve source and destination tiles
    const sourceTile =
      tileEntityGrid[sourceTileIndices.row][sourceTileIndices.col];
    const destinationTile =
      tileEntityGrid[destinationTileIndices.row][destinationTileIndices.col];

    const actual = swapTile(sourceTileIndices, "right", tileEntityGrid);

    // Assert that tiles are swapped correctly
    expect(tileEntityGrid[0][0]).toBe(destinationTile); // Destination tile moved to source position
    expect(tileEntityGrid[0][1]).toBe(sourceTile); // Source tile moved to destination position
    expect(actual).toBeDefined();
    expect(actual.sourceTile).toEqual(sourceTile);
    expect(actual.destinationTile).toEqual(destinationTile);
  });

  // Test swapping tiles in the down direction
  it("should swap tiles in down direction", () => {
    // Define source and destination tile indices
    const sourceTileIndices = { row: 0, col: 1 };
    const destinationTileIndices = { row: 1, col: 1 };

    // Retrieve source and destination tiles
    const sourceTile =
      tileEntityGrid[sourceTileIndices.row][sourceTileIndices.col];
    const destinationTile =
      tileEntityGrid[destinationTileIndices.row][destinationTileIndices.col];

    const actual = swapTile(sourceTileIndices, "down", tileEntityGrid);

    // Assert that tiles are swapped correctly
    expect(tileEntityGrid[0][1]).toBe(destinationTile); // Destination tile moved to source position
    expect(tileEntityGrid[1][1]).toBe(sourceTile); // Source tile moved to destination position
    expect(actual).toBeDefined();
    expect(actual.sourceTile).toEqual(sourceTile);
    expect(actual.destinationTile).toEqual(destinationTile);
  });

  it("should not swap tiles and log an error for invalid direction", () => {
    // Define source and destination tile indices
    const sourceTileIndices = { row: 0, col: 1 };

    // Call the swapTile function with an invalid direction
    const actual = swapTile(
      sourceTileIndices,
      "invalidDirection",
      tileEntityGrid
    );

    expect(actual).toBeNull();
  });
});
