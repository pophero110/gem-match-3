import {
  markMatches,
  markHorizontalMatches,
  markVerticalMatches,
} from "../../src/helpers/MarkMatches";
import {
  createMockGameScene,
  createMockTileEntityGridFromPattern,
} from "../common/MockData";

describe("mark matches", () => {
  const emtpyRemovalGrid = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];
  const rows = 6;
  const cols = 6;
  const createRemovalGrid = () =>
    Array.from({ length: rows }, () => Array(cols).fill(0));

  it("should mark horizontal and vertical matches", () => {
    const removalGrid = createRemovalGrid();
    const tileTypePattern: number[][] = [
      [1, 1, 1, 0, 2, 0],
      [1, 0, 2, 2, 0, 0],
      [2, 3, 1, 2, 3, 3],
      [2, 2, 2, 2, 2, 2],
      [3, 2, 2, 1, 0, 0],
      [3, 2, 1, 2, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);
    const gameScene = createMockGameScene();
    gameScene.tileEntityGrid = tileEntityGrid;
    gameScene.removalGrid = removalGrid;

    markMatches(gameScene);

    const expectedRemovalGrid = [
      [1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [1, 2, 1, 2, 1, 1],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
    ];

    expect(removalGrid).toEqual(expectedRemovalGrid);
  });

  describe("mark horizontal match", () => {
    it("should mark horizontal matches in removal tile grid", () => {
      const removalGrid = createRemovalGrid();
      const tileTypePattern: number[][] = [
        [1, 1, 1, 0, 2, 0],
        [1, 0, 2, 2, 2, 0],
        [2, 3, 1, 3, 3, 3],
        [2, 2, 2, 2, 2, 2],
        [3, 2, 2, 1, 0, 0],
        [3, 2, 1, 2, 0, 0],
      ];
      const tileEntityGrid =
        createMockTileEntityGridFromPattern(tileTypePattern);

      markHorizontalMatches(tileEntityGrid, removalGrid);

      const expectedRemovalGrid = [
        [1, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      expect(removalGrid).toEqual(expectedRemovalGrid);
    });

    it("should not mark vertical matches in removal tile grid", () => {
      const removalGrid = createRemovalGrid();
      const tileTypePattern: number[][] = [
        [1, 2, 0, 0, 2, 0],
        [1, 2, 0, 2, 2, 0],
        [2, 2, 1, 1, 3, 3],
        [2, 2, 0, 3, 2, 2],
        [3, 2, 2, 1, 0, 0],
        [3, 2, 1, 2, 0, 0],
      ];
      const tileEntityGrid =
        createMockTileEntityGridFromPattern(tileTypePattern);

      markHorizontalMatches(tileEntityGrid, removalGrid);

      expect(removalGrid).toEqual(emtpyRemovalGrid);
    });
  });

  describe("mark vertical match", () => {
    it("should mark vertical matches in removal tile grid", () => {
      const removalGrid = createRemovalGrid();

      const tileTypePattern: number[][] = [
        [1, 3, 1, 0, 2, 0],
        [1, 0, 1, 2, 2, 0],
        [2, 3, 1, 3, 3, 3],
        [2, 2, 0, 0, 2, 2],
        [3, 2, 2, 1, 0, 0],
        [3, 2, 1, 2, 0, 0],
      ];
      const tileEntityGrid =
        createMockTileEntityGridFromPattern(tileTypePattern);

      markVerticalMatches(tileEntityGrid, removalGrid);

      const expectedRemovalGrid = [
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
      ];

      expect(removalGrid).toEqual(expectedRemovalGrid);
    });

    it("should not mark horizontal matches in removal tile grid", () => {
      const removalGrid = createRemovalGrid();

      const tileTypePattern: number[][] = [
        [1, 1, 1, 0, 2, 0],
        [1, 0, 2, 2, 2, 0],
        [2, 3, 1, 3, 3, 3],
        [2, 0, 2, 2, 2, 2],
        [3, 2, 2, 1, 0, 0],
        [3, 2, 1, 2, 0, 0],
      ];
      const tileEntityGrid =
        createMockTileEntityGridFromPattern(tileTypePattern);

      markVerticalMatches(tileEntityGrid, removalGrid);

      expect(removalGrid).toEqual(emtpyRemovalGrid);
    });
  });
});
