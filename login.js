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
