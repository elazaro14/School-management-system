// Results array
let results = JSON.parse(localStorage.getItem('results')) || [];

// Students array from localStorage
let studentsResult = JSON.parse(localStorage.getItem('students')) || [];

// Populate student select
const resultStudentSelect = document.getElementById('resultStudentSelect');
studentsResult.forEach(student => {
    const option = document.createElement('option');
    option.value = student.name;
    option.textContent = student.name;
    resultStudentSelect.appendChild(option);
});

// Render results
function renderResults() {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';
    results.forEach((result, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.student}</td>
            <td>${result.subject}</td>
            <td>${result.marks}</td>
            <td><button onclick="deleteResult(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Add result
document.getElementById('resultForm').addEventListener('submit', function(e){
    e.preventDefault();
    const student = resultStudentSelect.value;
    const subject = document.getElementById('subject').value;
    const marks = document.getElementById('marks').value;

    results.push({student, subject, marks});
    localStorage.setItem('results', JSON.stringify(results));
    renderResults();
    this.reset();
});

// Delete result
function deleteResult(index){
    results.splice(index, 1);
    localStorage.setItem('results', JSON.stringify(results));
    renderResults();
}

// Initial render
renderResults();
