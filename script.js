// Save student
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const studentClass = document.getElementById("class").value;
            const age = document.getElementById("age").value;

            let students = JSON.parse(localStorage.getItem("students")) || [];

            students.push({ name, class: studentClass, age });
            localStorage.setItem("students", JSON.stringify(students));

            alert("Student added!");
            form.reset();
        });
    }

    // Show students
    const table = document.getElementById("studentTable");

    if (table) {
        let students = JSON.parse(localStorage.getItem("students")) || [];

        students.forEach(std => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${std.name}</td>
                <td>${std.class}</td>
                <td>${std.age}</td>
            `;
            table.appendChild(row);
        });
    }
});
