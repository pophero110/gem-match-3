import PositionComponent from "../../src/components/PositionComponent";
import SizeComponent from "../../src/components/SizeComponent";
import BoardEntity from "../../src/entities/BoardEntity";

describe("BoardEntity", () => {
  it("should create a BoardEntity with components", () => {
    // Arrange
    const x = 10;
    const y = 20;
    const width = 200;
    const height = 300;
    const rows = 3;
    const cols = 4;

    // Act
    const boardEntity = new BoardEntity(x, y, width, height, rows, cols);

    // Assert
    // Check if properties are set correctly
    expect(boardEntity.x).toBe(x);
    expect(boardEntity.y).toBe(y);
    expect(boardEntity.rows).toBe(rows);
    expect(boardEntity.cols).toBe(cols);

    // Check if tile dimensions are calculated correctly
    const expectedTileWidth = width / cols;
    const expectedTileHeight = height / rows;
    expect(boardEntity.tileDimensions.width).toBe(expectedTileWidth);
    expect(boardEntity.tileDimensions.height).toBe(expectedTileHeight);

    // Check if components are added correctly
    const sizeComponent = boardEntity.getComponent(SizeComponent);
    const positionComponent = boardEntity.getComponent(PositionComponent);
    expect(sizeComponent).toBeDefined();
    expect(positionComponent).toBeDefined();
    expect(sizeComponent.width).toBe(width);
    expect(sizeComponent.height).toBe(height);
    expect(positionComponent.x).toBe(x);
    expect(positionComponent.y).toBe(y);
  });
});
