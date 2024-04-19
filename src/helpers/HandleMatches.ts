import TileEntity from "../entities/TileEntity";
import GameScene from "../scenes/GameScene";
import { destoryMatches } from "./DestoryMatches";
import { markMatches } from "./MarkMatches";

export default function handleMatches(gameScene: GameScene) {
  if (hasMatchesInBoard(gameScene.tileEntityGrid)) {
    gameScene.canSelectTile = false;
    markMatches(gameScene);
    destoryMatches(gameScene);
  } else {
    gameScene.canSelectTile = true;
  }
}

export function hasMatchesInBoard(tileEntityGrid: TileEntity[][]): boolean {
  for (let row = 0; row < tileEntityGrid.length; row++) {
    for (let col = 0; col < tileEntityGrid[0].length; col++) {
      if (isMatch(row, col)) {
        return true;
      }
    }
  }
  return false;

  function isMatch(row, col) {
    return isHorizontalMatch(row, col) || isVerticalMatch(row, col);
  }

  function isHorizontalMatch(row, col) {
    return (
      col + 2 < tileEntityGrid[0].length &&
      tileEntityGrid[row][col].type == tileEntityGrid[row][col + 1].type &&
      tileEntityGrid[row][col].type == tileEntityGrid[row][col + 2].type
    );
  }

  function isVerticalMatch(row, col) {
    return (
      row + 2 < tileEntityGrid.length &&
      tileEntityGrid[row][col].type == tileEntityGrid[row + 1][col].type &&
      tileEntityGrid[row][col].type == tileEntityGrid[row + 2][col].type
    );
  }
}
