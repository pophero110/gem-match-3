import GameScene from "../scenes/GameScene";
import { findTileIndicesByPosition } from "./FindTile";

export function onSelectTile(this: GameScene, pointer: Phaser.Input.Pointer) {
  if (this.canSelectTile) {
    this.canSwapTile = true;
    const startX = pointer.x;
    const startY = pointer.y;
    const tileIndices = findTileIndicesByPosition(
      startX,
      startY,
      this.tileSize,
      this.boardRows,
      this.boardCols
    );
    if (tileIndices) {
      this.selectedTile = this.tileEntityGrid[tileIndices.row][tileIndices.col];
    }
  }
}
