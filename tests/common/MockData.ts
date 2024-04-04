import TileEntity from "../../src/entities/TileEntity";
import { faker } from "@faker-js/faker";
export function createTileEntity() {
  const x = faker.number.int({ max: 100 });
  const y = faker.number.int({ max: 100 });
  const row = faker.number.int({ max: 6 });
  const col = faker.number.int({ max: 6 });
  const width = 100;
  const height = 100;
  return new TileEntity(
    createSceneMock(),
    x,
    y,
    width,
    height,
    row,
    col,
    createSpriteMock()
  );
}

export const createSpriteMock = (): any => {
  return {
    setX: jest.fn(),
    setY: jest.fn(),
    setTexture: jest.fn(),
    setFrame: jest.fn(),
  };
};

export const createSceneMock = (): any => {
  return {};
};
