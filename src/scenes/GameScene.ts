import BoardEntity from "../entities/BoardEntity";
import TileEntity from "../entities/TileEntity";
import {
  calculateBoardCenter,
  calculateTileCenter,
} from "../helpers/PositionUtils";
import { onSelectTile } from "../helpers/OnSelectTile";
import { onSwapTile } from "../helpers/OnSwapTile";
import * as Phaser from "phaser";
import handleMatches from "../helpers/HandleMatches";

export interface GameConfig {
  boardEntity: BoardEntity;
  tileEntityGrid: TileEntity[][];
  boardRows: number;
  boardCols: number;
  boardWidth: number;
  boardHeight: number;
  tileSize: number;
  selectedTile: TileEntity;
  removalGrid: number[][];
  swapSpeed: number;
  shfitSpeed: number;
  destroySpeed: number;
  canSelectTile: boolean;
  canSwapTile: boolean;
}

export default class GameScene extends Phaser.Scene implements GameConfig {
  boardEntity: BoardEntity;
  tileEntityGrid: TileEntity[][];
  boardRows = 6;
  boardCols = 6;
  boardWidth = 600;
  boardHeight = 600;
  tileSize = 600 / 6;
  selectedTile: TileEntity;
  removalGrid: number[][];
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

    handleMatches(this);

    this.input.on("pointerdown", onSelectTile, this);
    this.input.on("pointerup", onSwapTile, this);
  }

  public update() {}

  public createTileEntityGrid() {
    let tileEntityGrid: TileEntity[][] = [];
    for (let row = 0; row < this.boardRows; row++) {
      tileEntityGrid[row] = [];
      for (let col = 0; col < this.boardCols; col++) {
        const { x, y } = calculateTileCenter(
          row,
          col,
          this.tileSize,
          this.boardEntity.x,
          this.boardEntity.y
        );
        tileEntityGrid[row][col] = new TileEntity(this, x, y, this.tileSize);
      }
    }
    return tileEntityGrid;
  }

  public createBoardEntity() {
    const { x, y } = calculateBoardCenter(
      this.scale.width,
      this.scale.height,
      this.boardWidth,
      this.boardHeight
    );
    return new BoardEntity(
      this,
      x,
      y,
      this.boardWidth,
      this.boardHeight,
      this.boardRows,
      this.boardCols,
      this.tileSize
    );
  }
}
