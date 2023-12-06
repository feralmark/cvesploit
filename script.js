// Function to fetch and parse YAML files
function fetchDataFromYAML(filename) {
  return fetch(`yaml/${filename}`)
    .then(response => response.text())
    .then(text => jsyaml.load(text));
}

// Function to populate the table with YAML data
function populateTable(data) {
  const table = document.createElement('table');
  table.classList.add('myDynamicTable'); // Add a class to differentiate tables
  const tableBody = document.createElement('tbody');

  // Loop through each key-value pair in the YAML data
  Object.keys(data).forEach(key => {
    const row = document.createElement('tr');
    const cellKey = document.createElement('td');
    const cellValue = document.createElement('td');

    cellKey.textContent = key;
    cellValue.textContent = data[key];

    row.appendChild(cellKey);
    row.appendChild(cellValue);
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table); // Append table to the document body or another container
}

// Usage
fetchDataFromYAML('CVE-####-#####.yaml') // Replace 'CVE-####-#####.yaml' with your YAML file name
  .then(data => {
    // Once data is fetched, populate the table
    populateTable(data['Software/Service']); // Change this key to populate the table as needed
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
