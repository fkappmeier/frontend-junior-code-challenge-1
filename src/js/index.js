import '../styles/page.less';

import * as Papa from 'papaparse';

import readCSVFileAsync from './fileReader';
import * as tableCreator from './tableCreator';
import * as recordCreator from './recordCreator';
import * as dataBuffer from './dataBuffer';
import * as dataAnalyzer from './dataAnalyzer';
import * as chartDrawer from './chartDrawer';

// Creation of elements

// section elements
const headline = document.createElement('h1');

const fileSection = document.createElement('section');
const chartSection = document.createElement('section');
const createRecordSection = document.createElement('section');
const tableSection = document.createElement('section');

headline.innerHTML = 'Probeaufgabe 1 - CSV Verarbeitung';
fileSection.className = 'flex-container';
chartSection.className = 'flex-container';
createRecordSection.className = 'flex-container';
createRecordSection.id = 'create-record-section';
createRecordSection.style.display = 'none';
chartSection.style.display = 'none';
tableSection.id = 'table-section';
tableSection.style.display = 'none';

// upload elements
const fileDivContainer = document.createElement('div');

const uploadDiv = document.createElement('div');
const fileInput = document.createElement('input');
const uploadButton = document.createElement('button');
const uploadText = document.createElement('p');

uploadText.innerHTML = 'Select a .csv file from your local disk';
fileInput.type = 'file';
fileInput.accept = '.csv';
uploadButton.innerHTML = 'Upload';

// download elements
const downloadDiv = document.createElement('div');
const downloadText = document.createElement('p');
const downloadButton = document.createElement('button');

downloadText.innerHTML = 'Download data as .csv file';
downloadButton.innerHTML = 'Download';
downloadButton.disabled = true;

// chart elements
const chartContainer = document.createElement('div');
const barChartDiv = document.createElement('div');
const pieChartDiv = document.createElement('div');
const barCanvas = document.createElement('canvas');
const pieCanvas = document.createElement('canvas');
const pieChartLabel = document.createElement('p');

barCanvas.width = 400;
barCanvas.height = 400;
pieCanvas.width = 400;
pieCanvas.height = 400;
barCanvas.id = 'bar-chart-canvas';
pieCanvas.id = 'pie-chart-canvas';

pieChartLabel.id = 'pie-chart-label';
pieChartLabel.innerHTML = '% of Rows with X filled in Fields';

// create new record elements
const createRecordContainer = document.createElement('div');
const createRecordButton = document.createElement('button');

createRecordContainer.id = 'create-record-container';
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

    chartSection.style.display = '';

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
uploadDiv.appendChild(fileInput);
uploadDiv.appendChild(uploadButton);
fileDivContainer.appendChild(uploadDiv);

// Download
downloadDiv.appendChild(downloadText);
downloadDiv.appendChild(downloadButton);
fileDivContainer.appendChild(downloadDiv);

// Charts
pieChartDiv.appendChild(pieChartLabel);
pieChartDiv.appendChild(pieCanvas);
barChartDiv.appendChild(barCanvas);
chartContainer.appendChild(pieChartDiv);
chartContainer.appendChild(barChartDiv);

// Create
createRecordContainer.appendChild(createRecordButton);

// Section level
fileSection.appendChild(fileDivContainer);
chartSection.appendChild(chartContainer);
createRecordSection.appendChild(createRecordContainer);
tableSection.appendChild(table);

// Root level
document.body.appendChild(headline);
document.body.appendChild(fileSection);
document.body.appendChild(chartSection);
document.body.appendChild(createRecordSection);
document.body.appendChild(tableSection);
