import PositionComponent from "../components/PositionComponent";
import SizeComponent from "../components/SizeComponent";
import SpriteComponent from "../components/SpriteComponent";
import { Entity } from "./Entity";

export class TileEntity extends Entity {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    sprite: Phaser.GameObjects.Sprite
  ) {
    super();
    const tilePosition = new PositionComponent(x, y);
    const tileSize = new SizeComponent(width, height);

    const spriteX = x + width / 2;
    const spriteY = y + height / 2;
    sprite
      .setX(spriteX)
      .setY(spriteY)
      .setTexture("player")
      .setAlpha(Math.random());
    const spriteComponent = new SpriteComponent(sprite);

    this.addComponent(tilePosition);
    this.addComponent(tileSize);
    this.addComponent(spriteComponent);
  }
}
