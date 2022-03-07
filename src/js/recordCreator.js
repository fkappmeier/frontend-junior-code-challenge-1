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

// Loop through all column names to create html elements
function createTextInputDiv() {
  const textInputDiv = document.createElement('div');
  textInputDiv.id = 'text-input-div';

  columnNames.forEach((entry) => {
    const lineDiv = createTextInputLineDiv(entry);
    textInputDiv.appendChild(lineDiv);
  });

  textInputDiv.appendChild(document.createElement('br'));

  document.getElementById('create-record-div').appendChild(textInputDiv);
}

// simple DOM getter function to create an array containing all text input elements
function getTextInputs() {
  const array = [];

  columnNames.forEach((entry) => {
    array.push(document.getElementById(`${entry}-text-input`));
  });

  return array;
}

// Main function
export default function createRecord() {
  const createRecordDiv = document.getElementById('create-record-div');
  const createRecordButton = document.getElementById('create-record-button');
  createRecordButton.disabled = true;

  createRecordDiv.appendChild(document.createElement('br'));
  createRecordDiv.appendChild(document.createElement('br'));

  if (!document.getElementById('text-input-div')) {
    createTextInputDiv();
  }

  const textInputsArray = getTextInputs();

  const createButton = document.createElement('button');
  createButton.innerHTML = 'Create';
  createButton.addEventListener('click', () => {
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

    // TODO:
    // - clearing all values from the text inputs
    // - hiding the createRecordDiv

    // - adding the information from the new record Object to the table
    // - creating an array of record objects from the data array (buffer database)
    // - adding the new record object to the array of already existing records

    // createRecordButton.disabled = false;
  });

  createRecordDiv.appendChild(createButton);
}
