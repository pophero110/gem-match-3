import { Entity } from "../entities/Entity";

export interface System {
  update(entities: Entity[]): void;
}
