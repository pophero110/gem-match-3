import { v4 as uuidV4 } from "uuid";
export default class TileEntity {
  id = uuidV4();
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  row: number;
  col: number;
  sprite: Phaser.GameObjects.Sprite;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    row: number,
    col: number,
    sprite: Phaser.GameObjects.Sprite
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    this.sprite = sprite;

    const spriteX = x + width / 2;
    const spriteY = y + height / 2;
    this.sprite.setX(spriteX);
    this.sprite.setY(spriteY);
    this.sprite.setTexture("player");
    this.sprite.setFrame(Math.floor(Math.random() * 4));
  }

  render() {
    this.scene.add.existing(this.sprite);
  }

  update() {
    const spriteX = this.x + this.width / 2;
    const spriteY = this.y + this.height / 2;
    this.sprite.setX(spriteX);
    this.sprite.setY(spriteY);
  }

  onSelectTile(selectedTile: { tile: TileEntity }) {
    this.sprite.setInteractive();
    this.sprite.on("pointerdown", () => {
      console.log("Selected Tile: ", this);
      selectedTile.tile = this;
    });
  }
}
