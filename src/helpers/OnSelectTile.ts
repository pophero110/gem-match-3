import { findTileIndicesByPosition } from "./FindTile";

export function onSelectTile(pointer: Phaser.Input.Pointer) {
  if (this.gameConfig.canSelectTile) {
    const startX = pointer.x;
    const startY = pointer.y;
    const tileIndices = findTileIndicesByPosition(
      startX,
      startY,
      this.gameConfig.tileSize,
      this.gameConfig.boardRows,
      this.gameConfig.boardCols
    );
    if (tileIndices) {
      this.gameConfig.selectedTile =
        this.gameConfig.tileEntityGrid[tileIndices.row][tileIndices.col];
    }
  }
}
