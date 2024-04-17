import {
  countEmptyTilesAbove,
  shiftTileUpIfPossible,
  shiftTilesUp,
} from "../../src/helpers/ShiftTileUp";
import {
  createMockGameScene,
  createMockTileEntityGrid,
} from "../common/MockData";

describe("Shift Tiles", () => {
  describe("check empty tiles above", () => {
    it("shoud return the number of empty tiles above", () => {
      const grid = createMockTileEntityGrid();
      grid[0][0].isEmpty = true;
      grid[1][0].isEmpty = true;
      var actual = countEmptyTilesAbove(2, 0, grid);

      expect(actual).toEqual(2);
    });

    it("shoud return 0 when tile is at the first row", () => {
      const grid = createMockTileEntityGrid();

      var actual = countEmptyTilesAbove(0, 0, grid);

      expect(actual).toEqual(0);
    });
  });

  describe("Shift a tile if possible", () => {
    it("should shfit tile up to the farthest empty tile in current column", () => {
      const gameScene = createMockGameScene();
      const grid = gameScene.tileEntityGrid;
      const expectTile = grid[2][0];
      const farthestEmtpyTile = grid[0][0];
      grid[0][0].isEmpty = true;
      grid[1][0].isEmpty = true;

      shiftTileUpIfPossible(2, 0, gameScene);
      expect(grid[0][0]).toEqual(expectTile);
      expect(grid[0][0].isEmpty).toBeFalsy();
      expect(grid[2][0]).toEqual(farthestEmtpyTile);
      expect(grid[2][0]).toBeTruthy();
    });

    it("should not shift empty tile", () => {
      const gameScene = createMockGameScene();
      const grid = gameScene.tileEntityGrid;
      const expectTile = grid[2][0];
      grid[2][0].isEmpty = true;

      shiftTileUpIfPossible(2, 0, gameScene);
      expect(grid[2][0]).toEqual(expectTile);
      expect(grid[2][0].isEmpty).toBeTruthy();
    });
  });

  /**
   * TODO: Add more test cases to cover more scenarios
   * 1. more than one emtpy tiles in a column
   * 2. no emtpy tile
   */
  describe("Shift tiles", () => {
    it("should shift tiles with one empty tile in a column", () => {
      const gameConfig = createMockGameScene();
      const grid = gameConfig.tileEntityGrid;
      grid[0][0].isEmpty = true;
      const expectTileA = grid[1][0];

      grid[0][1].isEmpty = true;
      const expectTileB = grid[1][1];

      shiftTilesUp(gameConfig);

      expect(grid[0][0].isEmpty).toBeFalsy();
      expect(grid[0][0]).toEqual(expectTileA);

      expect(grid[0][1].isEmpty).toBeFalsy();
      expect(grid[0][1]).toEqual(expectTileB);
    });
  });
});
