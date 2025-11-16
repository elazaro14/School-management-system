// Classes Array
let classes = JSON.parse(localStorage.getItem('classes')) || [];

// Render classes
function renderClasses() {
    const tableBody = document.querySelector('#classTable tbody');
    tableBody.innerHTML = '';
    classes.forEach((cls, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cls.name}</td>
            <td>
                <button onclick="deleteClass(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add class
document.getElementById('classForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('className').value;
    classes.push({name});
    localStorage.setItem('classes', JSON.stringify(classes));
    renderClasses();
    this.reset();
});

// Delete class
function deleteClass(index) {
    classes.splice(index, 1);
    localStorage.setItem('classes', JSON.stringify(classes));
    renderClasses();
}

// Initial render
renderClasses();
