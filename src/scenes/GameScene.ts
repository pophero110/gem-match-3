import BoardEntity from "../entities/BoardEntity";
import TileEntity from "../entities/TileEntity";
import { destoryMatches } from "../helpers/DestoryMatches";
import { markMatches } from "../helpers/MarkMatches";
import { calculateTileCenter } from "../helpers/PositionUtils";
import { onSelectTile } from "../helpers/OnSelectTile";
import { onSwapTile } from "../helpers/OnSwapTile";
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
  removalGrid: number[][] | null;
  swapSpeed: number;
  shfitSpeed: number;
  destroySpeed: number;
  canSelectTile: boolean;
  canSwapTile: boolean;
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
    removalGrid: null,
    swapSpeed: 200,
    shfitSpeed: 100,
    destroySpeed: 200,
    canSelectTile: true,
    canSwapTile: false,
  };
  constructor() {
    super({ key: "game", active: false, visible: false });
  }

  public create() {
    this.gameConfig.boardEntity = this.createBoardEntity();
    this.gameConfig.tileEntityGrid = this.createTileEntityGrid();
    this.gameConfig.removalGrid = Array.from(
      { length: this.gameConfig.boardRows },
      () => Array(this.gameConfig.boardCols).fill(0)
    );

    markMatches(this.gameConfig);
    destoryMatches(this.gameConfig);

    this.input.on("pointerdown", onSelectTile, this);
    this.input.on("pointerup", onSwapTile, this);
  }

  public update() {}

  private createTileEntityGrid() {
    let tileEntityGrid: TileEntity[][] = [];
    for (let row = 0; row < this.gameConfig.boardRows; row++) {
      tileEntityGrid[row] = [];
      for (let col = 0; col < this.gameConfig.boardCols; col++) {
        const { x, y } = calculateTileCenter(
          row,
          col,
          this.gameConfig.tileSize
        );
        tileEntityGrid[row][col] = new TileEntity(
          this,
          x,
          y,
          this.gameConfig.tileSize
        );
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
}
