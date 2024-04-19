import { determineDirection, onSwapTile } from "../../helpers/OnSwapTile";
import { createMockGameScene } from "../common/MockData";

describe("determineDirection", () => {
  it("should swap first tile and second tile based on swap direction and tile position", () => {
    const pointer = { x: 0, y: 0 };
    const gameScene = createMockGameScene();
    gameScene.canSwapTile = true;
    gameScene.canSelectTile = true;
    gameScene.selectedTile = gameScene.tileEntityGrid[0][1];
    const firstTile = gameScene.tileEntityGrid[0][0];
    const secondTile = gameScene.tileEntityGrid[0][1];

    const actual = onSwapTile.bind(gameScene, pointer);
    actual();

    expect(gameScene.canSelectTile).toBeFalsy();
    expect(gameScene.canSwapTile).toBeFalsy();
    expect(gameScene.selectedTile).toBeNull();
    expect(gameScene.tileEntityGrid[0][0]).toEqual(secondTile);
    expect(gameScene.tileEntityGrid[0][1]).toEqual(firstTile);
  });

  it("should return correct direction", () => {
    expect(determineDirection(10, 5)).toBe("right");
    expect(determineDirection(-10, 5)).toBe("left");
    expect(determineDirection(5, 10)).toBe("down");
    expect(determineDirection(5, -10)).toBe("up");
  });
});
