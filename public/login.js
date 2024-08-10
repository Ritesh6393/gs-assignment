document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/login', { email, password });
        localStorage.setItem('token', response.data.token);
        window.location.href = '/home.html';
    } catch (error) {
        console.error(error);
        document.getElementById('notification').innerText = 'Invalid credentials';
    }
});
