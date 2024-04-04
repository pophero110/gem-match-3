import BoardEntity from "../../src/entities/BoardEntity";

describe("BoardEntity", () => {
  it("should create a BoardEntity with components", () => {
    // Arrange
    const width = 400;
    const height = 400;
    const screenWidth = 1000;
    const screenHeight = 1000;
    const x = (screenWidth - width) / 2;
    const y = (screenHeight - height) / 2;
    const rows = 6;
    const cols = 6;
    const scene: any = {};
    scene.scale = { width: screenWidth, height: screenHeight };

    // Act
    const boardEntity = new BoardEntity(scene, x, y, width, height, rows, cols);

    // Assert
    // Check if properties are set correctly
    expect(boardEntity.x).toBe(x);
    expect(boardEntity.y).toBe(y);
    expect(boardEntity.rows).toBe(rows);
    expect(boardEntity.cols).toBe(cols);

    // Check if tile dimensions are calculated correctly
    const expectedTileWidth = width / cols;
    const expectedTileHeight = height / rows;
    expect(boardEntity.tileWidth).toBe(expectedTileWidth);
    expect(boardEntity.tileHeight).toBe(expectedTileHeight);

    expect(boardEntity.width).toBe(width);
    expect(boardEntity.height).toBe(height);
    expect(boardEntity.x).toBe(x);
    expect(boardEntity.y).toBe(y);
  });
});
