import { readCSVFile } from './fileReader';

const div = document.createElement('div');
const fileInput = document.createElement('input');
const uploadButton = document.createElement('button');
const span = document.createElement('span');

span.innerHTML = 'Select a .csv file from your local disk';

fileInput.type = 'file';
fileInput.accept = '.csv';

uploadButton.innerHTML = 'Upload';

uploadButton.addEventListener('click', () => {
  readCSVFile(fileInput.files[0]);
});

div.appendChild(span);
div.appendChild(document.createElement('br'));
div.appendChild(document.createElement('br'));
div.appendChild(fileInput);
div.appendChild(uploadButton);

document.body.appendChild(div);
