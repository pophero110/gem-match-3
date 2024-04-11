import { logTileEntityGridBy } from "../common/logTileEntityGrid";
import TileEntity from "../entities/TileEntity";
import { GameConfig } from "../scenes/GameScene";

export function shiftTilesUp(gameConfig: GameConfig) {
  logTileEntityGridBy(
    "isEmpty",
    gameConfig.tileEntityGrid,
    "Before Shifting Up"
  );
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
    let emptyTilesAbove = checkEmptyTilesAbove(row, col, tileEntityGrid);
    if (emptyTilesAbove > 0) {
      animateTileShiftUp(row, col, gameConfig, emptyTilesAbove);
      [tileEntityGrid[row - emptyTilesAbove][col], tileEntityGrid[row][col]] = [
        tileEntityGrid[row][col],
        tileEntityGrid[row - emptyTilesAbove][col],
      ];
    }
  }
}

function animateTileShiftUp(row, col, gameConfig, emptyTilesAbove) {
  gameConfig.scene.tweens.add({
    targets: gameConfig.tileEntityGrid[row][col].sprite,
    y:
      gameConfig.tileEntityGrid[row][col].sprite.y -
      emptyTilesAbove * gameConfig.tileSize,
    duration: gameConfig.shfitSpeed * emptyTilesAbove,
  } as any);
}

export function checkEmptyTilesAbove(row, col, tileEntityGrid: TileEntity[][]) {
  let result = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (tileEntityGrid[i][col].isEmpty) {
      result++;
    }
  }
  return result;
}
