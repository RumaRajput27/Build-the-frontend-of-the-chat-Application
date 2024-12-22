// Fetch the logged-in user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// If user is not logged in, redirect to login page
if (!user) {
    alert('You must log in first.');
    window.location.href = '/login';
}

// Display user's name in the header
document.getElementById('user-name').textContent = user.name;

async function fetchOnlineUsers() {
    try {
        console.log('Fetching online users...');
        const response = await fetch('http://localhost:3000/online-users');
        
        // Check if the response was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched online users:', data);

        // Display the list of online users
        const userList = document.getElementById('online-users');
        userList.innerHTML = data.users
            .map((u) => `<li>${u.name} (${u.email})</li>`)
            .join('');
    } catch (error) {
        console.error('Error fetching online users:', error);
    }
}

// Call the function to fetch and display online users
fetchOnlineUsers();
