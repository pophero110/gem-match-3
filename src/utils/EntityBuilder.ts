import PositionComponent from "../components/PositionComponent";
import SizeComponent from "../components/SizeComponent";
import { Entity } from "../entities/Entity";

class EntityBuilder {
  private entity: Entity;

  constructor() {
    this.entity = new Entity();
  }

  size(width: number, height: number): EntityBuilder {
    this.entity.addComponent(new SizeComponent(width, height));
    return this;
  }

  position(x: number, y: number): EntityBuilder {
    this.entity.addComponent(new PositionComponent(x, y));
    return this;
  }

  build(): Entity {
    return this.entity;
  }

  static create(): EntityBuilder {
    return new EntityBuilder();
  }
}
