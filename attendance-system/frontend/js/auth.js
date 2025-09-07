// Auth JS for login and signup
const API_BASE = '../backend/';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch(API_BASE + 'auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', email, password })
            });

            const result = await response.json();
            if (result.success) {
                localStorage.setItem('user', JSON.stringify({ email }));
                window.location.href = 'dashboard.html';
            } else {
                alert(result.message);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            const response = await fetch(API_BASE + 'auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'signup', username, email, password, role })
            });

            const result = await response.json();
            if (result.success) {
                window.location.href = 'login.html';
            } else {
                alert(result.message);
            }
        });
    }

    // Logout
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', async () => {
            await fetch(API_BASE + 'auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'logout' })
            });
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }
});
