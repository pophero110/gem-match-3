import { onSelectTile } from "../../src/helpers/OnSelectTile";
import { createMockGameConfig } from "../common/MockData";

describe("Set Selected Tile", () => {
  it("should set selected tile based on pointer position", () => {
    const gameConfig = createMockGameConfig();
    const pointer = { x: 0, y: 0 };

    expect(gameConfig.selectedTile).toBeNull();

    const bind = onSelectTile.bind({ gameConfig }, pointer);
    bind();

    const expected = gameConfig.tileEntityGrid[0][0];

    expect(gameConfig.selectedTile).toBeDefined();
    expect(gameConfig.selectedTile).toEqual(expected);
  });

  it("should set selected tile based on pointer position", () => {
    const gameConfig = createMockGameConfig();
    const pointer = { x: 100, y: 100 };

    expect(gameConfig.selectedTile).toBeNull();

    const bind = onSelectTile.bind({ gameConfig }, pointer);
    bind();

    const expected = gameConfig.tileEntityGrid[1][1];

    expect(gameConfig.selectedTile).toBeDefined();
    expect(gameConfig.selectedTile).toEqual(expected);
  });

  it("should set selected tile based on pointer position", () => {
    const gameConfig = createMockGameConfig();
    const pointer = { x: 100, y: 100 };

    expect(gameConfig.selectedTile).toBeNull();

    const bind = onSelectTile.bind({ gameConfig }, pointer);
    bind();

    const expected = gameConfig.tileEntityGrid[1][1];

    expect(gameConfig.selectedTile).toBeDefined();
    expect(gameConfig.selectedTile).toEqual(expected);
  });

  it("should set selected tile to null when pointer is outside of board", () => {
    const gameConfig = createMockGameConfig();
    const pointer = { x: 600, y: 600 };

    expect(gameConfig.selectedTile).toBeNull();

    const bind = onSelectTile.bind({ gameConfig }, pointer);
    bind();

    const expected = gameConfig.tileEntityGrid[1][1];

    expect(gameConfig.selectedTile).toBeNull();
  });
});
