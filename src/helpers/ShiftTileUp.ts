import { logTileEntityGridBy } from "../common/LogUtils";
import TileEntity from "../entities/TileEntity";
import { GameConfig } from "../scenes/GameScene";

export function shiftTilesUp(gameConfig: GameConfig) {
  for (let row = 1; row < gameConfig.boardRows; row++) {
    for (let col = 0; col < gameConfig.boardCols; col++) {
      shiftTileUpIfPossible(row, col, gameConfig);
    }
  }
  logTileEntityGridBy(
    "isEmpty",
    gameConfig.tileEntityGrid,
    "After Shifting Up"
  );
}

export function shiftTileUpIfPossible(row, col, gameConfig: GameConfig) {
  const tileEntityGrid = gameConfig.tileEntityGrid;
  const currentTile = tileEntityGrid[row][col];
  if (!currentTile.isEmpty) {
    let emptyTilesCount = countEmptyTilesAbove(row, col, tileEntityGrid);
    if (emptyTilesCount > 0) {
      animateTileShiftUp(row, col, gameConfig, emptyTilesCount);
      [tileEntityGrid[row - emptyTilesCount][col], tileEntityGrid[row][col]] = [
        tileEntityGrid[row][col],
        tileEntityGrid[row - emptyTilesCount][col],
      ];
    }
  }
}

function animateTileShiftUp(row, col, gameConfig: GameConfig, emptyTilesAbove) {
  gameConfig.scene.tweens.add({
    targets: gameConfig.tileEntityGrid[row][col].sprite,
    y:
      gameConfig.tileEntityGrid[row][col].sprite.y -
      emptyTilesAbove * gameConfig.tileSize,
    duration: gameConfig.shfitSpeed * emptyTilesAbove,
  } as any);
}

export function countEmptyTilesAbove(row, col, tileEntityGrid: TileEntity[][]) {
  let emptyTileCount = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (tileEntityGrid[i][col].isEmpty) {
      emptyTileCount++;
    }
  }
  return emptyTileCount;
}
