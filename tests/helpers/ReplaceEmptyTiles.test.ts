import { calculateTileCenter } from "../../src/helpers/PositionUtils";
import { replaceEmptyTilesInColumns } from "../../src/helpers/ReplaceEmtpyTiles";
import { createMockGameConfig } from "../common/MockData";

describe("Replace Empty tiles", () => {
  it("should replace empty tiles from bottom with tiles at last row are empty", () => {
    const gameConfig = createMockGameConfig();
    gameConfig.tileEntityGrid[gameConfig.boardRows - 1].forEach(
      (tile) => (tile.isEmpty = true)
    );

    replaceEmptyTilesInColumns(gameConfig);

    gameConfig.tileEntityGrid[gameConfig.boardRows - 1].forEach((tile) =>
      expect(tile.isEmpty).toBeFalsy()
    );

    gameConfig.tileEntityGrid[gameConfig.boardRows - 1].forEach((tile, col) => {
      const { x, y } = calculateTileCenter(
        gameConfig.boardRows - 1,
        col,
        gameConfig.tileSize
      );
      expect(tile.x).toEqual(x);
      expect(gameConfig.scene.tweens.add).toHaveBeenNthCalledWith(col + 1, {
        targets: tile.sprite,
        duration: 100,
        y,
        onComplete: expect.any(Function),
      });
    });

    expect(gameConfig.scene.tweens.add).toHaveBeenCalledTimes(6);
  });

  it("should replace empty tiles from bottom with tiles at first column are emtpy", () => {
    const gameConfig = createMockGameConfig();
    gameConfig.tileEntityGrid.forEach((row) => {
      row[0].isEmpty = true;
    });

    replaceEmptyTilesInColumns(gameConfig);

    gameConfig.tileEntityGrid.forEach((row, index) => {
      const tile = row[0];
      expect(row[0].isEmpty).toBeFalsy();
      const { x, y } = calculateTileCenter(index, 0, gameConfig.tileSize);
      expect(tile.x).toEqual(x);
      expect(gameConfig.scene.tweens.add).toHaveBeenNthCalledWith(index + 1, {
        targets: tile.sprite,
        duration: 100 * (index + 1),
        y,
        onComplete: expect.any(Function),
      });
    });

    expect(gameConfig.scene.tweens.add).toHaveBeenCalledTimes(6);
  });

  it("should replace empty tiles from bottom with tiles at last column are emtpy", () => {
    const gameConfig = createMockGameConfig();

    gameConfig.tileEntityGrid.forEach((row) => {
      row[gameConfig.boardRows - 1].isEmpty = true;
    });

    replaceEmptyTilesInColumns(gameConfig);

    gameConfig.tileEntityGrid.forEach((row) => {
      expect(row[0].isEmpty).toBeFalsy();
    });

    gameConfig.tileEntityGrid.forEach((row, index) => {
      const tile = row[gameConfig.boardRows - 1];
      expect(row[gameConfig.boardRows - 1].isEmpty).toBeFalsy();
      const { x, y } = calculateTileCenter(index, 5, gameConfig.tileSize);
      expect(tile.x).toEqual(x);
      expect(gameConfig.scene.tweens.add).toHaveBeenNthCalledWith(index + 1, {
        targets: tile.sprite,
        duration: 100 * (index + 1),
        y,
        onComplete: expect.any(Function),
      });
    });

    expect(gameConfig.scene.tweens.add).toHaveBeenCalledTimes(6);
  });

  it("should replace empty tiles from bottom with tiles at every column are emtpy", () => {
    const gameConfig = createMockGameConfig();
    gameConfig.tileEntityGrid.forEach((row) => {
      row.forEach((tile) => (tile.isEmpty = true));
    });

    replaceEmptyTilesInColumns(gameConfig);

    gameConfig.tileEntityGrid.forEach((row) => {
      row.forEach((tile) => expect(tile.isEmpty).toBeFalsy());
    });

    expect(gameConfig.scene.tweens.add).toHaveBeenCalledTimes(36);
  });

  it("should not replace empty tiles that not from bottom", () => {
    const gameConfig = createMockGameConfig();
    gameConfig.tileEntityGrid[1].forEach((tile) => (tile.isEmpty = true));

    replaceEmptyTilesInColumns(gameConfig);

    gameConfig.tileEntityGrid[1].forEach((tile) =>
      expect(tile.isEmpty).toBeTruthy()
    );

    expect(gameConfig.scene.tweens.add).toHaveBeenCalledTimes(0);
  });
});
