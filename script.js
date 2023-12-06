function fetchDataFromYAML(filename) {
  return fetch(`yaml/CVE-2017-0144.md`)
    .then(response => response.text());
}

function extractYAML(data) {
  const yamlContent = data.split('---')[1]; // Extract YAML front matter
  return jsyaml.load(yamlContent);
}

function populateTable(data) {
  // Create table header if not already created
  const table = document.getElementById('myTable');
  const tbody = table.getElementsByTagName('tbody')[0];
  
  // Create table row with data
  const dataRow = document.createElement('tr');

  Object.values(data).forEach(value => {
    const dataCell = document.createElement('td');
    dataCell.textContent = value;
    dataRow.appendChild(dataCell);
  });

  tbody.appendChild(dataRow);
}

// Fetch a single MD file in the YAML folder
fetchDataFromYAML()
  .then(data => {
    const yamlData = extractYAML(data);
    populateTable(yamlData);
  })
  .catch(error => {
    console.error(`Error fetching or processing ${filename}:`, error);
  });
