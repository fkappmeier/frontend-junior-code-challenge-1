export default function processData(fileContent) {
  // splitting by quotation marks will leave all substrings inside quotes
  // in uneven array indices and all non-quoted substrings in even indices
  const quoteSplit = fileContent.split('"');
  const allEntries = [];

  const tempArray = [];
  for (let i = 0; i < 50; i += 1) {
    tempArray.push(quoteSplit[i]);
  }
  console.log(tempArray);

  // now all entries not in quotation marks can be split further by
  // semicolon for a new data cell and by new line for a new data row

  quoteSplit.forEach((entry, index) => {
    let seperatedEntries = [];

    if (index % 2 === 0) {
      let newEntry = entry;

      if (newEntry.startsWith(';')) {
        newEntry = newEntry.slice(1); // remove semicolon from start of entry-string
      }
      if (newEntry.startsWith('\r\n')) {
        newEntry = newEntry.slice(4); // remove \r\n from start of entry-string
      }

      if (newEntry !== '') {
        if (newEntry.endsWith(';')) {
          newEntry = newEntry.slice(0, -1); // remove semicolon from end of entry-string
        }
        if (newEntry.endsWith('\r\n')) {
          newEntry = newEntry.slice(0, -4); // remove \r\n from end of entry-string
        }

        seperatedEntries = newEntry.split(/;|\r\n/); // split
      }
    } else {
      seperatedEntries = [entry];
    }

    seperatedEntries.forEach((ent) => allEntries.push(ent));
  });

  // determine the amount of columns by calculating the amount of entries
  // in the first row of the table
  const tableRows = fileContent.split('\r\n');
  const columnCount = tableRows[0].split(';').length;

  const tableData = [];

  let indexOfCell = 0;
  let indexOfRow = 0;
  tableData[0] = [];

  // create a two dimensional array where the first dimension determines
  // the row number and the second dimension the column number of an entry
  allEntries.forEach((entry) => {
    if (indexOfCell === columnCount) {
      indexOfCell = 0;
      indexOfRow += 1;

      tableData[indexOfRow] = [];
    }

    tableData[indexOfRow][indexOfCell] = entry;
    indexOfCell += 1;
  });

  return tableData;
}