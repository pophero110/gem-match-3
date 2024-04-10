export default class BoardEntity {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  rows: number;
  cols: number;
  tileSize: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    rows: number,
    cols: number,
    tileSize: number
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.tileSize = tileSize;

    this.render();
  }

  render() {
    // Render board background
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xcccccc, 1);
    graphics.fillRect(this.x, this.y, this.width, this.height);
    graphics.setDepth(-20);

    // Render grid

    // Variable to alternate background color
    let isGray = true;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x = this.x + j * this.tileSize;
        const y = this.y + i * this.tileSize;

        // Toggle background color between gray and white
        const cellColor = isGray ? 0xeeeeee : 0xffffff;
        graphics.fillStyle(cellColor, 1);
        graphics.fillRect(x, y, this.tileSize, this.tileSize);

        // Toggle background color for the next cell
        isGray = !isGray;
      }
      // Toggle background color for the next row
      isGray = !isGray;
    }
  }
}
