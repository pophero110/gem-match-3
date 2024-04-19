import { logTileEntityGridBy } from "../common/LogUtils";
import TileEntity from "../entities/TileEntity";
import GameScene from "../scenes/GameScene";
import handleMatches from "./HandleMatches";
import { calculateTileCenter } from "./PositionUtils";

/**
 * Replace the empty tiles in each column of the game board grid from bottom to top
 * Empty spaces in each column are filled from bottom to top with new tiles.
 *
 * @param gameScene The game configuration object containing the board grid and tile size.
 */
export function replaceEmptyTilesInColumns(gameScene: GameScene) {
  let replacedCount = 0;
  // Loop through the last row
  gameScene.tileEntityGrid[gameScene.boardRows - 1].forEach((_, col) => {
    let emptyTileCount = countEmptyTileInCol(col, gameScene.tileEntityGrid);
    if (emptyTileCount > 0) {
      for (let i = 0; i < emptyTileCount; i++) {
        replacedCount++;

        // Get tile starting position
        const { x: startX, y: startY } = calculateTileCenter(
          gameScene.boardRows,
          col,
          gameScene.tileSize,
          gameScene.boardEntity.x,
          gameScene.boardEntity.y
        );

        const row = gameScene.boardRows - emptyTileCount + i;

        const newTileEntity = new TileEntity(
          gameScene,
          startX,
          startY + i * gameScene.tileSize,
          100
        );

        gameScene.tileEntityGrid[row][col] = newTileEntity;

        const endY = startY - (emptyTileCount - i) * gameScene.tileSize;
        const duration = gameScene.shfitSpeed * (i + 1);
        animateTileShiftUp(newTileEntity, gameScene, endY, duration);
      }
    }
  });

  logTileEntityGridBy(
    "isEmpty",
    gameScene.tileEntityGrid,
    "After Replace Empty Tiles: isEmpty"
  );

  function animateTileShiftUp(tileEntity, gameScene: GameScene, y, duration) {
    gameScene.tweens.add({
      targets: tileEntity.sprite,
      y,
      duration,
      onComplete: () => {
        replacedCount--;
        if (replacedCount == 0) {
          gameScene.time.addEvent({
            delay: 250,
            callback: () => handleMatches(gameScene),
          });
        }
      },
    } as any);
  }
}

export function countEmptyTileInCol(col, tileEntityGrid: TileEntity[][]) {
  var count = 0;
  // if tile is empty at last row and col, return 0
  if (!tileEntityGrid[tileEntityGrid.length - 1][col].isEmpty) return count;
  for (let row = 0; row < tileEntityGrid.length; row++) {
    if (tileEntityGrid[row][col].isEmpty) {
      count++;
    }
  }
  return count;
}
