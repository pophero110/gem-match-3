import { calculateTileCenter } from "../../src/helpers/PositionUtils";

describe("PositionUtils", () => {
  describe("calculateTileCenter", () => {
    it("calculates the center coordinates of first tile", () => {
      const row = 0;
      const col = 0;
      const tileSize = 100; // Assuming tileSize is 50
      const expected = { x: 50, y: 50 }; // Expected center coordinates

      const result = calculateTileCenter(row, col, tileSize);

      expect(result).toEqual(expected);
    });
  });

  describe("calculateTileCenter", () => {
    it("calculates the center coordinates of second tile", () => {
      const row = 0;
      const col = 1;
      const tileSize = 100; // Assuming tileSize is 50
      const expected = { x: 150, y: 50 }; // Expected center coordinates

      const result = calculateTileCenter(row, col, tileSize);

      expect(result).toEqual(expected);
    });
  });
});
