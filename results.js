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
function saveGrade(email) {
  const cls = document.getElementById("gradeClass").value;
  const student = document.getElementById("gradeStudent").value;
  const subject = document.getElementById("gradeSubject").value;
  const score = document.getElementById("gradeScore").value;

  const assignments = getTeacherAssignments(email);
  const allowed = assignments.some(a => a.className === cls && a.subjectName === subject);
  if (!allowed) {
    alert("You are not authorized to enter grades for this subject/class.");
    return;
  }

  let grades = JSON.parse(localStorage.getItem("grades")) || [];
  grades.push({ cls, student, subject, score });
  localStorage.setItem("grades", JSON.stringify(grades));
  loadGrades();
}
