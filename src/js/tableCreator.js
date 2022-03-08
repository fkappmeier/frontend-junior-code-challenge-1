import '../styles/table.less';

// Change new string in data buffer
function saveCellEdit(newString, cell) {
  const cellBuffer = cell;
  cellBuffer.innerHTML = newString;
  cellBuffer.editMode = false;

  // TODO: Save changes to data buffer
}

// Behavior of cell when clicked on
function tableCellOnClick(clickedCell) {
  const cell = clickedCell;

  if (cell.editMode) {
    return;
  }

  cell.editMode = true;

  const cellContent = cell.innerHTML;
  let textInput;

  cell.innerHTML = '';

  if (cellContent.length < 20) {
    textInput = document.createElement('input');
  } else {
    textInput = document.createElement('textarea');
  }

  textInput.value = cellContent;
  cell.appendChild(textInput);
  cell.appendChild(document.createElement('br'));

  const saveButton = document.createElement('button');
  const cancelButton = document.createElement('button');
  saveButton.innerHTML = 'Save';
  cancelButton.innerHTML = 'Cancel';

  saveButton.addEventListener('click', () => {
    saveButton.disabled = true;
    cancelButton.disabled = true;
    saveCellEdit(textInput.value, cell);
  });

  cancelButton.addEventListener('click', () => {
    saveButton.disabled = true;
    cancelButton.disabled = true;
    cell.innerHTML = cellContent;
    cell.editMode = false;
  });

  cell.appendChild(saveButton);
  cell.appendChild(cancelButton);
}

// Creates the table from data read from the csv file
export function createTable(data) {
  const table = document.getElementById('csv-table');
  table.style.display = 'none';
  table.innerHTML = ''; // clear all previous children of table

  data.forEach((dataRow, index) => {
    const tableRow = document.createElement('tr');
    if (index === 0) {
      dataRow.forEach((dataCell) => {
        const tableHeader = document.createElement('th');
        tableHeader.innerHTML = dataCell;
        tableHeader.addEventListener('click', (event) => {
          // prohibits children of cell from inhereting this event listener
          if (event.target === event.currentTarget) {
            tableCellOnClick(event.target);
          }
        });
        tableRow.appendChild(tableHeader);
      });
    } else {
      dataRow.forEach((dataCell) => {
        const tableData = document.createElement('td');
        tableData.innerHTML = dataCell;
        tableData.addEventListener('click', (event) => {
          // prohibits children of cell from inhereting this event listener
          if (event.target === event.currentTarget) {
            tableCellOnClick(event.target);
          }
        });
        tableRow.appendChild(tableData);
      });
    }

    table.appendChild(tableRow);
  });

  table.style.display = '';
  document.getElementById('create-record-div').style.display = '';
}

// Adds a table row to the bottom of the table
export function addTableRow(dataRow) {
  const table = document.getElementById('csv-table');
  const tableRow = document.createElement('tr');

  dataRow.forEach((dataCell) => {
    const tableData = document.createElement('td');
    tableData.innerHTML = dataCell;
    tableRow.appendChild(tableData);
  });

  table.appendChild(tableRow);
}
