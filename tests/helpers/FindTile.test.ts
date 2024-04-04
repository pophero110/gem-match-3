import { findTileIndicesByPosition } from "../../src/helpers/FindTile";

describe("findTileIndicesByPosition", () => {
  function testTileSystem(boardWidth, boardHeight, rows, cols) {
    const tileSize = boardWidth / cols;

    it("should return the index of row and col in the grid", () => {
      const firstTile = findTileIndicesByPosition(
        tileSize - 1,
        tileSize - 1,
        tileSize,
        rows,
        cols
      );
      expect(firstTile.row).toEqual(0);
      expect(firstTile.col).toEqual(0);

      const secondTile = findTileIndicesByPosition(
        tileSize - 1,
        tileSize + 1,
        tileSize,
        rows,
        cols
      );
      expect(secondTile.row).toEqual(1);
      expect(secondTile.col).toEqual(0);

      const thirdTile = findTileIndicesByPosition(
        tileSize + 1,
        tileSize - 1,
        tileSize,
        rows,
        cols
      );
      expect(thirdTile.row).toEqual(0);
      expect(thirdTile.col).toEqual(1);

      const fourthTile = findTileIndicesByPosition(
        tileSize + 1,
        tileSize + 1,
        tileSize,
        rows,
        cols
      );
      expect(fourthTile.row).toEqual(1);
      expect(fourthTile.col).toEqual(1);
    });

    it("should return null if row is greater than or equal to rows", () => {
      const actual = findTileIndicesByPosition(
        0,
        boardHeight,
        tileSize,
        rows,
        cols
      );
      expect(actual).toEqual(null);
    });

    it("should return null if col is greater than or equal to cols", () => {
      const actual = findTileIndicesByPosition(
        boardWidth,
        0,
        tileSize,
        rows,
        cols
      );
      expect(actual).toEqual(null);
    });

    it("should return first tile when x and y equals to 0", () => {
      const actual = findTileIndicesByPosition(0, 0, tileSize, rows, cols);
      expect(actual).toBeDefined();
      expect(actual.row).toEqual(0);
      expect(actual.col).toEqual(0);
    });

    it("should return last tile when x and y smaller than boardWidth and boardHeight by 1", () => {
      const actual = findTileIndicesByPosition(
        boardWidth - 1,
        boardHeight - 1,
        tileSize,
        rows,
        cols
      );
      expect(actual).toBeDefined();
      expect(actual.row).toEqual(rows - 1);
      expect(actual.col).toEqual(cols - 1);
    });
  }

  // Test with 6 rows and 6 columns
  testTileSystem(600, 600, 6, 6);

  // Test with 9 rows and 6 columns
  testTileSystem(600, 900, 9, 6);
});
