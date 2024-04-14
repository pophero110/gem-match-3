import TileEntity, { TileType } from "../../src/entities/TileEntity";
import { createMockScene } from "../common/MockData";

describe("TileEntity", () => {
  describe("constructor", () => {
    it("should initialize TileEntity with provided values", () => {
      const mockScene = createMockScene();

      const tileEntity = new TileEntity(mockScene, 0, 0, 100);

      expect(tileEntity.scene).toBe(mockScene);
      expect(tileEntity.x).toBe(0);
      expect(tileEntity.y).toBe(0);
      expect(tileEntity.size).toBe(100);
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
      const tileEntity = new TileEntity(mockScene, 0, 0, 100);

      tileEntity.render();

      expect(mockScene.add.sprite).toHaveBeenCalledWith(0, 0, "player", 0);
      expect(tileEntity.type).toBe(expectedValues[expectedRandomIndex]);

      spyMathRandom.mockRestore(); // Restore Math.random() to its original implementation
    });
  });
});
