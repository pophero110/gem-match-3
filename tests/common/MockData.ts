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
  const x = faker.number.int({ max: 100 });
  const y = faker.number.int({ max: 100 });
  const row = faker.number.int({ max: 6 });
  const col = faker.number.int({ max: 6 });
  const size = 100;
  return new TileEntity(createMockScene(), x, y, size, row, col);
}

export const createMockSprite = (): any => {
  return {
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
  return {
    add: {
      existing: jest.fn(),
      sprite: jest.fn(() => createMockSprite()),
    },
    physics: {
      add: {
        sprite: jest.fn(() => createMockSprite()),
      },
    },
  };
};
