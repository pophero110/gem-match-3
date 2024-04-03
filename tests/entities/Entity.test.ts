import { Component } from "../../src/components/Component";
import { Entity } from "../../src/entities/Entity";

class TestTileComponent implements Component {
  constructor(public value: string) {}
}

class TestBoardComponent implements Component {
  constructor(public value: string) {}
}

describe("Entity", () => {
  let entity: Entity;

  beforeEach(() => {
    entity = new Entity();
  });

  test("addComponent should add a component to the entity", () => {
    const component = new TestTileComponent("test");
    entity.addComponent(component);
    expect(entity.getComponent(TestTileComponent)).toEqual(component);
  });

  test("getComponent should return undefined if component is not present", () => {
    expect(entity.getComponent(TestTileComponent)).toBeUndefined();
  });

  test("removeComponent should remove a component from the entity", () => {
    const component = new TestTileComponent("test");
    entity.addComponent(component);
    expect(entity.getComponent(TestTileComponent)).toEqual(component);
    entity.removeComponent(TestTileComponent);
    expect(entity.getComponent(TestTileComponent)).toBeUndefined();
  });

  test("getComponents should return an array of components", () => {
    const testTileComponent = new TestTileComponent("tile");
    const testBoardComponent = new TestBoardComponent("board");
    entity.addComponent(testTileComponent);
    entity.addComponent(testBoardComponent);
    expect(entity.getComponents()).toEqual([
      testTileComponent,
      testBoardComponent,
    ]);
  });
});
