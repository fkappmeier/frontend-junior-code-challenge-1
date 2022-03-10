import * as dataBuffer from './dataBuffer';

export function getDataRowPercentages() {
  const data = dataBuffer.getDataBuffer();

  const rowLength = data[0].length;
  const totalAmountOfRowSizesArray = [];

  // amount of counters needs to be amount of columns + 1
  for (let i = 0; i <= rowLength; i += 1) {
    totalAmountOfRowSizesArray[i] = 0;
  }

  data.forEach((dataRow) => {
    let currentRowCounter = 0;

    dataRow.forEach((dataCell) => {
      if (dataCell) {
        currentRowCounter += 1;
      }
    });

    totalAmountOfRowSizesArray[currentRowCounter] += 1;
  });

  const dataSize = data.length;
  const percentageAmountOfRowSizesArray = [];

  totalAmountOfRowSizesArray.forEach((totalAmount) => {
    percentageAmountOfRowSizesArray.push(totalAmount / dataSize);
  });

  return percentageAmountOfRowSizesArray;
}

export function getColumnPercentages() {
  const data = dataBuffer.getDataBuffer();

  const rowLength = data[0].length;
  const totalColumnSizesArray = [];

  for (let i = 0; i < rowLength; i += 1) {
    totalColumnSizesArray[i] = 0;
  }

  data.forEach((dataRow) => {
    dataRow.forEach((dataCell, index) => {
      if (dataCell) {
        totalColumnSizesArray[index] += 1;
      }
    });
  });

  const dataSize = data.length;
  const percentageColumnSizesArray = [];

  totalColumnSizesArray.forEach((totalAmount) => {
    percentageColumnSizesArray.push(totalAmount / dataSize);
  });

  return percentageColumnSizesArray;
}
