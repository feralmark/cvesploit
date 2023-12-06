// Function to fetch and parse YAML files
function fetchDataFromYAML(filename) {
  return fetch(`yaml/${filename}`)
    .then(response => response.text())
    .then(text => jsyaml.load(text));
}

// Function to populate the table with YAML data
function populateTable(data) {
  const tableBody = document.querySelector('#myTable tbody');
  tableBody.innerHTML = ''; // Clear existing table content

  data.forEach(row => {
    const newRow = document.createElement('tr');
    Object.values(row).forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      newRow.appendChild(cell);
    });
    tableBody.appendChild(newRow);
  });
}

// Usage
fetchDataFromYAML('data1.yaml') // Replace 'data1.yaml' with your YAML file name
  .then(data => {
    // Once data is fetched, populate the table
    populateTable(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
