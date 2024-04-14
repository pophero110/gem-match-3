import { determineDirection } from "../../src/helpers/OnSwapTile";

describe("determineDirection", () => {
  it("should return correct direction", () => {
    expect(determineDirection(10, 5)).toBe("right");
    expect(determineDirection(-10, 5)).toBe("left");
    expect(determineDirection(5, 10)).toBe("down");
    expect(determineDirection(5, -10)).toBe("up");
  });
});
