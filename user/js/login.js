document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple credential check
    if (username === 'admin' && password === 'admin123' || username==='' && password=='') {
        window.location.href = '../html/admin.html'; // Redirect to admin page
    } else if (username === 'brijitha' && password === 'bri123') {
        window.location.href = '../html/travelrequest.html'; // Redirect to employee page
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid username or password.';
    }
    if (username === '' && password === '') {
        alert("Please enter username and password");
        return; // Prevent the form submission
    }
});
