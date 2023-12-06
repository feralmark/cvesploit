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

// Fetch and process YAML files based on multiple naming patterns
for (let i = 0; i < 10000; i++) { // Assuming the numbers range from 0 to 99999
  const filenames = [
    `CVE-${i.toString().padStart(4, '0')}-${i.toString().padStart(5, '0')}.md`, // 4 digits hyphen 5 digits
    `CVE-${i.toString().padStart(5, '0')}-${i.toString().padStart(4, '0')}.md`, // 5 digits hyphen 4 digits
  ];

  let fetched = false;

  for (const filename of filenames) {
    fetchDataFromYAML(filename)
      .then(data => {
        populateTable(data);
        fetched = true;
      })
      .catch(error => {
        if (fetched) return; // If already fetched from one pattern, skip errors from the other
        // Handle errors for both patterns
        console.error(`Error fetching or processing ${filename}:`, error);
      });
  }
}
