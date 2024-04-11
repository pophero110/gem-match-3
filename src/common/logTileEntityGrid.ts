import TileEntity from "../entities/TileEntity";

export function logTileEntityGridBy(
  fieldName: string,
  tileEntityGrid: TileEntity[][],
  message?: string
) {
  console.info(message);
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
