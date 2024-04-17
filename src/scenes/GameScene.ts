import BoardEntity from "../entities/BoardEntity";
import TileEntity from "../entities/TileEntity";
import { destoryMatches } from "../helpers/DestoryMatches";
import { markMatches } from "../helpers/MarkMatches";
import { calculateTileCenter } from "../helpers/PositionUtils";
import { onSelectTile } from "../helpers/OnSelectTile";
import { onSwapTile } from "../helpers/OnSwapTile";
import { hasMatchesInBoard } from "../helpers/HasMatch";
export interface GameConfig {
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
export default class GameScene extends Phaser.Scene implements GameConfig {
  boardEntity = null;
  tileEntityGrid = null;
  boardRows = 6;
  boardCols = 6;
  boardWidth = 600;
  boardHeight = 600;
  tileSize = 600 / 6;
  selectedTile = null;
  removalGrid = null;
  swapSpeed = 200;
  shfitSpeed = 100;
  destroySpeed = 200;
  canSelectTile = false;
  canSwapTile = false;
  constructor() {
    super({ key: "game", active: false, visible: false });
  }

  public create() {
    this.boardEntity = this.createBoardEntity();
    this.tileEntityGrid = this.createTileEntityGrid();
    this.removalGrid = Array.from({ length: this.boardRows }, () =>
      Array(this.boardCols).fill(0)
    );

    if (hasMatchesInBoard(this.tileEntityGrid)) {
      markMatches(this);
      destoryMatches(this);
    } else {
      this.canSelectTile = true;
    }

    this.input.on("pointerdown", onSelectTile, this);
    this.input.on("pointerup", onSwapTile, this);
  }

  public update() {}

  public createTileEntityGrid() {
    let tileEntityGrid: TileEntity[][] = [];
    for (let row = 0; row < this.boardRows; row++) {
      tileEntityGrid[row] = [];
      for (let col = 0; col < this.boardCols; col++) {
        const { x, y } = calculateTileCenter(row, col, this.tileSize);
        tileEntityGrid[row][col] = new TileEntity(this, x, y, this.tileSize);
      }
    }
    return tileEntityGrid;
  }

  public createBoardEntity() {
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
}
