// public/javascript/script.js
document.addEventListener('DOMContentLoaded', function () {
    // Check if the registration and login forms are present on the page
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            register();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            login();
        });
    }
});

function register() {
    const formData = new FormData(document.getElementById('registerForm'));
    fetch('/auth/register', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show a message or redirect to another page
        if (data.message === 'Registration successful') {
            window.location.href = '/login.html';
        }
    })
    .catch(error => console.error(error));
}

function login() {
    const formData = new FormData(document.getElementById('loginForm'));
    fetch('/auth/login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show a message or redirect to another page
        if (data.message === 'Login successful') {
            // Redirect to the dashboard or another page
            window.location.href = '/dashboard.html';
        }
    })
    .catch(error => console.error(error));
}
