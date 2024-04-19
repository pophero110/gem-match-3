import GameScene from "../../scenes/GameScene";
import {
  createMockScale,
  createMockSceneAdd,
  createMockTileEntityGridFromPattern,
  createMockTweens,
} from "../common/MockData";

describe("Game Scene", () => {
  it("should enable tile selection when has no matches in board", () => {
    const gameScene = new GameScene();
    const tileTypePattern: number[][] = [
      [1, 3, 1, 0, 2, 0],
      [1, 0, 3, 2, 2, 0],
      [2, 3, 1, 3, 0, 3],
      [2, 2, 0, 0, 2, 2],
      [3, 1, 2, 1, 0, 0],
      [3, 2, 1, 2, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);
    gameScene.createTileEntityGrid = () => tileEntityGrid;
    gameScene.add = createMockSceneAdd();
    gameScene.tweens = createMockTweens();
    gameScene.input = { on: jest.fn() } as any;
    gameScene.tweens = createMockTweens();
    gameScene.scale = createMockScale();

    expect(gameScene.canSelectTile).toBeFalsy();

    gameScene.create();

    expect(gameScene.canSelectTile).toBeTruthy();
  });

  it("should disable tile selection when has matches in board", () => {
    const gameScene = new GameScene();
    const tileTypePattern: number[][] = [
      [1, 3, 1, 0, 2, 0],
      [1, 0, 3, 2, 2, 0],
      [2, 3, 1, 3, 2, 3],
      [2, 2, 0, 0, 2, 2],
      [3, 1, 2, 1, 0, 0],
      [3, 2, 1, 2, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);
    gameScene.createTileEntityGrid = () => tileEntityGrid;
    gameScene.add = createMockSceneAdd();
    gameScene.tweens = createMockTweens();
    gameScene.input = { on: jest.fn() } as any;
    gameScene.tweens = createMockTweens();
    gameScene.scale = createMockScale();

    expect(gameScene.canSelectTile).toBeFalsy();

    gameScene.create();

    expect(gameScene.canSelectTile).toBeFalsy();
  });
});
