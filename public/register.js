document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); 


    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const profession = document.getElementById('profession').value;


    axios.post('/api/register', {
        name: name,
        email: email,
        password: password,
        phone: phone,
        profession: profession
    })
    .then(function (response) {

        showNotification('Registration successful!', 'success');
        setTimeout(()=>{
            window.location.href='/login.html'
        },3500)
    })
    .catch(function (error) {
        
        showNotification('Registration failed. Please try again.', 'danger');
    });
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.className = `alert alert-${type}`;
    notification.textContent = message;

    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
    
}
