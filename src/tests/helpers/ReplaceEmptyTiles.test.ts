import { calculateTileCenter } from "../../helpers/PositionUtils";
import { replaceEmptyTilesInColumns } from "../../helpers/ReplaceEmtpyTiles";
import {
  createMockGameScene,
  createMockTileEntityGridFromPattern,
} from "../common/MockData";

describe("Replace Empty tiles", () => {
  it("should replace empty tiles from bottom with tiles at last row are empty", () => {
    const gameScene = createMockGameScene();
    gameScene.tileEntityGrid[gameScene.boardRows - 1].forEach(
      (tile) => (tile.isEmpty = true)
    );

    replaceEmptyTilesInColumns(gameScene);

    gameScene.tileEntityGrid[gameScene.boardRows - 1].forEach((tile) =>
      expect(tile.isEmpty).toBeFalsy()
    );

    gameScene.tileEntityGrid[gameScene.boardRows - 1].forEach((tile, col) => {
      const { x, y } = calculateTileCenter(
        gameScene.boardRows - 1,
        col,
        gameScene.tileSize,
        0,
        0
      );
      expect(tile.x).toEqual(x);
      expect(gameScene.tweens.add).toHaveBeenNthCalledWith(col + 1, {
        targets: tile.sprite,
        duration: 100,
        y,
        onComplete: expect.any(Function),
      });
    });

    expect(gameScene.tweens.add).toHaveBeenCalledTimes(6);
  });

  it("should replace empty tiles from bottom with tiles at first column are emtpy", () => {
    const gameScene = createMockGameScene();
    gameScene.tileEntityGrid.forEach((row) => {
      row[0].isEmpty = true;
    });

    replaceEmptyTilesInColumns(gameScene);

    gameScene.tileEntityGrid.forEach((row, index) => {
      const tile = row[0];
      expect(row[0].isEmpty).toBeFalsy();
      const { x, y } = calculateTileCenter(index, 0, 100, 0, 0);
      expect(tile.x).toEqual(x);
      expect(gameScene.tweens.add).toHaveBeenNthCalledWith(index + 1, {
        targets: tile.sprite,
        duration: 100 * (index + 1),
        y,
        onComplete: expect.any(Function),
      });
    });

    expect(gameScene.tweens.add).toHaveBeenCalledTimes(6);
  });

  it("should replace empty tiles from bottom with tiles at last column are emtpy", () => {
    const gameScene = createMockGameScene();

    gameScene.tileEntityGrid.forEach((row) => {
      row[gameScene.boardRows - 1].isEmpty = true;
    });

    replaceEmptyTilesInColumns(gameScene);

    gameScene.tileEntityGrid.forEach((row) => {
      expect(row[0].isEmpty).toBeFalsy();
    });

    gameScene.tileEntityGrid.forEach((row, index) => {
      const tile = row[gameScene.boardRows - 1];
      expect(row[gameScene.boardRows - 1].isEmpty).toBeFalsy();
      const { x, y } = calculateTileCenter(index, 5, 100, 0, 0);
      expect(tile.x).toEqual(x);
      expect(gameScene.tweens.add).toHaveBeenNthCalledWith(index + 1, {
        targets: tile.sprite,
        duration: 100 * (index + 1),
        y,
        onComplete: expect.any(Function),
      });
    });

    expect(gameScene.tweens.add).toHaveBeenCalledTimes(6);
  });

  it("should replace empty tiles from bottom with tiles at every column are emtpy", () => {
    const gameScene = createMockGameScene();
    gameScene.tileEntityGrid.forEach((row) => {
      row.forEach((tile) => (tile.isEmpty = true));
    });

    replaceEmptyTilesInColumns(gameScene);

    gameScene.tileEntityGrid.forEach((row) => {
      row.forEach((tile) => expect(tile.isEmpty).toBeFalsy());
    });

    expect(gameScene.tweens.add).toHaveBeenCalledTimes(36);
  });

  it("should not replace empty tiles that not from bottom", () => {
    const gameScene = createMockGameScene();
    gameScene.tileEntityGrid[1].forEach((tile) => (tile.isEmpty = true));

    replaceEmptyTilesInColumns(gameScene);

    gameScene.tileEntityGrid[1].forEach((tile) =>
      expect(tile.isEmpty).toBeTruthy()
    );

    expect(gameScene.tweens.add).toHaveBeenCalledTimes(0);
  });

  describe("Toggle Tile Selection", () => {
    it("it should enable tile selection when has no match after empty tile replacement", () => {
      const gameScene = createMockGameScene();
      const tileTypePattern: number[][] = [
        [1, 3, 1, 0, 2, 0],
        [1, 0, 3, 2, 2, 0],
        [2, 3, 1, 3, 0, 3],
        [2, 2, 0, 0, 2, 2],
        [3, 1, 2, 1, 0, 0],
        [3, 2, 1, 2, 0, 0],
      ];
      const tileEntityGrid =
        createMockTileEntityGridFromPattern(tileTypePattern);
      tileEntityGrid[tileEntityGrid.length - 1][
        tileEntityGrid[0].length - 1
      ].isEmpty = true;
      gameScene.tileEntityGrid = tileEntityGrid;

      replaceEmptyTilesInColumns(gameScene);

      expect(gameScene.tweens.add).toHaveBeenCalledTimes(1);
      // expect(gameScene.canSelectTile).toBeTruthy();
    });
  });
});
