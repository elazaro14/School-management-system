// Attendance array
let attendance = JSON.parse(localStorage.getItem('attendance')) || [];

// Students array from localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Populate student select
const studentSelect = document.getElementById('studentSelect');
students.forEach((student, index) => {
    const option = document.createElement('option');
    option.value = student.name;
    option.textContent = student.name;
    studentSelect.appendChild(option);
});

// Render attendance
function renderAttendance() {
    const tableBody = document.querySelector('#attendanceTable tbody');
    tableBody.innerHTML = '';
    attendance.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.student}</td>
            <td>${record.status}</td>
            <td>${record.date}</td>
            <td><button onclick="deleteAttendance(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Add attendance
document.getElementById('attendanceForm').addEventListener('submit', function(e){
    e.preventDefault();
    const student = studentSelect.value;
    const status = document.getElementById('statusSelect').value;
    const date = new Date().toLocaleDateString();

    attendance.push({student, status, date});
    localStorage.setItem('attendance', JSON.stringify(attendance));
    renderAttendance();
    this.reset();
});

// Delete attendance
function deleteAttendance(index) {
    attendance.splice(index, 1);
    localStorage.setItem('attendance', JSON.stringify(attendance));
    renderAttendance();
}

// Initial render
renderAttendance();
