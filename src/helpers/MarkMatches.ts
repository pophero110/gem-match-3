import { log } from "../common/LogUtils";
import TileEntity from "../entities/TileEntity";
import { GameConfig } from "../scenes/GameScene";

const MIN_STREAK_COUNT = 3;

export function markMatches(gameConfig: GameConfig) {
  markHorizontalMatches(gameConfig.tileEntityGrid, gameConfig.removalGrid);
  markVerticalMatches(gameConfig.tileEntityGrid, gameConfig.removalGrid);

  log("After Mark Matches");
  console.table(gameConfig.removalGrid);
}

export function markHorizontalMatches(
  tileEntityGrid: TileEntity[][],
  removalGrid: number[][]
) {
  for (let row = 0; row < tileEntityGrid.length; row++) {
    let streakCount = 1;
    let streakStartCol = 0;
    let previousTile;
    let currentTile;
    for (let col = 1; col < tileEntityGrid[0].length; col++) {
      previousTile = tileEntityGrid[row][col - 1];
      currentTile = tileEntityGrid[row][col];

      if (isSameTileType(currentTile, previousTile)) {
        streakCount++;
      }

      if (
        isNotSameTileType(currentTile, previousTile) ||
        isLastCol(col, tileEntityGrid[0].length)
      ) {
        handleHorizontalStreak(row, streakStartCol, streakCount, removalGrid);

        // Reset the streak start column and count
        streakStartCol = col;
        streakCount = 1;
      }
    }
  }
}

function isLastCol(col, cols) {
  return col === cols - 1;
}

function isSameTileType(tileEntityA: TileEntity, tileEntityB: TileEntity) {
  return tileEntityA.type === tileEntityB.type;
}

function isNotSameTileType(tileEntityA: TileEntity, tileEntityB: TileEntity) {
  return !isSameTileType(tileEntityA, tileEntityB);
}

function handleHorizontalStreak(
  row: number,
  startStreakCol: number,
  streakCount: number,
  removalGrid: number[][]
) {
  if (streakCount >= MIN_STREAK_COUNT) {
    for (let k = 0; k < streakCount; k++) {
      removalGrid[row][startStreakCol + k]++;
    }
  }
}

export function markVerticalMatches(
  tileEntityGrid: TileEntity[][],
  removalGrid: number[][]
) {
  for (let col = 0; col < tileEntityGrid[0].length; col++) {
    let streakCount = 1;
    let streakStartRow = 0;
    let previousTile;
    let currentTile;
    for (let row = 1; row < tileEntityGrid.length; row++) {
      previousTile = tileEntityGrid[row - 1][col];
      currentTile = tileEntityGrid[row][col];

      if (isSameTileType(currentTile, previousTile)) {
        streakCount++;
      }

      if (
        isNotSameTileType(currentTile, previousTile) ||
        isLastRow(row, tileEntityGrid.length)
      ) {
        handleVerticalStreak(col, streakStartRow, streakCount, removalGrid);

        // Reset the streak start row and count
        streakStartRow = row;
        streakCount = 1;
      }
    }
  }
}

function isLastRow(row, rows) {
  return row === rows - 1;
}

function handleVerticalStreak(
  col: number,
  startStreakRow: number,
  streakCount: number,
  removalGrid: number[][]
) {
  if (streakCount >= MIN_STREAK_COUNT) {
    for (let k = 0; k < streakCount; k++) {
      removalGrid[startStreakRow + k][col]++;
    }
  }
}
