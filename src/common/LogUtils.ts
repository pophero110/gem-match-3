import TileEntity from "../entities/TileEntity";

export function log(message: any) {
  const style = "color: blue; font-family:sans-serif; font-size: 20px";
  console.log("%c" + message, style);
}
export function logTileEntityGridBy(
  fieldName: string,
  tileEntityGrid: TileEntity[][],
  message?: string
) {
  log(message);
  console.table(
    tileEntityGrid.map((rows) => {
      const rowObject = {};
      rows.forEach((tile, index) => {
        rowObject[`Column ${index}`] = tile[fieldName] ? 0 : 1;
      });
      return rowObject;
    })
  );
}

export function logSprites(tileEntityGrid: TileEntity[][], message) {
  log(message);
  console.table(
    tileEntityGrid.map((rows) => {
      const rowObject = {};
      rows.forEach((tile, index) => {
        let sprite = tile.sprite;
        rowObject[`Column ${index}`] = `${sprite.x},${sprite.y}`;
      });
      return rowObject;
    })
  );
}
