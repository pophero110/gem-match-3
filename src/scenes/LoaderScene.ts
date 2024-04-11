export default class LoaderScene extends Phaser.Scene {
  public preload() {
    this.load.image("tiles", "./assets/images/tiles.png");
    this.load.audio("jump", "./assets/audio/jump.mp3");
    this.load.spritesheet("player", "./assets/gems.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  public create() {
    this.scene.start("game");
  }
}
