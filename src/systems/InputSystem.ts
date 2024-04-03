import { TileEntity } from "../entities/TileEntity";

export default class InputSystem {
  private scene: Phaser.Scene;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.addListener();
  }
  addListener() {
    // Variables to store pointer coordinates
    let startX: number;
    let startY: number;
    let input = this.scene.input;

    // Add pointer down event listener
    input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      startX = pointer.x;
      startY = pointer.y;
      console.log("pointer down", startX, startY);
    });

    // Add pointer up event listener
    input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      // Calculate the distance traveled by the pointer
      const deltaX = pointer.x - startX;
      const deltaY = pointer.y - startY;

      console.log("pointer up", deltaX, deltaY);

      // Set a threshold for swipe distance
      const threshold = 50; // Adjust this value as needed

      // Check if the distance traveled exceeds the threshold
      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        // Determine the direction of the swipe
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            // Swipe right
            handleSwipeRight();
          } else {
            // Swipe left
            handleSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            // Swipe down
            handleSwipeDown();
          } else {
            // Swipe up
            handleSwipeUp();
          }
        }
      }
    });

    // Functions to handle swipe actions
    function handleSwipeLeft() {
      console.log("swipe left");
    }

    function handleSwipeRight() {
      console.log("swipe right");
    }

    function handleSwipeUp() {
      console.log("swipe up");
    }

    function handleSwipeDown() {
      console.log("swipe down");
    }
  }
}
