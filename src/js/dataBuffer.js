// Data array that buffers the data from the file
// (could be substituted by a database or stored in client side storage)
const dataBuffer = [];

export function setDataBuffer(newData) {
  dataBuffer.length = 0; // clear array
  newData.forEach((dataRow) => dataBuffer.push(dataRow));
}

export function addDataRow(newDataRow) {
  dataBuffer.push(newDataRow);
}

export function editDataCell(newCellValue, rowIndex, cellIndex) {
  dataBuffer[rowIndex][cellIndex] = newCellValue;
}
