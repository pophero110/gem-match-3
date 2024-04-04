export default abstract class System {
  protected scene: Phaser.Scene;
  constructor(scnen: Phaser.Scene) {
    this.scene = scnen;
  }
}
