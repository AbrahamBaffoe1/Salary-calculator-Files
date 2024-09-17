const form = document.getElementById('add-employee-form');
const tbody = document.getElementById('employees-tbody');
const totalMonthlyElement = document.getElementById('total-monthly');

// Initialize an array to store employee data
let employees = [];

// Add event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const employmentId = document.getElementById('employment-id').value;
  const employment = document.getElementById('employment').value;
  const salary = parseInt(document.getElementById('salary').value);

  addEmployee(firstName, lastName, employmentId, employment, salary);
  form.reset();
});

// Function to add an employee to the table and update the total monthly salary
function addEmployee(firstName, lastName, employmentId, employment, salary) {
  const fullName = `${firstName} ${lastName}`; // Combine first and last name
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${fullName}</td>
    <td>${employmentId}</td>
    <td>${employment}</td>
    <td>$${salary}</td>
    <td><button class="delete-btn" data-testid="delete-button">Delete</button></td>
  `;
  tbody.appendChild(newRow);
  employees.push({ firstName, lastName, employmentId, employment, salary });
  updateTotalMonthly();
}

// Function to update the total monthly salary
function updateTotalMonthly() {
  const totalAnnual = employees.reduce((acc, curr) => acc + curr.salary, 0);
  const totalMonthly = totalAnnual / 12;
  totalMonthlyElement.textContent = `Total Monthly: $${totalMonthly.toFixed(2)}`;

  // Apply 'over-budget' class if total monthly exceeds $20,000
  if (totalMonthly > 20000) {
    totalMonthlyElement.classList.add('over-budget');
  } else {
    totalMonthlyElement.classList.remove('over-budget');
  }
}

// Add event listener to the delete buttons
tbody.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(tbody.children, row);
    employees.splice(index, 1);
    row.remove();
    updateTotalMonthly();
  }
});
