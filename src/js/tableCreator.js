import '../styles/table.less';

export default function createTable(data) {
  const table = document.getElementById('csv-table');
  table.className = 'csv';
  table.style.display = 'none';

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
