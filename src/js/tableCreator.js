import '../styles/table.less';

export function createTable(data) {
  const table = document.getElementById('csv-table');
  table.style.display = 'none';
  table.innerHTML = ''; // clear all previous children of table

  data.forEach((dataRow, index) => {
    const tableRow = document.createElement('tr');
    if (index === 0) {
      dataRow.forEach((dataCell) => {
        const tableHeader = document.createElement('th');
        tableHeader.innerHTML = dataCell;
        tableRow.appendChild(tableHeader);
      });
    } else {
      dataRow.forEach((dataCell) => {
        const tableData = document.createElement('td');
        tableData.innerHTML = dataCell;
        tableRow.appendChild(tableData);
      });
    }

    table.appendChild(tableRow);
  });

  table.style.display = '';
  document.getElementById('create-record-div').style.display = '';
}

export function addTableRow(dataRow) {
  const table = document.getElementById('csv-table');
  const tableRow = document.createElement('tr');

  dataRow.forEach((dataCell) => {
    const tableData = document.createElement('td');
    tableData.innerHTML = dataCell;
    tableRow.appendChild(tableData);
  });

  table.appendChild(tableRow);
}
