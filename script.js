function fetchDataFromYAML(filename) {
  return fetch(`yaml/${filename}`)
    .then(response => response.text())
    .then(text => jsyaml.load(text));
}

function populateTable(data) {
  // Create table header if not already created
  if (!tableHeaderCreated) {
    const tableHead = document.querySelector('#myTable thead');
    const headerRow = document.createElement('tr');

    Object.keys(data).forEach(key => {
      const headerCell = document.createElement('th');
      headerCell.textContent = key;
      headerRow.appendChild(headerCell);
    });

    tableHead.appendChild(headerRow);
    tableHeaderCreated = true;
  }

  // Create table row with data
  const tableBody = document.querySelector('#myTable tbody');
  const dataRow = document.createElement('tr');

  Object.values(data).forEach(value => {
    const dataCell = document.createElement('td');
    dataCell.textContent = value;
    dataRow.appendChild(dataCell);
  });

  tableBody.appendChild(dataRow);
}

const tableHeaderCreated = false; // Flag to check if table header is already created

// Fetch and process YAML files based on the naming pattern "CVE-####.yaml"
for (let i = 0; i < 10000; i++) { // Assuming the numbers range from 0 to 9999
  const filename = `CVE-${i.toString().padStart(4, '0')}.yaml`; // Format the filename
  fetchDataFromYAML(filename)
    .then(data => {
      populateTable(data);
    })
    .catch(error => {
      // Handle errors, such as file not found or other issues
      console.error(`Error fetching or processing ${filename}:`, error);
    });
}
