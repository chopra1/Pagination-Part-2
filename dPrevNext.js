//You can use JavaScript to check whether the user has reached the first or last page and hide the previous/next button accordingly. Here's an example of how you could modify the updateTable function from my previous example to hide the previous/next button when the user is on the first/last page:
function updateTable() {
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const dataSubset = data.slice(startIndex, endIndex);

  const dataTable = document.querySelector('#data-table');
  const tbody = dataTable.querySelector('tbody');

  // Remove existing rows
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  // Add new rows
  for (let i = 0; i < dataSubset.length; i++) {
    const row = tbody.insertRow();
    const idCell = row.insertCell();
    const nameCell = row.insertCell();
    const ageCell = row.insertCell();

    idCell.textContent = dataSubset[i].id;
    nameCell.textContent = dataSubset[i].name;
    ageCell.textContent = dataSubset[i].age;
  }

  // Show/hide previous/next button
  const previousButton = document.querySelector('#previous-button');
  const nextButton = document.querySelector('#next-button');

  if (currentPage === 0) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'inline-block';
  }

  if (currentPage === numPages - 1) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'inline-block';
  }

  // Update pagination text
  const startIndexDisplay = startIndex + 1;
  const endIndexDisplay = Math.min(startIndex + rowsPerPage, data.length);
  const totalEntries = data.length;
  const paginationText = document.querySelector('#pagination-text');
  paginationText.textContent = `Displaying ${startIndexDisplay}-${endIndexDisplay} of ${totalEntries}`;

  // Update active page button
  const pageButtons = document.querySelectorAll('.page-button');
  for (let i = 0; i < pageButtons.length; i++) {
    if (i === currentPage) {
      pageButtons[i].classList.add('active');
    } else {
      pageButtons[i].classList.remove('active');
    }
  }
}


//try 2 response 2
function showPagination(page, totalPages) {
  const pageButtons = document.querySelector('#page-buttons');
  const paginationText = document.querySelector('#pagination-text');

  // Hide or show the "previous" button based on current page
  const previousButton = document.querySelector('#previous-button');
  if (page === 1) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'inline-block';
  }

  // Hide or show the "next" button based on current page
  const nextButton = document.querySelector('#next-button');
  if (page === totalPages) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'inline-block';
  }

  // Update the pagination text
  paginationText.innerHTML = `Showing ${startRow} to ${endRow} of ${data.length} entries`;

  // Update the individual page buttons
  pageButtons.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerHTML = i;
    if (i === page) {
      button.disabled = true;
    } else {
      button.addEventListener('click', () => showPage(i));
    }
    pageButtons.appendChild(button);
  }
}

//To add search functionality to the pagination table, you can modify the showPage function in the JavaScript code as follows:

javascript
function showPage(page) {
  currentPage = page;
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const dataSubset = data.slice(startRow, endRow);

  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';
  for (let i = 0; i < dataSubset.length; i++) {
    const rowData = dataSubset[i];
    if (rowData.name.toLowerCase().includes(searchTerm.toLowerCase())) { // Check if row matches search term
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${rowData.id}</td>
        <td>${rowData.name}</td>
        <td>${rowData.age}</td>
      `;
      tableBody.appendChild(row);
    }
  }

  const totalPages = Math.ceil(data.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase())).length / rowsPerPage);
  showPagination(page, totalPages);
}

//In this code, we've added a check to see if the row matches the search term before adding it to the table. The search term is stored in a global variable called searchTerm, which can be updated whenever the user enters text in the search box. For example, you could add an event listener to the search box like this:
const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('input', () => {
  searchTerm = searchBox.value.trim();
  showPage(1); // Reset to first page when search term changes
});
