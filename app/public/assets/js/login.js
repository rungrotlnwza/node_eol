export async function Click_Login(event) {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    function setCookie(cookiename, cookievalue, exdays) {
        const day = new Date();
        day.setTime(day.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + day.toUTCString();
        document.cookie = cookiename + "=" + cookievalue + ";" + expires + ";path=/";
    }

    fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Login Success');
            setCookie('username', username, 1); // เก็บ username ไว้ 1 วัน
            window.location.href = '/dashboard'
        } else {
            alert('Login Failed');
        }
    })
    .catch(err => {
        console.error('Error during fetch:', err);
        alert('Network error');
    });
}
