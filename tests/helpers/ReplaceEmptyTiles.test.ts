import { calculateTileCenter } from "../../src/helpers/PositionUtils";
import { replaceEmptyTilesInColumns } from "../../src/helpers/ReplaceEmtpyTiles";
import { createMockGameScene } from "../common/MockData";

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
        gameScene.tileSize
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
      const { x, y } = calculateTileCenter(index, 0, gameScene.tileSize);
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
      const { x, y } = calculateTileCenter(index, 5, gameScene.tileSize);
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
});
