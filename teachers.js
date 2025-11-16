// Teachers Array
let teachers = JSON.parse(localStorage.getItem('teachers')) || [];

// Function to render teachers in table
function renderTeachers() {
    const tableBody = document.querySelector('#teacherTable tbody');
    tableBody.innerHTML = '';
    teachers.forEach((teacher, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>
                <button onclick="deleteTeacher(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to add teacher
document.getElementById('teacherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('teacherName').value;
    const subject = document.getElementById('teacherSubject').value;

    teachers.push({name, subject});
    localStorage.setItem('teachers', JSON.stringify(teachers));
    renderTeachers();
    this.reset();
});

// Function to delete teacher
function deleteTeacher(index) {
    teachers.splice(index, 1);
    localStorage.setItem('teachers', JSON.stringify(teachers));
    renderTeachers();
}

// Initial render
renderTeachers();
