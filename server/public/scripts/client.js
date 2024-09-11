// Get references to the form, table, and total monthly element
const form = document.getElementById('add-employee-form');
const table = document.getElementById('employees-table');
const tbody = document.getElementById('employees-tbody');
const totalMonthlyElement = document.getElementById('total-monthly');

// Initialize an array to store employee data
let employees = [];

// Add event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const salary = parseInt(document.getElementById('salary').value);
  addEmployee(name, salary);
  form.reset();
});

// Function to add an employee to the table and update the total monthly salary
function addEmployee(name, salary) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${name}</td>
    <td>$${salary}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  tbody.appendChild(newRow);
  employees.push({ name, salary });
  updateTotalMonthly();
}

// Function to update the total monthly salary
function updateTotalMonthly() {
  const totalMonthly = employees.reduce((acc, curr) => acc + curr.salary, 0);
  totalMonthlyElement.textContent = `Total Monthly: $${totalMonthly}`;
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