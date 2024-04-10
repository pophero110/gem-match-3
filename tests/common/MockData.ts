import TileEntity, { TileType } from "../../src/entities/TileEntity";
import { faker } from "@faker-js/faker";

const TileTypeArray = Object.values(TileType) as TileType[];

/**
 * @param pattern  Number represents the TileType
 * @returns
 */
export function createMockTileEntityGridFromPattern(
  pattern: number[][]
): TileEntity[][] {
  const rows = pattern.length;
  const cols = pattern[0].length;
  const grid: TileEntity[][] = [];

  // Generate the grid
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      const tileEntity = createMockTileEntity();
      tileEntity.type = TileTypeArray[pattern[row][col]];
      grid[row][col] = tileEntity;
    }
  }

  return grid;
}

export function createMockTileEntityGrid() {
  const rows = 6;
  const cols = 6;
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, createMockTileEntity)
  );
}

export function createMockTileEntity() {
  const x = faker.number.int({ max: 600 });
  const y = faker.number.int({ max: 600 });
  const size = 100;
  return new TileEntity(createMockScene(), x, y, size);
}

export const createMockSprite = (): any => {
  return {
    x: faker.number.int({ max: 600 }),
    y: faker.number.int({ max: 600 }),
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
    scale: { width: screenWidth, height: screenHeight },
    add: {
      existing: jest.fn(),
      sprite: jest.fn(() => createMockSprite()),
      graphics: jest.fn(() => createMockGraphics()),
    },
    physics: {
      add: {
        sprite: jest.fn(() => createMockSprite()),
      },
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
