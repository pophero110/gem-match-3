import { Component } from "../components/Component";
import { v4 as uuidv4 } from "uuid";
export class Entity {
  id: string = uuidv4();
  private components: Map<new (...args: any[]) => Component, Component>;
  constructor() {
    this.components = new Map();
  }
  addComponent(component: Component): void {
    this.components.set(
      component.constructor as new (...args: any[]) => Component,
      component
    );
  }
  getComponent<T extends Component>(
    componentType: new (...args: any[]) => T
  ): T | undefined {
    return this.components.get(componentType) as T | undefined;
  }
  removeComponent(componentType: new (...args: any[]) => Component): void {
    this.components.delete(componentType);
  }
  getComponents(): Component[] {
    return Array.from(this.components.values());
  }
}
