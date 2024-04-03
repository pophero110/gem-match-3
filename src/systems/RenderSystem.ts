import PositionComponent from "../components/PositionComponent";
import SizeComponent from "../components/SizeComponent";
import SpriteComponent from "../components/SpriteComponent";
import BoardEntity from "../entities/BoardEntity";
import { TileEntity } from "../entities/TileEntity";

export default class RenderSystem {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  renderBoardEntity(entity: BoardEntity) {
    const position = entity.getComponent(PositionComponent);
    const size = entity.getComponent(SizeComponent);

    // Render board background
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xcccccc, 1);
    graphics.fillRect(position.x, position.y, size.width, size.height);

    // Render grid
    const tileWidth = entity.tileDimensions.width;
    const tileHeight = entity.tileDimensions.height;

    // Variable to alternate background color
    let isGray = true;

    for (let i = 0; i < entity.rows; i++) {
      for (let j = 0; j < entity.cols; j++) {
        const x = position.x + j * tileWidth;
        const y = position.y + i * tileHeight;

        // Toggle background color between gray and white
        const cellColor = isGray ? 0xeeeeee : 0xffffff;
        graphics.fillStyle(cellColor, 1);
        graphics.fillRect(x, y, tileWidth, tileHeight);

        // Toggle background color for the next cell
        isGray = !isGray;
      }
      // Toggle background color for the next row
      isGray = !isGray;
    }
  }

  renderTileEntities(tileEntities: TileEntity[][]) {
    tileEntities.forEach((rows) =>
      rows.forEach((tileEntity) => this.renderTileEntity(tileEntity))
    );
  }

  renderTileEntity(tileEntity: TileEntity) {
    const spriteComponent = tileEntity.getComponent(SpriteComponent);
    this.scene.add.existing(spriteComponent.sprite);
  }
}
