function createTeacher() {
  const name = document.getElementById("teacherName").value;
  const email = document.getElementById("teacherEmail").value;
  const role = document.getElementById("teacherRole").value;
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  teachers.push({ name, email, role });
  localStorage.setItem("teachers", JSON.stringify(teachers));
  loadTeachers();
}

function loadTeachers() {
  const list = document.getElementById("teacherList");
  list.innerHTML = "";
  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  teachers.forEach(t => {
    list.innerHTML += `<li>${t.name} (${t.role}) - ${t.email}</li>`;
  });
}

function addClass() {
  const cls = document.getElementById("className").value;
  let classes = JSON.parse(localStorage.getItem("classes")) || [];
  classes.push(cls);
  localStorage.setItem("classes", JSON.stringify(classes));
  loadClasses();
  loadClassDropdowns();
}

function loadClasses() {
  const list = document.getElementById("classList");
  list.innerHTML = "";
  const classes = JSON.parse(localStorage.getItem("classes")) || [];
  classes.forEach(c => {
    list.innerHTML += `<li>${c}</li>`;
  });
}

function addSubject() {
  const sub = document.getElementById("subjectName").value;
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  subjects.push(sub);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  loadSubjects();
}

function loadSubjects() {
  const list = document.getElementById("subjectList");
  list.innerHTML = "";
  const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  subjects.forEach(s => {
    list.innerHTML += `<li>${s}</li>`;
  });
}

function loadClassDropdowns() {
  const classes = JSON.parse(localStorage.getItem("classes")) || [];
  const studentClass = document.getElementById("studentClass");
  const gradeClass = document.getElementById("gradeClass");
  studentClass.innerHTML = "";
  gradeClass.innerHTML = "";
  classes.forEach(c => {
    studentClass.innerHTML += `<option value="${c}">${c}</option>`;
    gradeClass.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

function addStudent() {
  const name = document.getElementById("studentName").value;
  const cls = document.getElementById("studentClass").value;
  let students = JSON.parse(localStorage.getItem("students")) || {};
  if (!students[cls]) students[cls] = [];
  students[cls].push(name);
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents(cls);
  loadGradeStudents(cls);
}

function loadStudents(cls) {
  const list = document.getElementById("studentList");
  list.innerHTML = "";
  const students = JSON.parse(localStorage.getItem("students")) || {};
  (students[cls] || []).forEach(s => {
    list.innerHTML += `<li>${s}</li>`;
  });
}

document.getElementById("gradeClass").addEventListener("change", function() {
  loadGradeStudents(this.value);
});

function loadGradeStudents(cls) {
  const dropdown = document.getElementById("gradeStudent");
  dropdown.innerHTML = "";
  const students = JSON.parse(localStorage.getItem("students")) || {};
  (students[cls] || []).forEach(s => {
    dropdown.innerHTML += `<option value="${s}">${s}</option>`;
  });
}

function saveGrade() {
  const cls = document.getElementById("gradeClass").value;
  const student = document.getElementById("gradeStudent").value;
  const subject = document.getElementById("gradeSubject").value;
  const score = document.getElementById("gradeScore").value;
  let grades = JSON.parse(localStorage.getItem("grades")) || [];
  grades.push({ cls, student, subject, score });
  localStorage.setItem("grades", JSON.stringify(grades));
  loadGrades();
}

function loadGrades() {
  const list = document.getElementById("gradeList");
  list.innerHTML = "";
  const grades = JSON.parse(localStorage.getItem("grades")) || [];
  grades.forEach(g => {
    list.innerHTML += `<li>${g.cls} - ${g.student} - ${g.subject}: ${g.score}</li>`;
  });
}

// Initial load
loadTeachers();
loadClasses();
loadSubjects();
loadClassDropdowns();
loadGrades();
