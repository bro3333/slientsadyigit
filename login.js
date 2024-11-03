document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.querySelector('.chat-body');
    const sendMessageBtn = document.getElementById('send-message');
    const messageInput = document.querySelector('.message-input');

    // Elements for login functionality
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const enterButton = document.getElementById('enter');
    const newAccount = document.getElementById('sign-up1');
    const profileImage = document.getElementById('profile');
    const loginButton = document.getElementById('btn');

    // Toggle registration and login forms
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Handle login
    enterButton.addEventListener('click', (e) => {
        e.preventDefault();

        const mail = document.getElementById('textform').value;
        const password = document.getElementById('passwordform').value;

        if (mail === "" || password === "") {
            alert("Hesap bulunamadı, lütfen kayıt olunuz");
        } else {
            // Retrieve user info from localStorage
            const storedUser = JSON.parse(localStorage.getItem("user"));
            
            // Verify login details
            if (storedUser && storedUser.email === mail && storedUser.password === password) {
                // Redirect to main page and adjust visibility of profile image and button
                window.location.href = "index.html";
                

            } else {
                alert("Hesap bulunamadı, lütfen kayıt olunuz");
            }
        }
    });

    // Handle registration
    newAccount.addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.querySelector('.sign-up input[placeholder="İsim"]').value;
        const email = document.querySelector('.sign-up input[placeholder="E-Posta"]').value;
        const password = document.querySelector('.sign-up input[placeholder="Parola"]').value;

        if (name === "" || email === "" || password === "") {
            alert("Lütfen formu doldurun");
        } else {
            const user = { name, email, password };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Kayıt başarılı!");

            // Switch to login form after registration
            container.classList.remove("active");
        }
    });
});