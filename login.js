// Simple hardcoded admin credentials
const adminUser = {
    username: "admin",
    password: "1234"
};

document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if(username === adminUser.username && password === adminUser.password){
        localStorage.setItem('loggedIn', 'true');
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        errorMsg.textContent = "Invalid username or password!";
    }
});

// Optional: Check login on protected pages
window.addEventListener('load', function() {
    const protectedPages = ['add-student.html','students.html','teachers.html','classes.html','attendance.html','results.html'];
    const currentPage = window.location.pathname.split("/").pop();
    const loggedIn = localStorage.getItem('loggedIn');

    if(protectedPages.includes(currentPage) && loggedIn !== 'true'){
        alert("Please login first!");
        window.location.href = 'login.html';
    }
});
function getTeacherAssignments(email) {
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  return assignments.filter(a => a.teacherEmail === email);
}

function loadTeacherGrading(email) {
  const assignments = getTeacherAssignments(email);
  const classSelect = document.getElementById("gradeClass");
  const subjectInput = document.getElementById("gradeSubject");

  classSelect.innerHTML = "";
  const uniqueClasses = [...new Set(assignments.map(a => a.className))];
  uniqueClasses.forEach(c => {
    classSelect.innerHTML += `<option value="${c}">${c}</option>`;
  });

  classSelect.addEventListener("change", function() {
    const selectedClass = this.value;
    const subjects = assignments
      .filter(a => a.className === selectedClass)
      .map(a => a.subjectName);
    subjectInput.value = subjects[0] || "";
  });
}
