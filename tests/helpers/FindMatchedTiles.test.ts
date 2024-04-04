import TileEntity from "../../src/entities/TileEntity";
import { findMatchedTiles } from "../../src/helpers/FindMatchedTiles";
import { createMockTileEntityGridFromPattern } from "../common/MockData";

describe("findMatchedTiles", () => {
  it("should return an empty array when no matches are found", () => {
    const pattern: number[][] = [
      [0, 1, 2, 3],
      [1, 2, 3, 0],
      [2, 3, 0, 1],
      [3, 0, 1, 2],
    ];
    const tileEntityGrid: TileEntity[][] =
      createMockTileEntityGridFromPattern(pattern);

    const result = findMatchedTiles(tileEntityGrid);
    expect(result).toEqual([]);
  });

  it("should correctly find horizontal matches", () => {
    const pattern: number[][] = [
      [1, 1, 1, 3],
      [1, 2, 3, 0],
      [2, 3, 0, 1],
      [3, 0, 1, 2],
    ];
    const tileEntityGrid: TileEntity[][] =
      createMockTileEntityGridFromPattern(pattern);

    const result = findMatchedTiles(tileEntityGrid);
    expect(result).toEqual([
      [tileEntityGrid[0][0], tileEntityGrid[0][1], tileEntityGrid[0][2]],
    ]);
  });

  it("should correctly find vertical matches", () => {
    const pattern: number[][] = [
      [1, 1, 0, 3],
      [1, 2, 3, 0],
      [1, 3, 0, 1],
      [3, 0, 1, 2],
    ];
    const tileEntityGrid: TileEntity[][] =
      createMockTileEntityGridFromPattern(pattern);

    const result = findMatchedTiles(tileEntityGrid);
    expect(result).toEqual([
      [tileEntityGrid[0][0], tileEntityGrid[1][0], tileEntityGrid[2][0]],
    ]);
  });

  it("should find both horizontal and vertical matches", () => {
    const pattern: number[][] = [
      [1, 1, 1, 3],
      [1, 2, 3, 0],
      [1, 3, 0, 1],
      [3, 0, 1, 2],
    ];
    const tileEntityGrid: TileEntity[][] =
      createMockTileEntityGridFromPattern(pattern);

    const result = findMatchedTiles(tileEntityGrid);
    expect(result).toEqual([
      [tileEntityGrid[0][0], tileEntityGrid[0][1], tileEntityGrid[0][2]],
      [tileEntityGrid[0][0], tileEntityGrid[1][0], tileEntityGrid[2][0]],
    ]);
  });
});
