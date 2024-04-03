export enum TileType {
  RED = "red",
  GREEN = "green",
  YELLOW = "yellow",
  BLUE = "blue",
}

export default class TileComponent {
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    color: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
