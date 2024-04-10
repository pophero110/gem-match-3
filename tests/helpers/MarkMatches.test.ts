import { TileType } from "../../src/entities/TileEntity";
import { createMockTileEntityGridFromPattern } from "../common/MockData";

const rows = 6;
const cols = 6;
const tileTypePattern: number[][] = [
  [1, 1, 1, 0, 2, 0],
  [1, 0, 2, 2, 2, 0],
  [2, 3, 1, 3, 3, 3],
  [2, 2, 2, 2, 2, 2],
  [3, 2, 2, 1, 0, 0],
  [3, 2, 1, 2, 0, 0],
];
const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);
const removalGrid: number[][] = Array.from({ length: rows }, () =>
  Array(rows).fill(0)
);
const MIN_STREAK_COUNT = 3;

function markHorizontalMatches() {
  for (let row = 0; row < rows; row++) {
    let streakCount = 1;
    let streakStartCol = 0;
    let previousTileType;
    let currentTileType;
    for (let col = 1; col < cols; col++) {
      previousTileType = tileEntityGrid[row][col - 1].type;
      currentTileType = tileEntityGrid[row][col].type;

      if (isSameTileType(currentTileType, previousTileType)) {
        streakCount++;
      }

      if (
        !isSameTileType(currentTileType, previousTileType) ||
        isLastColInRow(col)
      ) {
        handleStreak(row, streakStartCol, streakCount);

        // Reset the streak start column and count
        streakStartCol = col;
        streakCount = 1;
      }
    }
  }
}

function isLastColInRow(col) {
  return col === cols - 1;
}

function isSameTileType(typeA: TileType, typeB: TileType) {
  return typeA === typeB;
}

function handleStreak(
  row: number,
  startStreakCol: number,
  streakCount: number
) {
  if (streakCount >= MIN_STREAK_COUNT) {
    for (let k = 0; k < streakCount; k++) {
      removalGrid[row][startStreakCol + k]++;
    }
  }
}

describe("markMatches", () => {
  it("should mark horizontal matches in removal tile grid", () => {
    markHorizontalMatches();

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
});
