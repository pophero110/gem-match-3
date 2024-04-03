import RenderSystem from "../systems/RenderSystem";
import BoardEntity from "../entities/BoardEntity";
import { TileEntity } from "../entities/TileEntity";
import InputSystem from "../systems/InputSystem";

export default class GameScene extends Phaser.Scene {
  private boardEntity: BoardEntity;
  private tileEntities: TileEntity[][];
  private renderSystem: RenderSystem;
  private tileInputSystem: InputSystem;
  private boardRows = 6;
  private boardCols = 6;
  private boardDimensions = { width: 400, height: 400 };
  private tileSize = {
    width: this.boardDimensions.width / this.boardCols,
    height: this.boardDimensions.height / this.boardRows,
  };
  private selectedTile: TileEntity;

  constructor() {
    super({ key: "game", active: false, visible: false });
  }

  public create() {
    this.renderSystem = new RenderSystem(this);
    this.tileInputSystem = new InputSystem(this);

    this.boardEntity = this.createBoardEntity();
    this.tileEntities = this.createTileEntities(this);

    this.renderSystem.renderBoardEntity(this.boardEntity);
    this.renderSystem.renderTileEntities(this.tileEntities);
  }

  private createBoardEntity() {
    const { boardX, boardY } = this.calculateBoardPosition(
      this.boardDimensions.width,
      this.boardDimensions.height
    );

    const boardEntity = new BoardEntity(
      boardX,
      boardY,
      this.boardDimensions.width,
      this.boardDimensions.height,
      this.boardRows,
      this.boardCols
    );
    return boardEntity;
  }

  private createTileEntities(scene: Phaser.Scene) {
    let tileEntities: TileEntity[][] = [];
    for (let i = 0; i < this.boardRows; i++) {
      tileEntities[i] = [];
      for (let j = 0; j < this.boardCols; j++) {
        const tileX = this.boardEntity.x + j * this.tileSize.width;
        const tileY = this.boardEntity.y + i * this.tileSize.height;
        const sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, "player");

        const tileEntity = new TileEntity(
          tileX,
          tileY,
          this.tileSize.width,
          this.tileSize.height,
          sprite
        );

        sprite.setInteractive();
        sprite.on("pointerdown", () => {
          this.selectedTile = tileEntity;
          console.log("Selected Tile", tileEntity);
        });

        tileEntities[i][j] = tileEntity;
      }
    }
    return tileEntities;
  }

  private calculateBoardPosition(
    boardWidth: number,
    boardHeight: number
  ): { boardX: number; boardY: number } {
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;

    const boardX = (screenWidth - boardWidth) / 2; // X position to center the board
    const boardY = (screenHeight - boardHeight) / 2; // Y position to center the board

    return { boardX, boardY };
  }
}
