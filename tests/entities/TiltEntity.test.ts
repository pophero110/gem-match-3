import TileEntity, { TileType } from "../../src/entities/TileEntity";
import { createMockScene } from "../common/MockData";

describe("TileEntity", () => {
  describe("constructor", () => {
    it("should initialize TileEntity with provided values", () => {
      const mockScene = createMockScene();

      const tileEntity = new TileEntity(mockScene, 0, 0, 100, 1, 1);

      expect(tileEntity.scene).toBe(mockScene);
      expect(tileEntity.x).toBe(0);
      expect(tileEntity.y).toBe(0);
      expect(tileEntity.size).toBe(100);
      expect(tileEntity.row).toBe(1);
      expect(tileEntity.col).toBe(1);
    });
  });

  describe("render", () => {
    it("should add sprite to the scene", () => {
      const mockScene = createMockScene();
      const expectedValues = Object.values(TileType) as TileType[];
      const expectedRandomIndex = 0;
      const spyMathRandom = jest
        .spyOn(Math, "random")
        .mockReturnValue(expectedRandomIndex);
      const tileEntity = new TileEntity(mockScene, 0, 0, 100, 1, 1);
      const mockSprite = tileEntity.sprite;

      tileEntity.render();

      expect(mockScene.add.sprite).toHaveBeenCalledWith(50, 50, "player", 0);
      expect(tileEntity.type).toBe(expectedValues[expectedRandomIndex]);

      spyMathRandom.mockRestore(); // Restore Math.random() to its original implementation
    });
  });

  describe("update", () => {
    it("should update sprite position", () => {
      const mockScene = createMockScene();
      const tileEntity = new TileEntity(mockScene, 0, 0, 100, 1, 1);

      tileEntity.render();
      const mockSprite = tileEntity.sprite;

      tileEntity.update();

      const expectedSpriteX = 0 + 100 / 2;
      const expectedSpriteY = 0 + 100 / 2;

      expect(mockSprite.setX).toHaveBeenCalledWith(expectedSpriteX);
      expect(mockSprite.setY).toHaveBeenCalledWith(expectedSpriteY);
    });
  });
});
