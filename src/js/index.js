import '../styles/page.less';

import * as Papa from 'papaparse';

import readCSVFileAsync from './fileReader';
import * as tableCreator from './tableCreator';
import * as recordCreator from './recordCreator';
import * as dataBuffer from './dataBuffer';
import * as dataAnalyzer from './dataAnalyzer';

// Creation of elements

// top level div elements
const div = document.createElement('div');
const fileManagementDiv = document.createElement('div');

fileManagementDiv.id = 'file-management';

// upload elements
const uploadDiv = document.createElement('div');
const fileInput = document.createElement('input');
const uploadButton = document.createElement('button');
const uploadText = document.createElement('span');

uploadText.innerHTML = 'Select a .csv file from your local disk';
fileInput.type = 'file';
fileInput.accept = '.csv';
uploadButton.innerHTML = 'Upload';

// download elements
const downloadDiv = document.createElement('div');
const downloadText = document.createElement('span');
const downloadButton = document.createElement('button');

downloadText.innerHTML = 'Download data as .csv file';
downloadButton.innerHTML = 'Download';
downloadButton.disabled = true;

// create new record elements
const createRecordDiv = document.createElement('div');
const createRecordButton = document.createElement('button');

createRecordDiv.id = 'create-record-div';
createRecordDiv.style.display = 'none';
createRecordButton.innerHTML = 'Create a new record';
createRecordButton.id = 'create-record-button';

// table element
const table = document.createElement('table');

table.id = 'csv-table';
table.className = 'csv';

// Event Listeners
uploadButton.addEventListener('click', async () => {
  uploadButton.disabled = true;

  // get file name
  const fileName = fileInput.value.split(/(\\|\/)/g).pop();
  dataBuffer.setFileNameBuffer(fileName);

  const fileContent = await readCSVFileAsync(fileInput.files[0]);

  if (fileContent) {
    const parsedFileContent = Papa.parse(fileContent);
    const { data } = parsedFileContent;
    const columnNames = data[0];

    // remove empty lines
    data.forEach((dataRow, index) => {
      if (dataRow.length <= 1) {
        data.splice(index, 1);
      }
    });

    tableCreator.createTable(data);
    recordCreator.setColumnNames(columnNames);
    dataBuffer.setDataBuffer(data);

    // TODO: Make this a pie chart
    const dataRowSizePercentages = dataAnalyzer.getDataRowPercentages();

    // TODO: Make this a bar chart
    const columnSizePercentages = dataAnalyzer.getColumnPercentages();

    console.log('dataRowSizePercentages', dataRowSizePercentages);
    console.log('columnSizePercentages', columnSizePercentages);

    downloadButton.disabled = false;
  }

  uploadButton.disabled = false;
});

downloadButton.addEventListener('click', () => {
  const csvData = Papa.unparse(dataBuffer.getDataBuffer(), {
    quotes: false,
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ';',
    header: true,
    newline: '\r\n',
    skipEmptyLines: false,
    columns: null,
  });

  const a = document.createElement('a');

  a.href = `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURIComponent(csvData)}`;
  a.download = `${dataBuffer.getFileNameOnly()} new.csv`;

  a.style.display = 'none';
  document.body.appendChild(a);

  a.click();
  document.body.removeChild(a);
});

createRecordButton.addEventListener('click', recordCreator.createRecord);

// Append it all together

// Upload
uploadDiv.appendChild(uploadText);
uploadDiv.appendChild(document.createElement('br'));
uploadDiv.appendChild(document.createElement('br'));
uploadDiv.appendChild(fileInput);
uploadDiv.appendChild(uploadButton);

// Download
downloadDiv.appendChild(downloadText);
downloadDiv.appendChild(document.createElement('br'));
downloadDiv.appendChild(document.createElement('br'));
downloadDiv.appendChild(downloadButton);

// Create
createRecordDiv.appendChild(createRecordButton);

// Top level
fileManagementDiv.appendChild(uploadDiv);
fileManagementDiv.appendChild(downloadDiv);

div.appendChild(fileManagementDiv);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(createRecordDiv);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(table);

document.body.appendChild(div);
