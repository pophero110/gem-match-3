import { logTileEntityGridBy } from "../common/LogUtils";
import GameScene from "../scenes/GameScene";
import { replaceEmptyTilesInColumns } from "./ReplaceEmtpyTiles";
import { shiftTilesUp } from "./ShiftTileUp";

export function destoryMatches(gameScene: GameScene) {
  let destroyedCount = 0;
  gameScene.removalGrid.forEach((rows, row) =>
    rows.forEach((removalCount, col) => {
      if (removalCount > 0) {
        gameScene.removalGrid[row][col] = 0;
        destroyedCount++;
        const tileEntity = gameScene.tileEntityGrid[row][col];
        gameScene.tweens.add({
          targets: [tileEntity.sprite],
          alpha: 0.5,
          duration: gameScene.destroySpeed,
          onComplete: () => {
            destroyedCount--;
            tileEntity.sprite.visible = false;
            if (destroyedCount == 0) {
              logTileEntityGridBy(
                "isEmpty",
                gameScene.tileEntityGrid,
                "After Destory Matches"
              );
              shiftTilesUp(gameScene);
              gameScene.time.addEvent({
                delay: 250,
                callback: () => {
                  replaceEmptyTilesInColumns(gameScene);
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
