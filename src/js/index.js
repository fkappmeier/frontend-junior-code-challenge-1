import '../styles/page.less';

import * as Papa from 'papaparse';

import readCSVFileAsync from './fileReader';
import * as tableCreator from './tableCreator';
import * as recordCreator from './recordCreator';
import * as dataBuffer from './dataBuffer';
import * as dataAnalyzer from './dataAnalyzer';
import * as chartDrawer from './chartDrawer';

// Creation of elements

// top level div elements
const div = document.createElement('div');
const fileManagementDiv = document.createElement('div');
const chartManagementDiv = document.createElement('div');

fileManagementDiv.className = 'flex-container';
chartManagementDiv.className = 'flex-container';

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

// chart elements
const barChartDiv = document.createElement('div');
const pieChartDiv = document.createElement('div');
const barCanvas = document.createElement('canvas');
const pieCanvas = document.createElement('canvas');
const pieChartLabel = document.createElement('span');

barChartDiv.style.display = 'none';
pieChartDiv.style.display = 'none';

barCanvas.width = 400;
barCanvas.height = 400;
pieCanvas.width = 400;
pieCanvas.height = 400;
barCanvas.id = 'bar-chart-canvas';
pieCanvas.id = 'pie-chart-canvas';

pieChartLabel.id = 'pie-chart-label';
pieChartLabel.innerHTML = '% of Rows with X filled in Fields';

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

    // percentage values for bar chart
    const columnSizePercentages = dataAnalyzer.getColumnPercentages();

    // percentage values for pie chart
    const dataRowSizePercentages = dataAnalyzer.getDataRowPercentages();

    barChartDiv.style.display = '';
    pieChartDiv.style.display = '';

    chartDrawer.drawBarChart(columnSizePercentages, columnNames);
    chartDrawer.drawPieChart(dataRowSizePercentages);

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

// Charts
pieChartDiv.appendChild(pieChartLabel);
pieChartDiv.appendChild(pieCanvas);

barChartDiv.appendChild(barCanvas);

// Create
createRecordDiv.appendChild(createRecordButton);

// Top level
fileManagementDiv.appendChild(uploadDiv);
fileManagementDiv.appendChild(downloadDiv);

chartManagementDiv.appendChild(barChartDiv);
chartManagementDiv.appendChild(pieChartDiv);

div.appendChild(fileManagementDiv);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));

div.appendChild(chartManagementDiv);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));

div.appendChild(createRecordDiv);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(table);

document.body.appendChild(div);
