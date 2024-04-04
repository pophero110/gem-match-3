/**
 * @jest-environment jsdom
 */
import TileEntity from "../../src/entities/TileEntity";
import { createSceneMock, createSpriteMock } from "../common/MockData";

describe("TileEntity", () => {
  it("should create a TileEntity with components", () => {
    // Arrange
    const x = 10;
    const y = 20;
    const width = 30;
    const height = 40;
    const row = 0;
    const col = 0;

    // Mock
    const sceneMock: any = createSceneMock();
    const spriteMock: any = createSpriteMock();

    // Act
    const tileEntity = new TileEntity(
      sceneMock,
      x,
      y,
      width,
      height,
      row,
      col,
      spriteMock
    );
  });
});
