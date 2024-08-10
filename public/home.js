document.addEventListener('DOMContentLoaded', async () => {
    try {
        
        const response = await axios.get('/api/users');
        const userList = JSON.stringify(response.data, null, 2);

        
        document.getElementById('userList').textContent = userList;
       
    } catch (error) {
        console.error(error);
        document.getElementById('userList').innerText = 'Error fetching users';
    }
});
