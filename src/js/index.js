import * as Papa from 'papaparse';

import readCSVFileAsync from './fileReader';
import * as tableCreator from './tableCreator';
import * as recordCreator from './recordCreator';
import * as dataBuffer from './dataBuffer';

// Creation of elements
const div = document.createElement('div');
const fileInput = document.createElement('input');
const uploadButton = document.createElement('button');
const span = document.createElement('span');
const table = document.createElement('table');
const createRecordDiv = document.createElement('div');
const createRecordButton = document.createElement('button');

// Setting some attributes
span.innerHTML = 'Select a .csv file from your local disk';
fileInput.type = 'file';
fileInput.accept = '.csv';
uploadButton.innerHTML = 'Upload';
table.id = 'csv-table';
createRecordDiv.id = 'create-record-div';
createRecordDiv.style.display = 'none';
createRecordButton.innerHTML = 'Create a new record';
createRecordButton.id = 'create-record-button';

// Event Listeners
uploadButton.addEventListener('click', async () => {
  const fileContent = await readCSVFileAsync(fileInput.files[0]);

  if (fileContent) {
    const parsedFileContent = Papa.parse(fileContent);
    const { data } = parsedFileContent;
    tableCreator.createTable(data);
    recordCreator.setColumnNames(data[0]);
    dataBuffer.setDataBuffer(data);
  }
});

createRecordButton.addEventListener('click', recordCreator.createRecord);

// Append it all together
div.appendChild(span);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(fileInput);
div.appendChild(uploadButton);

createRecordDiv.appendChild(createRecordButton);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(createRecordDiv);

div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(table);

document.body.appendChild(div);
