import { logTileEntityGridBy } from "../common/LogUtils";
import TileEntity from "../entities/TileEntity";
import GameScene, { GameConfig } from "../scenes/GameScene";

export function shiftTilesUp(gameScene: GameScene) {
  for (let row = 1; row < gameScene.boardRows; row++) {
    for (let col = 0; col < gameScene.boardCols; col++) {
      shiftTileUpIfPossible(row, col, gameScene);
    }
  }
  logTileEntityGridBy("isEmpty", gameScene.tileEntityGrid, "After Shifting Up");
}

export function shiftTileUpIfPossible(row, col, gameScene: GameScene) {
  const tileEntityGrid = gameScene.tileEntityGrid;
  const currentTile = tileEntityGrid[row][col];
  if (!currentTile.isEmpty) {
    let emptyTilesCount = countEmptyTilesAbove(row, col, tileEntityGrid);
    if (emptyTilesCount > 0) {
      animateTileShiftUp(row, col, gameScene, emptyTilesCount);
      [tileEntityGrid[row - emptyTilesCount][col], tileEntityGrid[row][col]] = [
        tileEntityGrid[row][col],
        tileEntityGrid[row - emptyTilesCount][col],
      ];
    }
  }
}

function animateTileShiftUp(row, col, gameScene: GameScene, emptyTilesAbove) {
  gameScene.tweens.add({
    targets: gameScene.tileEntityGrid[row][col].sprite,
    y:
      gameScene.tileEntityGrid[row][col].sprite.y -
      emptyTilesAbove * gameScene.tileSize,
    duration: gameScene.shfitSpeed * emptyTilesAbove,
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
