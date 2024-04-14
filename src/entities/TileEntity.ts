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
  sprite: Phaser.GameObjects.Sprite;
  frame: number;
  type: TileType;
  isEmpty: boolean;
  constructor(scene: Phaser.Scene, x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.size = size;
    this.isEmpty = false;

    this.randomizeTile();
    this.render();
  }

  render() {
    const spriteX = this.x;
    const spriteY = this.y;
    this.sprite = this.scene.add.sprite(spriteX, spriteY, "player", this.frame);
    this.sprite.setSize(this.size, this.size); // Set size
    // this.sprite.setDisplaySize(width / 2, height / 2); // Set display size
  }

  private randomizeTile() {
    // [ 'WHITE', 'BLACK', 'BLUE', 0, 1, 3 ].
    // All the keys will be in first half of the array
    // All the values in second half.
    const values = Object.values(TileType) as TileType[];
    const randomIndex = Math.floor(Math.random() * (values.length / 2));
    this.frame = randomIndex;
    this.type = values[randomIndex];
  }
}
