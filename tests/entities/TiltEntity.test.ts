import PositionComponent from "../../src/components/PositionComponent";
import SizeComponent from "../../src/components/SizeComponent";
import SpriteComponent from "../../src/components/SpriteComponent";
import { TileEntity } from "../../src/entities/TileEntity";

describe("TileEntity", () => {
  it("should create a TileEntity with components", () => {
    // Arrange
    const x = 10;
    const y = 20;
    const width = 30;
    const height = 40;

    // Mock
    const spriteMock: any = {};
    spriteMock.setX = jest.fn();
    spriteMock.setY = jest.fn();
    spriteMock.setFrame = jest.fn();

    // Act
    const tileEntity = new TileEntity(x, y, width, height, spriteMock);

    // Assert
    expect(tileEntity.getComponents().length).toBe(3);

    let positionComponent = tileEntity.getComponent(PositionComponent);
    expect(positionComponent).toBeInstanceOf(PositionComponent);
    expect(positionComponent.x).toBe(x);
    expect(positionComponent.y).toBe(y);

    let sizeComponent = tileEntity.getComponent(SizeComponent);
    expect(sizeComponent).toBeInstanceOf(SizeComponent);
    expect(sizeComponent.width).toBe(width);
    expect(sizeComponent.width).toBe(width);
    expect(sizeComponent.height).toBe(height);

    let spriteComponent = tileEntity.getComponent(SpriteComponent);
    let expectedSpriteX = x + width / 2;
    let expectedSpriteY = y + height / 2;
    expect(spriteComponent).toBeInstanceOf(SpriteComponent);
    expect(spriteMock.setX).toHaveBeenCalledWith(expectedSpriteX);
    expect(spriteMock.setY).toHaveBeenCalledWith(expectedSpriteY);
    expect(spriteMock.setFrame).toHaveBeenCalledWith("player");
  });
});
