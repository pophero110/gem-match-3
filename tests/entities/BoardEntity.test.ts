import BoardEntity from "../../src/entities/BoardEntity";
import { createMockScene } from "../common/MockData";

describe("BoardEntity", () => {
  it("should create a BoardEntity with components", () => {
    // Arrange
    const width = 600;
    const height = 600;
    const screenWidth = 600;
    const screenHeight = 600;
    const x = (screenWidth - width) / 2;
    const y = (screenHeight - height) / 2;
    const rows = 6;
    const cols = 6;
    const tileSize = 100;
    const scene = createMockScene();

    // Act
    const boardEntity = new BoardEntity(
      scene,
      x,
      y,
      width,
      height,
      rows,
      cols,
      tileSize
    );

    // Assert
    // Check if properties are set correctly
    expect(boardEntity.x).toBe(x);
    expect(boardEntity.y).toBe(y);
    expect(boardEntity.rows).toBe(rows);
    expect(boardEntity.cols).toBe(cols);

    // Check if tile dimensions are calculated correctly
    const expectedTileSize = width / cols;
    expect(boardEntity.tileSize).toBe(expectedTileSize);

    expect(boardEntity.width).toBe(width);
    expect(boardEntity.height).toBe(height);
    expect(boardEntity.x).toBe(x);
    expect(boardEntity.y).toBe(y);
  });
});
