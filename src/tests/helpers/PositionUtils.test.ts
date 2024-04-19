import { calculateTileCenter } from "../../helpers/PositionUtils";

describe("PositionUtils", () => {
  describe("calculateTileCenter", () => {
    it("calculates the center coordinates of first tile", () => {
      const row = 0;
      const col = 0;
      const expected = { x: 50, y: 50 }; // Expected center coordinates

      const result = calculateTileCenter(row, col, 100, 0, 0);

      expect(result).toEqual(expected);
    });

    it("calculates the center coordinates of second tile", () => {
      const row = 0;
      const col = 1;
      const expected = { x: 150, y: 50 }; // Expected center coordinates

      const result = calculateTileCenter(row, col, 100, 0, 0);

      expect(result).toEqual(expected);
    });
  });
});
