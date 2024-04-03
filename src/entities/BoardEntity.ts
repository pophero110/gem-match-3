import PositionComponent from "../components/PositionComponent";
import SizeComponent from "../components/SizeComponent";
import { Entity } from "./Entity";

export default class BoardEntity extends Entity {
  x: number;
  y: number;
  rows: number;
  cols: number;
  tileDimensions: { width: number; height: number };

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    rows: number,
    cols: number
  ) {
    super();
    this.x = x;
    this.y = y;
    this.rows = rows;
    this.cols = cols;

    const tileWidth = width / cols;
    const tileHeight = height / rows;
    this.tileDimensions = { width: tileWidth, height: tileHeight };

    const boardSize = new SizeComponent(width, height);
    const boardPosition = new PositionComponent(x, y);

    this.addComponent(boardSize);
    this.addComponent(boardPosition);
  }
}
