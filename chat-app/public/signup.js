document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = '/login';
        } else {
            alert('Signup failed: ' + data.message);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again later.');
    }
});
