import { de } from "@faker-js/faker";
import BoardEntity from "../entities/BoardEntity";
import TileEntity from "../entities/TileEntity";
import { findMatches } from "../helpers/FindMatches";
import { findTileIndicesByPosition } from "../helpers/FindTile";
import { calculateTileCenter } from "../helpers/PositionUtils";
import swapTile from "../helpers/SwapTile";
export interface GameConfig {
  scene: Phaser.Scene;
  boardEntity: BoardEntity | null;
  tileEntityGrid: TileEntity[][] | null;
  boardRows: number;
  boardCols: number;
  boardWidth: number;
  boardHeight: number;
  tileSize: number;
  selectedTile: TileEntity | null;
  matches: TileEntity[][] | null;
  swapSpeed: number;
}
export default class GameScene extends Phaser.Scene {
  private gameConfig: GameConfig = {
    scene: this,
    boardEntity: null,
    tileEntityGrid: null,
    boardRows: 6,
    boardCols: 6,
    boardWidth: 600,
    boardHeight: 600,
    tileSize: 600 / 6,
    selectedTile: null,
    matches: null,
    swapSpeed: 100,
  };
  constructor() {
    super({ key: "game", active: false, visible: false });
  }

  public create() {
    this.gameConfig.boardEntity = this.createBoardEntity();
    this.gameConfig.tileEntityGrid = this.createTileEntityGrid();

    // TODO: refactor match detecting implementation
    this.gameConfig.matches = findMatches(this.gameConfig.tileEntityGrid);
    this.destoryMatches();

    // Input
    this.readInput();
  }

  public update() {}

  private createTileEntityGrid() {
    let tileEntityGrid: TileEntity[][] = [];
    for (let row = 0; row < this.gameConfig.boardRows; row++) {
      tileEntityGrid[row] = [];
      for (let col = 0; col < this.gameConfig.boardCols; col++) {
        const tileX =
          this.gameConfig.boardEntity.x + col * this.gameConfig.tileSize;
        const tileY =
          this.gameConfig.boardEntity.y + row * this.gameConfig.tileSize;

        const tileEntity = new TileEntity(
          this,
          tileX,
          tileY,
          this.gameConfig.tileSize
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
      this.gameConfig.boardWidth,
      this.gameConfig.boardHeight,
      this.gameConfig.boardRows,
      this.gameConfig.boardCols,
      this.gameConfig.tileSize
    );
  }

  private readInput() {
    let startX: number;
    let startY: number;
    let sourceTileIndices: { row: number; col: number };
    const input = this.input;
    input.on(
      "pointerdown",
      (pointer: Phaser.Input.Pointer) => {
        startX = pointer.x;
        startY = pointer.y;
        sourceTileIndices = findTileIndicesByPosition(
          startX,
          startY,
          this.gameConfig.tileSize,
          this.gameConfig.boardRows,
          this.gameConfig.boardCols
        );
        if (sourceTileIndices) {
          this.gameConfig.selectedTile =
            this.gameConfig.tileEntityGrid[sourceTileIndices.row][
              sourceTileIndices.col
            ];
        }
      },
      this
    );

    input.on(
      "pointerup",
      (pointer: Phaser.Input.Pointer) => {
        if (this.gameConfig.selectedTile == null) return;

        const deltaX = pointer.x - startX;
        const deltaY = pointer.y - startY;
        const distanceThreshold = 50;

        if (
          Math.abs(deltaX) > distanceThreshold ||
          Math.abs(deltaY) > distanceThreshold
        ) {
          const direction = this.determineDirection(deltaX, deltaY);
          if (direction) {
            const { sourceTile, destinationTile } = swapTile(
              sourceTileIndices,
              direction,
              this.gameConfig.tileEntityGrid
            );
            if (sourceTile && destinationTile) {
              this.animateSwappedTile(sourceTile, destinationTile);
              this.gameConfig.matches = findMatches(
                this.gameConfig.tileEntityGrid
              );
              this.destoryMatches();
            }
          }
        }
      },
      this
    );
  }

  private animateSwappedTile(
    sourceTile: TileEntity,
    destinationTile: TileEntity
  ) {
    const sourceSpriteX = sourceTile.sprite.x;
    const sourceSpriteY = sourceTile.sprite.y;

    this.tweens.add({
      targets: sourceTile.sprite,
      x: destinationTile.sprite.x,
      y: destinationTile.sprite.y,
      duration: this.gameConfig.swapSpeed,
      callbackScope: this,
    } as any);

    this.tweens.add({
      targets: destinationTile.sprite,
      x: sourceSpriteX,
      y: sourceSpriteY,
      duration: this.gameConfig.swapSpeed,
      callbackScope: this,
    } as any);
  }

  private determineDirection(deltaX: number, deltaY: number): string | null {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? "right" : "left";
    } else {
      return deltaY > 0 ? "down" : "up";
    }
  }

  private destoryMatches() {
    this.gameConfig.matches.forEach((match) =>
      match.forEach((tileEntity) => {
        tileEntity.isEmpty = true;
        this.tweens.add({
          targets: [tileEntity.sprite],
          delay: 0,
          alpha: 0,
          ease: "Power1",
          duration: 2000,
          onComplete: () => {
            console.log("Destory Match Tween completed");
          },
        } as any);
      })
    );
  }
}
