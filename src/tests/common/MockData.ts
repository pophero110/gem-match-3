import TileEntity, { TileType } from "../../entities/TileEntity";
import { calculateTileCenter } from "../../helpers/PositionUtils";
import GameScene from "../../scenes/GameScene";

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
  return {
    tweens: createMockTweens(),
    scale: createMockScale(),
    add: createMockSceneAdd(),
  };
};

export const createMockTweens = (): any => {
  return { add: jest.fn() };
};

export const createMockScale = (): any => {
  const screenWidth = 600;
  const screenHeight = 600;
  return { width: screenWidth, height: screenHeight };
};

export const createMockSceneAdd = (): any => {
  return {
    existing: jest.fn(),
    sprite: jest.fn((x, y) => createMockSprite(x, y)),
    graphics: jest.fn(() => createMockGraphics()),
  };
};

export const createMockGraphics = () => {
  return {
    fillStyle: jest.fn(),
    fillRect: jest.fn(),
    setDepth: jest.fn(),
  };
};

const createRemovalGrid = () =>
  Array.from({ length: 6 }, () => Array(6).fill(0));

export const createMockGameScene = (): GameScene => {
  return {
    boardEntity: null,
    tileEntityGrid: createMockTileEntityGrid(),
    boardRows: 6,
    boardCols: 6,
    boardWidth: 600,
    boardHeight: 600,
    tileSize: 600 / 6,
    selectedTile: null,
    removalGrid: createRemovalGrid(),
    swapSpeed: 200,
    shfitSpeed: 100,
    destroySpeed: 200,
    canSelectTile: true,
    canSwapTile: false,
    ...createMockScene(),
  };
};
