import { logTileEntityGridBy } from "../common/LogUtils";
import { GameConfig } from "../scenes/GameScene";
import { replaceEmptyTilesInColumns } from "./ReplaceEmtpyTiles";
import { shiftTilesUp } from "./ShiftTileUp";

export function destoryMatches(gameConfig: GameConfig) {
  let destroyedCount = 0;
  gameConfig.removalGrid.forEach((rows, row) =>
    rows.forEach((removalCount, col) => {
      if (removalCount > 0) {
        gameConfig.removalGrid[row][col] = 0;
        destroyedCount++;
        const tileEntity = gameConfig.tileEntityGrid[row][col];
        gameConfig.scene.tweens.add({
          targets: [tileEntity.sprite],
          alpha: 0.5,
          duration: gameConfig.destroySpeed,
          onComplete: () => {
            destroyedCount--;
            tileEntity.sprite.visible = false;
            if (destroyedCount == 0) {
              logTileEntityGridBy(
                "isEmpty",
                gameConfig.tileEntityGrid,
                "After Destory Matches"
              );
              shiftTilesUp(gameConfig);
              gameConfig.scene.time.addEvent({
                delay: 250,
                callback: () => {
                  replaceEmptyTilesInColumns(gameConfig);
                },
              });
            }
          },
        } as any);
        tileEntity.isEmpty = true;
      }
    })
  );
}
