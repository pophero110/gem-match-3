import { Component } from "./Component";

export default class SpriteComponent extends Component {
  sprite: Phaser.GameObjects.Sprite;
  constructor(sprite: Phaser.GameObjects.Sprite) {
    super();
    this.sprite = sprite;
  }
}
