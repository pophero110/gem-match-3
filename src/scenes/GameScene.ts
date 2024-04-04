import BoardEntity from "../entities/BoardEntity";
import TileEntity from "../entities/TileEntity";
import { findMatchedTiles } from "../helpers/FindMatchedTiles";
import { findTileIndicesByPosition } from "../helpers/FindTile";
import swapTile from "../helpers/SwapTile";

export default class GameScene extends Phaser.Scene {
  private boardEntity: BoardEntity;
  private tileEntityGrid: TileEntity[][];
  private boardRows = 6;
  private boardCols = 6;
  private boardWidth = 600;
  private boardHeight = 600;
  private tileSize = this.boardWidth / this.boardCols;
  private selectedTile: TileEntity = null;
  private matchedTiles: TileEntity[][];
  constructor() {
    super({ key: "game", active: false, visible: false });
  }

  public create() {
    this.boardEntity = this.createBoardEntity();
    this.tileEntityGrid = this.createTileEntityGrid();
    // The order of rendering is important
    // Render
    this.boardEntity.render();
    this.renderTileEntites();
    // TODO: refactor match detecting implementation
    this.matchedTiles = findMatchedTiles(this.tileEntityGrid);
    this.handleMatchedTile();

    // Input
    this.readInput();
  }

  public update() {}

  private updateTileEntityGrid() {
    this.tileEntityGrid.forEach((cols) =>
      cols.forEach((tileEntity) => tileEntity.update())
    );
  }

  private renderTileEntites() {
    this.tileEntityGrid.forEach((cols) =>
      cols.forEach((tileEntity) => tileEntity.render())
    );
  }

  private createTileEntityGrid() {
    let tileEntityGrid: TileEntity[][] = [];
    for (let row = 0; row < this.boardRows; row++) {
      tileEntityGrid[row] = [];
      for (let col = 0; col < this.boardCols; col++) {
        const tileX = this.boardEntity.x + col * this.tileSize;
        const tileY = this.boardEntity.y + row * this.tileSize;

        const tileEntity = new TileEntity(
          this,
          tileX,
          tileY,
          this.tileSize,
          row,
          col
        );

        tileEntityGrid[row][col] = tileEntity;
      }
    }
    return tileEntityGrid;
  }

  private createBoardEntity() {
    return new BoardEntity(
      this,
      0,
      0,
      this.boardWidth,
      this.boardHeight,
      this.boardRows,
      this.boardCols,
      this.tileSize
    );
  }

  private calculateBoardPosition(): { x: number; y: number } {
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    const x = (screenWidth - this.boardWidth) / 2; // X position to center the board
    const y = (screenHeight - this.boardHeight) / 2; // Y position to center the board

    return { x, y };
  }

  private readInput() {
    let startX: number;
    let startY: number;
    const input = this.input;
    input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      startX = pointer.x;
      startY = pointer.y;
      const tileIndices = findTileIndicesByPosition(
        startX,
        startY,
        this.tileSize,
        this.boardRows,
        this.boardCols
      );
      if (tileIndices) {
        this.selectedTile =
          this.tileEntityGrid[tileIndices.row][tileIndices.col];
      }
    });

    input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      if (this.selectedTile == null) return;

      const deltaX = pointer.x - startX;
      const deltaY = pointer.y - startY;
      const distanceThreshold = 50;

      if (
        Math.abs(deltaX) > distanceThreshold ||
        Math.abs(deltaY) > distanceThreshold
      ) {
        const direction = this.determineDirection(deltaX, deltaY);
        if (direction) {
          console.log("Swap Direction: ", direction);
          const destinationTile = this.findDestinationTile(
            this.selectedTile,
            this.tileEntityGrid,
            direction
          );
          console.log({ sourceTile: this.selectedTile, destinationTile });
          if (destinationTile) {
            swapTile(this.selectedTile, destinationTile, this.tileEntityGrid);
            this.matchedTiles = findMatchedTiles(this.tileEntityGrid);
            this.handleMatchedTile();
            this.updateTileEntityGrid();
          }
        }
      }
    });
  }

  private handleMatchedTile() {
    this.matchedTiles.forEach((tileEntities) =>
      tileEntities.forEach((tileEntity) => {
        tileEntity.sprite.setTint(0x00ff00); // Set tint to green
        setTimeout(() => {
          tileEntity.sprite.destroy();
        }, 500);
      })
    );
  }

  private determineDirection(deltaX: number, deltaY: number): string | null {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? "right" : "left";
    } else {
      return deltaY > 0 ? "down" : "up";
    }
  }

  private findDestinationTile(
    sourceTile: TileEntity,
    tileEntityGrid: TileEntity[][],
    direction: string
  ): TileEntity | null {
    let destRow = sourceTile.row;
    let destCol = sourceTile.col;
    switch (direction) {
      case "up":
        destRow--;
        break;
      case "down":
        destRow++;
        break;
      case "left":
        destCol--;
        break;
      case "right":
        destCol++;
        break;
      default:
        return null;
    }

    if (
      destRow >= 0 &&
      destRow < tileEntityGrid.length &&
      destCol >= 0 &&
      destCol < tileEntityGrid[destRow].length
    ) {
      return tileEntityGrid[destRow][destCol];
    } else {
      return null;
    }
  }
}
