import Record from './record';

const columnNames = [
  'Hauptartikelnr',
  'Artikelname',
  'Hersteller',
  'Beschreibung',

  'Materialangaben',
  'Geschlecht',
  'Produktart',
  'Ärmel',

  'Bein',
  'Kragen',
  'Herstellung',
  'Taschenart',

  'Grammatur',
  'Material',
  'Ursprungsland',
  'Bildname',
];

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

  const recordObject = new Record(
    textInputsArray[0].value,
    textInputsArray[1].value,
    textInputsArray[2].value,
    textInputsArray[3].value,

    textInputsArray[4].value,
    textInputsArray[5].value,
    textInputsArray[6].value,
    textInputsArray[7].value,

    textInputsArray[8].value,
    textInputsArray[9].value,
    textInputsArray[10].value,
    textInputsArray[11].value,

    textInputsArray[12].value,
    textInputsArray[13].value,
    textInputsArray[14].value,
    textInputsArray[15].value,
  );

  console.log(recordObject);

  textInputsArray.forEach((i) => {
    const input = i;
    input.value = '';
  });

  textInputDiv.style.display = 'none';
  createRecordButton.disabled = false;

  // TODO:
  // - clearing all values from the text inputs
  // - hiding the textInputDiv

  // - adding the information from the new record Object to the table
  // - creating an array of record objects from the data array (buffer database)
  // - adding the new record object to the array of already existing records
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
export default function createRecord() {
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
