import BoardEntity from "../entities/BoardEntity";
import TileEntity from "../entities/TileEntity";
import handleSwapTile from "../systems/SwapTileSystem";

export default class GameScene extends Phaser.Scene {
  private boardEntity: BoardEntity;
  private tileEntityMap: Map<string, TileEntity>;
  private tileEntityGrid: TileEntity[][];
  private boardRows = 6;
  private boardCols = 6;
  private boardWidth = 400;
  private boardHeight = 400;
  private tileSize = {
    width: this.boardWidth / this.boardCols,
    height: this.boardHeight / this.boardRows,
  };
  private selectedTile: { tile: TileEntity } = { tile: null };
  constructor() {
    super({ key: "game", active: false, visible: false });
  }

  public create() {
    const { x, y } = this.calculateBoardPosition();
    this.boardEntity = new BoardEntity(
      this,
      x,
      y,
      this.boardWidth,
      this.boardHeight,
      this.boardRows,
      this.boardCols
    );
    const { tileEntityMap, tileEntityGrid } = this.createTileEntities();
    this.tileEntityMap = tileEntityMap;
    this.tileEntityGrid = tileEntityGrid;

    // The order of rendering is important
    // Render
    this.boardEntity.render();
    this.renderTileEntites();

    // Input
    this.readSwapInput();
  }

  public update() {
    this.updateTileEntites();
  }

  private updateTileEntites() {
    this.tileEntityMap.forEach((tileEntity) => {
      tileEntity.update();
    });
  }

  private renderTileEntites() {
    this.tileEntityMap.forEach((tileEntity) => tileEntity.render());
  }

  private createTileEntities() {
    let tileEntityMap: Map<string, TileEntity> = new Map();
    let tileEntityGrid: TileEntity[][] = [];
    for (let row = 0; row < this.boardRows; row++) {
      tileEntityGrid[row] = [];
      for (let col = 0; col < this.boardCols; col++) {
        const tileX = this.boardEntity.x + col * this.tileSize.width;
        const tileY = this.boardEntity.y + row * this.tileSize.height;

        const sprite = new Phaser.GameObjects.Sprite(this, 0, 0, "player");
        const tileEntity = new TileEntity(
          this,
          tileX,
          tileY,
          this.tileSize.width,
          this.tileSize.height,
          row,
          col,
          sprite
        );
        tileEntity.onSelectTile(this.selectedTile);

        tileEntityMap.set(tileEntity.id, tileEntity);
        tileEntityGrid[row][col] = tileEntity;
      }
    }
    return { tileEntityMap, tileEntityGrid };
  }

  private calculateBoardPosition(): { x: number; y: number } {
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    const x = (screenWidth - this.boardWidth) / 2; // X position to center the board
    const y = (screenHeight - this.boardHeight) / 2; // Y position to center the board

    return { x, y };
  }

  private readSwapInput() {
    let startX: number;
    let startY: number;
    const input = this.input;
    input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      startX = pointer.x;
      startY = pointer.y;
    });

    input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      if (this.selectedTile.tile == null) return;

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
            this.selectedTile.tile,
            this.tileEntityGrid,
            direction
          );
          console.log({ sourceTile: this.selectedTile.tile, destinationTile });
          if (destinationTile) {
            handleSwapTile(
              this.selectedTile.tile,
              destinationTile,
              this.tileEntityGrid
            );
          }
        }
      }
    });
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
