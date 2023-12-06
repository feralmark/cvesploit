function fetchDataFromYAML(filename) {
  return fetch(`yml/${filename}`)
    .then(response => response.text());
}

function extractYAML(data) {
  const yamlContent = data.split('---')[1]; // Extract YAML front matter
  return jsyaml.load(yamlContent);
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

// Fetch and process all MD files in the YAML folder
fetch('yaml/')
  .then(response => response.text())
  .then(text => {
    const fileNames = text.match(/href="([^"]+\.md)"/g).map(match => match.split('"')[1]);

    fileNames.forEach(filename => {
      fetchDataFromYAML(filename)
        .then(data => {
          const yamlData = extractYAML(data);
          populateTable(yamlData);
        })
        .catch(error => {
          console.error(`Error fetching or processing ${filename}:`, error);
        });
    });
  })
  .catch(error => {
    console.error('Error fetching MD files:', error);
  });
