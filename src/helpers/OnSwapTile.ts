import TileEntity from "../entities/TileEntity";
import { GameConfig } from "../scenes/GameScene";
import { destoryMatches } from "./DestoryMatches";
import { findTileIndicesByPosition } from "./FindTile";
import { hasMatchesInBoard } from "./HasMatch";
import { markMatches } from "./MarkMatches";
import swapTile from "./SwapTile";

export function onSwapTile(pointer: Phaser.Input.Pointer) {
  if (this.gameConfig.selectedTile == null) return;

  const sourceTileIndices = findTileIndicesByPosition(
    this.gameConfig.selectedTile.sprite.x,
    this.gameConfig.selectedTile.sprite.y,
    this.gameConfig.tileSize,
    this.gameConfig.boardRows,
    this.gameConfig.boardCols
  );

  const deltaX = pointer.x - this.gameConfig.selectedTile.sprite.x;
  const deltaY = pointer.y - this.gameConfig.selectedTile.sprite.y;
  const distanceThreshold = 50;

  if (
    Math.abs(deltaX) > distanceThreshold ||
    Math.abs(deltaY) > distanceThreshold
  ) {
    const direction = determineDirection(deltaX, deltaY);
    if (direction) {
      const { sourceTile, destinationTile } = swapTile(
        sourceTileIndices,
        direction,
        this.gameConfig.tileEntityGrid
      );
      if (sourceTile && destinationTile) {
        animateSwappedTile(sourceTile, destinationTile, this.gameConfig);
      }
    }
  }
}

export function determineDirection(
  deltaX: number,
  deltaY: number
): string | null {
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? "right" : "left";
  } else {
    return deltaY > 0 ? "down" : "up";
  }
}

export function animateSwappedTile(
  sourceTile: TileEntity,
  destinationTile: TileEntity,
  gameConfig: GameConfig
) {
  const sourceSpriteX = sourceTile.sprite.x;
  const sourceSpriteY = sourceTile.sprite.y;

  gameConfig.scene.tweens.add({
    targets: sourceTile.sprite,
    x: destinationTile.sprite.x,
    y: destinationTile.sprite.y,
    duration: gameConfig.swapSpeed,
  } as any);

  gameConfig.scene.tweens.add({
    targets: destinationTile.sprite,
    x: sourceSpriteX,
    y: sourceSpriteY,
    duration: gameConfig.swapSpeed,
    onComplete: () => {
      if (hasMatchesInBoard(gameConfig.tileEntityGrid)) {
        markMatches(gameConfig);
        destoryMatches(gameConfig);
      }
    },
  } as any);
}
