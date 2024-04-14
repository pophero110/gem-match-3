import TileEntity, { TileType } from "../../src/entities/TileEntity";
import { faker } from "@faker-js/faker";
import { GameConfig } from "../../src/scenes/GameScene";
import { calculateTileCenter } from "../../src/helpers/PositionUtils";

const TileTypeArray = Object.values(TileType) as TileType[];

/**
 * @param tileTypeGrid  Number represents the TileType
 * @returns
 */
export function createMockTileEntityGridFromPattern(
  tileTypeGrid: number[][],
  isEmpty: boolean = false
): TileEntity[][] {
  const rows = tileTypeGrid.length;
  const cols = tileTypeGrid[0].length;
  const grid: TileEntity[][] = [];

  // Generate the grid
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      const tileEntity = createMockTileEntityWithPosition(row, col);
      tileEntity.type = TileTypeArray[tileTypeGrid[row][col]];
      tileEntity.isEmpty = isEmpty;
      grid[row][col] = tileEntity;
    }
  }

  return grid;
}

export function createMockTileEntityGrid(): TileEntity[][] {
  const rows = 6;
  const cols = 6;
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) =>
      createMockTileEntityWithPosition(row, col)
    )
  );
}

export function createMockTileEntityWithPosition(row, col) {
  const tileSize = 100;
  const { x, y } = calculateTileCenter(row, col, tileSize);
  return new TileEntity(createMockScene(), x, y, tileSize);
}

export const createMockSprite = (x, y): any => {
  return {
    x,
    y,
    setX: jest.fn(),
    setY: jest.fn(),
    setTexture: jest.fn(),
    setFrame: jest.fn(),
    setInteractive: jest.fn(),
    on: jest.fn(),
    setOrigin: jest.fn(),
    setSize: jest.fn(),
    setDisplaySize: jest.fn(),
    setCollideWorldBounds: jest.fn(),
    setImmovable: jest.fn(),
  };
};

export const createMockScene = (): any => {
  const screenWidth = 600;
  const screenHeight = 600;
  return {
    tweens: {
      add: jest.fn(),
    },
    scale: { width: screenWidth, height: screenHeight },
    add: {
      existing: jest.fn(),
      sprite: jest.fn((x, y) => createMockSprite(x, y)),
      graphics: jest.fn(() => createMockGraphics()),
    },
  };
};

export const createMockGraphics = () => {
  return {
    fillStyle: jest.fn(),
    fillRect: jest.fn(),
    setDepth: jest.fn(),
  };
};

export const createMockGameConfig = (): GameConfig => {
  return {
    scene: createMockScene(),
    boardEntity: null,
    tileEntityGrid: createMockTileEntityGrid(),
    boardRows: 6,
    boardCols: 6,
    boardWidth: 600,
    boardHeight: 600,
    tileSize: 600 / 6,
    selectedTile: null,
    removalGrid: null,
    swapSpeed: 200,
    shfitSpeed: 100,
    destroySpeed: 200,
  };
};
