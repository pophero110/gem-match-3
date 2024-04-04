export default class BoardEntity {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number = 400;
  height: number = 400;
  rows: number = 6;
  cols: number = 6;
  tileWidth: number = this.width / this.cols;
  tileHeight: number = this.height / this.rows;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    rows: number,
    cols: number
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
  }

  render() {
    // Render board background
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xcccccc, 1);
    graphics.fillRect(this.x, this.y, this.width, this.height);

    // Render grid

    // Variable to alternate background color
    let isGray = true;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x = this.x + j * this.tileWidth;
        const y = this.y + i * this.tileHeight;

        // Toggle background color between gray and white
        const cellColor = isGray ? 0xeeeeee : 0xffffff;
        graphics.fillStyle(cellColor, 1);
        graphics.fillRect(x, y, this.tileWidth, this.tileHeight);

        // Toggle background color for the next cell
        isGray = !isGray;
      }
      // Toggle background color for the next row
      isGray = !isGray;
    }
  }

  private calculateBoardPosition(): { x: number; y: number } {
    const screenWidth = this.scene.scale.width;
    const screenHeight = this.scene.scale.height;

    const x = (screenWidth - this.width) / 2; // X position to center the board
    const y = (screenHeight - this.height) / 2; // Y position to center the board

    return { x, y };
  }
}
