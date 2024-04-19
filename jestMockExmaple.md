```
import { onSwapTile, determineDirection, animateSwappedTile } from './YourFileName';
import TileEntity from '../entities/TileEntity';
import swapTile from './SwapTile';
import GameScene from '../scenes/GameScene';
import { findTileIndicesByPosition } from './OnSelectTile';
import handleMatches from './HandleMatches';

// Mock Phaser.Input.Pointer
const mockPointer = {
  x: 100,
  y: 100,
};

// Mock GameScene
const mockGameScene: GameScene = {
  canSwapTile: true,
  selectedTile: { sprite: { x: 50, y: 50 } } as TileEntity,
  canSelectTile: true,
  tileSize: 50,
  boardRows: 6,
  boardCols: 6,
  boardEntity: { x: 0, y: 0 },
  tileEntityGrid: [[]],
  swapSpeed: 200,
  tweens: { add: jest.fn() },
};

// Mock helper functions
jest.mock('./SwapTile', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./OnSelectTile', () => ({
  __esModule: true,
  findTileIndicesByPosition: jest.fn().mockReturnValue({ row: 0, col: 0 }),
}));

jest.mock('./HandleMatches', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('onSwapTile', () => {
  it('should not swap tiles if canSwapTile is false', () => {
    const gameScene = { ...mockGameScene, canSwapTile: false };
    onSwapTile.call(gameScene, mockPointer);
    expect(swapTile).not.toHaveBeenCalled();
  });

  it('should not swap tiles if selectedTile is null', () => {
    const gameScene = { ...mockGameScene, selectedTile: null };
    onSwapTile.call(gameScene, mockPointer);
    expect(swapTile).not.toHaveBeenCalled();
  });

  it('should not swap tiles if pointer movement does not exceed the threshold', () => {
    const gameScene = { ...mockGameScene };
    const pointer = { x: 55, y: 55 };
    onSwapTile.call(gameScene, pointer);
    expect(swapTile).not.toHaveBeenCalled();
  });

  it('should swap tiles if conditions are met', () => {
    const gameScene = { ...mockGameScene };
    onSwapTile.call(gameScene, mockPointer);
    expect(swapTile).toHaveBeenCalled();
  });

  it('should call handleMatches after swapping tiles', () => {
    const gameScene = { ...mockGameScene };
    onSwapTile.call(gameScene, mockPointer);
    expect(handleMatches).toHaveBeenCalled();
  });
});

describe('determineDirection', () => {
  it('should return "right" if deltaX > deltaY', () => {
    expect(determineDirection(10, 5)).toBe('right');
  });

  it('should return "left" if deltaX < deltaY', () => {
    expect(determineDirection(-10, 5)).toBe('left');
  });

  it('should return "down" if deltaY > deltaX', () => {
    expect(determineDirection(5, 10)).toBe('down');
  });

  it('should return "up" if deltaY < deltaX', () => {
    expect(determineDirection(5, -10)).toBe('up');
  });

  it('should return null if deltaX equals deltaY', () => {
    expect(determineDirection(5, 5)).toBeNull();
  });
});

describe('animateSwappedTile', () => {
  it('should add tweens for both source and destination tiles', () => {
    const sourceTile = { sprite: { x: 50, y: 50 } } as TileEntity;
    const destinationTile = { sprite: { x: 100, y: 100 } } as TileEntity;
    animateSwappedTile(sourceTile, destinationTile, mockGameScene);
    expect(mockGameScene.tweens.add).toHaveBeenCalledTimes(2);
  });
});
```
