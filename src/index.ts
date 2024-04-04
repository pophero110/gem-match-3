import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  zoom: 1,
  input: {
    keyboard: true,
    gamepad: true,
  },
  render: {
    pixelArt: true,
    antialias: false,
    antialiasGL: false,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: -200,
      },
    },
  },
  scene: [LoaderScene, GameScene],
};

window.addEventListener("load", () => new Phaser.Game(config));
// resize();
// window.addEventListener("resize", resize, false);

// function resize() {
//   var canvas = document.querySelector("canvas");
//   var windowWidth = window.innerWidth;
//   var windowHeight = window.innerHeight;
//   var windowRatio = windowWidth / windowHeight;
//   var gameRatio = gameConfig.width / gameConfig.height;
//   if (windowRatio < gameRatio) {
//     canvas.style.width = windowWidth + "px";
//     canvas.style.height = windowWidth / gameRatio + "px";
//   } else {
//     canvas.style.width = windowHeight * gameRatio + "px";
//     canvas.style.height = windowHeight + "px";
//   }
// }
