import * as Papa from 'papaparse';

import readCSVFileAsync from './fileReader';
import createTable from './tableCreator';

const div = document.createElement('div');
const fileInput = document.createElement('input');
const uploadButton = document.createElement('button');
const span = document.createElement('span');
const table = document.createElement('table');

span.innerHTML = 'Select a .csv file from your local disk';
fileInput.type = 'file';
fileInput.accept = '.csv';
uploadButton.innerHTML = 'Upload';
table.id = 'csv-table';

uploadButton.addEventListener('click', async () => {
  const fileContent = await readCSVFileAsync(fileInput.files[0]);

  if (fileContent) {
    const parsedFileContent = Papa.parse(fileContent);
    const { data } = parsedFileContent;
    createTable(data);
  }
});

div.appendChild(span);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(fileInput);
div.appendChild(uploadButton);

div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(table);

document.body.appendChild(div);
