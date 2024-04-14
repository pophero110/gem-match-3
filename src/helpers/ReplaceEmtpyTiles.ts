import { log, logSprites, logTileEntityGridBy } from "../common/LogUtils";
import TileEntity from "../entities/TileEntity";
import { GameConfig } from "../scenes/GameScene";
import { destoryMatches } from "./DestoryMatches";
import { hasMatchesInBoard } from "./HasMatch";
import { markMatches } from "./MarkMatches";
import { calculateTileCenter } from "./PositionUtils";

/**
 * Replace the empty tiles in each column of the game board grid from bottom to top
 * Empty spaces in each column are filled from bottom to top with new tiles.
 *
 * @param gameConfig The game configuration object containing the board grid and tile size.
 */
export function replaceEmptyTilesInColumns(gameConfig: GameConfig) {
  let replacedCount = 0;
  // Loop through the last row
  gameConfig.tileEntityGrid[gameConfig.boardRows - 1].forEach((_, col) => {
    let emptyTileCount = countEmptyTileInCol(col, gameConfig.tileEntityGrid);
    if (emptyTileCount > 0) {
      for (let i = 0; i < emptyTileCount; i++) {
        replacedCount++;

        // Get tile starting position
        const { x: startX, y: startY } = calculateTileCenter(
          gameConfig.boardRows,
          col,
          gameConfig.tileSize
        );

        const row = gameConfig.boardRows - emptyTileCount + i;

        const newTileEntity = new TileEntity(
          gameConfig.scene,
          startX,
          startY + i * gameConfig.tileSize,
          gameConfig.tileSize
        );

        gameConfig.tileEntityGrid[row][col] = newTileEntity;

        const endY = startY - (emptyTileCount - i) * gameConfig.tileSize;
        const duration = gameConfig.shfitSpeed * (i + 1);
        animateTileShiftUp(newTileEntity, gameConfig, endY, duration);
      }
    }
  });

  logTileEntityGridBy(
    "isEmpty",
    gameConfig.tileEntityGrid,
    "After Replace Empty Tiles: isEmpty"
  );

  function animateTileShiftUp(tileEntity, gameConfig, y, duration) {
    gameConfig.scene.tweens.add({
      targets: tileEntity.sprite,
      y,
      duration,
      onComplete: () => {
        replacedCount--;
        if (replacedCount == 0) {
          if (hasMatchesInBoard(gameConfig.tileEntityGrid)) {
            gameConfig.scene.time.addEvent({
              delay: 250,
              callback: () => {
                markMatches(gameConfig);
                destoryMatches(gameConfig);
              },
            });
          }
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
