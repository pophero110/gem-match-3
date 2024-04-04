import { v4 as uuidV4 } from "uuid";

export enum TileType {
  RED,
  BLUE,
  GREEN,
  YELLOW,
}

export default class TileEntity {
  id = uuidV4();
  scene: Phaser.Scene;
  x: number;
  y: number;
  size: number;
  row: number;
  col: number;
  sprite: Phaser.GameObjects.Sprite;
  type: TileType;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    size: number,
    row: number,
    col: number
  ) {
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.size = size;
    this.row = row;
    this.col = col;
  }

  render() {
    const spriteX = this.x + this.size / 2;
    const spriteY = this.y + this.size / 2;
    this.sprite = this.scene.add.sprite(spriteX, spriteY, "player", 0);
    this.sprite.setSize(this.size, this.size); // Set size
    this.randomizeTile();
    // this.sprite.setDisplaySize(width / 2, height / 2); // Set display size
  }

  update() {
    const spriteX = this.x + this.size / 2;
    const spriteY = this.y + this.size / 2;
    this.sprite.setX(spriteX);
    this.sprite.setY(spriteY);
  }

  private randomizeTile() {
    // [ 'WHITE', 'BLACK', 'BLUE', 0, 1, 3 ].
    // All the keys will be in first half of the array
    // All the values in second half.
    const values = Object.values(TileType) as TileType[];
    const randomIndex = Math.floor(Math.random() * (values.length / 2));
    this.sprite.setFrame(randomIndex);
    this.type = values[randomIndex];
  }
}
