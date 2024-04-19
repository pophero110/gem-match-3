import { onSelectTile } from "../../helpers/OnSelectTile";
import { createMockGameScene } from "../common/MockData";

describe("Set Selected Tile", () => {
  it("should set selected tile based on pointer position", () => {
    const gameScene = createMockGameScene();
    const pointer = { x: 0, y: 0 };

    expect(gameScene.selectedTile).toBeNull();

    onSelectTile.call(gameScene, pointer);

    const expected = gameScene.tileEntityGrid[0][0];

    expect(gameScene.selectedTile).toBeDefined();
    expect(gameScene.selectedTile).toEqual(expected);
    expect(gameScene.canSwapTile).toBeTruthy();
  });

  it("should set selected tile based on pointer position", () => {
    const gameScene = createMockGameScene();
    const pointer = { x: 100, y: 100 };

    expect(gameScene.selectedTile).toBeNull();

    onSelectTile.call(gameScene, pointer);

    const expected = gameScene.tileEntityGrid[1][1];

    expect(gameScene.selectedTile).toBeDefined();
    expect(gameScene.selectedTile).toEqual(expected);
    expect(gameScene.canSwapTile).toBeTruthy();
  });

  it("should set selected tile based on pointer position", () => {
    const gameScene = createMockGameScene();
    const pointer = { x: 100, y: 100 };

    expect(gameScene.selectedTile).toBeNull();

    onSelectTile.call(gameScene, pointer);

    const expected = gameScene.tileEntityGrid[1][1];

    expect(gameScene.selectedTile).toBeDefined();
    expect(gameScene.selectedTile).toEqual(expected);
    expect(gameScene.canSwapTile).toBeTruthy();
  });

  it("should set selected tile to null when pointer is outside of board", () => {
    const gameScene = createMockGameScene();
    const pointer = { x: 600, y: 600 };

    expect(gameScene.selectedTile).toBeNull();

    onSelectTile.call(gameScene, pointer);

    expect(gameScene.selectedTile).toBeNull();
    expect(gameScene.canSwapTile).toBeTruthy();
  });
});
