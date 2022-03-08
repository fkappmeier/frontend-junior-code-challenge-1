import * as tableCreator from './tableCreator';
import * as dataBuffer from './dataBuffer';

const columnNames = [];

// Creates the necessary html elements for each column name
function createTextInputLineDiv(name) {
  const lineDiv = document.createElement('div');
  const text = document.createElement('b');
  const textInput = document.createElement('input');

  text.innerHTML = `${name}: `;
  lineDiv.id = `${name}-line-div`;
  textInput.id = `${name}-text-input`;

  lineDiv.appendChild(text);
  lineDiv.appendChild(textInput);
  lineDiv.appendChild(document.createElement('br'));

  return lineDiv;
}

// simple DOM getter function to create an array containing all text input elements
function getTextInputs() {
  const array = [];

  columnNames.forEach((entry) => {
    array.push(document.getElementById(`${entry}-text-input`));
  });

  return array;
}

// Create new Record object, clear all input values and hide textInputDiv
function createOnClick() {
  const createRecordButton = document.getElementById('create-record-button');
  const textInputDiv = document.getElementById('text-input-div');

  const textInputsArray = getTextInputs();

  const newDataRow = [];

  textInputsArray.forEach((input) => {
    newDataRow.push(input.value);
  });

  tableCreator.addTableRow(newDataRow); // add new data to table
  dataBuffer.addDataRow(newDataRow); // add new data to data buffer

  textInputsArray.forEach((i) => {
    const input = i;
    input.value = '';
  });

  textInputDiv.style.display = 'none';
  createRecordButton.disabled = false;

  window.scrollTo(0, document.body.scrollHeight); // scroll to bottom of page to show new entry
}

// Clear all input values and hide textInputDiv
function cancelOnClick() {
  const createRecordButton = document.getElementById('create-record-button');
  const textInputDiv = document.getElementById('text-input-div');

  const textInputsArray = getTextInputs();

  textInputsArray.forEach((i) => {
    const input = i;
    input.value = '';
  });

  textInputDiv.style.display = 'none';
  createRecordButton.disabled = false;
}

// Create div with text inputs
function createTextInputDiv() {
  const textInputDiv = document.createElement('div');
  textInputDiv.id = 'text-input-div';

  const headline = document.createElement('h2');
  const textNode = document.createTextNode('Create a new data record');
  headline.appendChild(textNode);
  textInputDiv.appendChild(headline);

  columnNames.forEach((entry) => {
    const lineDiv = createTextInputLineDiv(entry);
    textInputDiv.appendChild(lineDiv);
  });

  textInputDiv.appendChild(document.createElement('br'));

  const createButton = document.createElement('button');
  createButton.innerHTML = 'Create';
  createButton.addEventListener('click', createOnClick);

  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'Cancel';
  cancelButton.addEventListener('click', cancelOnClick);

  textInputDiv.appendChild(createButton);
  textInputDiv.appendChild(cancelButton);

  document.getElementById('create-record-div').appendChild(textInputDiv);
}

// Main function
export function createRecord() {
  const createRecordButton = document.getElementById('create-record-button');
  let textInputDiv = document.getElementById('text-input-div');

  createRecordButton.disabled = true;

  if (!textInputDiv) {
    createTextInputDiv();
    textInputDiv = document.getElementById('text-input-div');
  } else {
    textInputDiv.style.display = '';
  }
}

// simple setter function to dynamically set column names
export function setColumnNames(nameArray) {
  columnNames.length = 0; // clear array
  nameArray.forEach((name) => columnNames.push(name));
}
