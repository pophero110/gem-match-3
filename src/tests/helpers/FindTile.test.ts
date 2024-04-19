import { findTileIndicesByPosition } from "../../helpers/OnSelectTile";

describe("findTileIndicesByPosition", () => {
  // Define a helper function to test a specific tile system configuration
  function testTileSystem(
    boardWidth: number,
    boardHeight: number,
    rows: number,
    cols: number,
    boardX: number,
    boardY: number
  ) {
    const tileSize = boardWidth / cols;

    it("should return the index of row and col in the grid", () => {
      // Test the first tile
      expect(
        findTileIndicesByPosition(
          boardX,
          boardY,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toEqual({ row: 0, col: 0 });
      // Test the second tile
      expect(
        findTileIndicesByPosition(
          boardX,
          boardY + tileSize,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toEqual({ row: 1, col: 0 });
      // Test the third tile
      expect(
        findTileIndicesByPosition(
          boardX + tileSize,
          boardY,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toEqual({ row: 0, col: 1 });
      // Test the fourth tile
      expect(
        findTileIndicesByPosition(
          boardX + tileSize,
          boardY + tileSize,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toEqual({ row: 1, col: 1 });
    });

    it("should return null if row is greater than or equal to rows", () => {
      expect(
        findTileIndicesByPosition(
          0,
          boardY + boardHeight,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toBeNull();
    });

    it("should return null if col is greater than or equal to cols", () => {
      expect(
        findTileIndicesByPosition(
          boardWidth,
          0,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toBeNull();
    });

    it("should return first tile when x and y equals to boardX and boardY", () => {
      expect(
        findTileIndicesByPosition(
          boardX,
          boardY,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toEqual({ row: 0, col: 0 });
    });

    it("should return last tile when x and y smaller than boardWidth and boardHeight by 1", () => {
      expect(
        findTileIndicesByPosition(
          boardX + boardWidth - 1,
          boardY + boardHeight - 1,
          tileSize,
          rows,
          cols,
          boardX,
          boardY
        )
      ).toEqual({ row: rows - 1, col: cols - 1 });
    });
  }

  // Test with different configurations
  testTileSystem(600, 600, 6, 6, 100, 100);
  testTileSystem(600, 600, 6, 6, 100, 200);

  it("should return null if pointer position is outside the board (top-left corner)", () => {
    expect(findTileIndicesByPosition(99, 99, 50, 5, 5, 100, 100)).toBeNull();
  });

  it("should return null if pointer position is outside the board (bottom-right corner)", () => {
    expect(findTileIndicesByPosition(656, 656, 50, 5, 5, 100, 100)).toBeNull();
  });

  it("should return last tile when pointer position is at the bottom-right corner of the board", () => {
    expect(findTileIndicesByPosition(699, 699, 100, 6, 6, 100, 100)).toEqual({
      row: 5,
      col: 5,
    });
  });
});
