// import BoardEntity from "../entities/BoardEntity";
// import TileComponent from "../components/TileComponent";

// export default class TileMatchingSystem {
//   private board: BoardEntity;

//   constructor(board: BoardEntity) {
//     this.board = board;
//   }

//   public detectMatches(): void {
//     const rows = this.board.getRows();
//     const cols = this.board.getCols();

//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         const currentTileEntity = this.board.getTileEntityAt(row, col);
//         const type = currentTileEntity.getComponent(TileComponent).getType();

//         // Check horizontally
//         let horizontalMatchLength = 1;
//         for (let c = col + 1; c < cols; c++) {
//           const nextTile = this.board.getTileEntityAt(row, c);
//           const nextType = nextTile.getComponent(TileComponent).getType();
//           if (nextType === type) {
//             horizontalMatchLength++;
//           } else {
//             break;
//           }
//         }

//         // Check vertically
//         let verticalMatchLength = 1;
//         for (let r = row + 1; r < rows; r++) {
//           const nextTile = this.board.getTileEntityAt(r, col);
//           const nextType = nextTile.getComponent(TileComponent).getType();
//           if (nextType === type) {
//             verticalMatchLength++;
//           } else {
//             break;
//           }
//         }

//         // If there is a match, handle it
//         if (horizontalMatchLength >= 3 || verticalMatchLength >= 3) {
//           console.log(`Match found at (${row},${col})`);
//           // Handle the matched tiles here, for example, marking them as to be removed
//         }
//       }
//     }
//   }
// }
