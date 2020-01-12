window.onload = function() {
    document.querySelector('.tabs_header').addEventListener('click', changeTabs);
    function changeTabs(event) {
        if (event.target.className == 'tab') {
            let dataTab = event.target.getAttribute('data-tab');
            let tabs = document.querySelector('.tabs_header').children;
            let forms = document.querySelector('.tabs_body').children;
            for (let i = 0; i < forms.length; i++) {
                if (dataTab == i) {
                    tabs[i].style.background = '#afbcd8';
                    forms[i].style.display = 'block';
                } else {
                    tabs[i].style.background = '#8f9ab1';
                    forms[i].style.display = 'none';
                }
            }
        }
    }
}

let validation = true;
let signUp = document.getElementById('sign_up');
signUp.onclick = async function (event) {
    event.preventDefault();
    document.getElementById('email_error').innerHTML = '';
    document.getElementById('login_error').innerHTML = '';
    let email = document.getElementById('email').value;
    let login = document.getElementById('login_up').value;
    let password = document.getElementById('password_up').value;
    emailValid(email);
    loginValid(login);
    passwordValid(password);
    if (validation === false) {
        return false;
    }
    console.log('Try sign up with email: ' + email + ', login: ' + login + ', password: ' + password);

    let xhr = new XMLHttpRequest();
    if (!xhr) {
        console.log('Unable to create XMLHTTP instance');
        return false;
    }
    let user = JSON.stringify({
        email: email,
        login: login,
        password: password
    });
    xhr.open('POST', 'servlet.ServletSignUp');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(user);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            let response = xhr.response;
            switch (response) {
                case 'Email is busy':
                    document.getElementById('email_error').innerHTML = response;
                    alert(response);
                    break;
                case 'Login is busy':
                    document.getElementById('login_error').innerHTML = response;
                    alert(response);
                    break;
                case 'Registration was successful':
                    alert(response);
                    document.getElementById('email').value = '';
                    document.getElementById('login_up').value = '';
                    document.getElementById('password_up').value = '';
            }
        }
    }
}

let signIn = document.getElementById('sign_in');
signIn.onclick = function(event) {
    event.preventDefault();
    document.getElementById('login_in_error').innerHTML = '';
    document.getElementById('password_in_error').innerHTML = '';
    let login = document.getElementById('login_in').value;
    let password = document.getElementById('password_in').value;
    console.log('Try with sign in with login: ' + login +', password: ' + password);

    let xhr = new XMLHttpRequest();
    if (!xhr) {
        console.log('Unable to create XMLHTTP instance');
        return false;
    }
    let user = JSON.stringify({
        login: login,
        password: password
    });
    xhr.open('POST', 'servlet.ServletSignIn');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(user);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            let response = xhr.response;
            switch (response) {
                case 'Login and password are correct. Authorization was successful':
                    alert(response);
                    document.getElementById('login_in').value = '';
                    document.getElementById('password_in').value = '';
                    break;
                case 'Password is not correct. Check your password':
                    document.getElementById('password_in_error').innerHTML = response;
                    alert(response);
                    break;
                case 'Login does not exist. Check your login or sign up':
                    alert(response);
                    document.getElementById('login_in_error').innerHTML = response;
            }
        }
    }
}

const EMAIL_REG_EXP = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,6}$/i;
const LOGIN_REG_EXP = /^[a-zA-Z0-9_]{2,20}$/;
const PASSWORD_REG_EXP = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function emailValid(email) {
    if (!email.match(EMAIL_REG_EXP)) {
        alert('Invalid email. EMAIL should only consist of letters (a-z, A-Z), numbers (0-9),'
            + ' signs ("-","_"), has @ and existing domain');
        document.getElementById('email_error').innerHTML = 'Invalid email!';
        validation = false;
    } else {
        document.getElementById('email_error').innerHTML = '';
        validation = true;
    }
}

function loginValid(login) {
    if (!login.match(LOGIN_REG_EXP)) {
        alert('Invalid login. LOGIN should only consist of letters (a-z, A-Z), numbers (0-9),'
            + ' sign ("_") and must be between 2 and 20 characters long');
        document.getElementById('login_error').innerHTML = 'Invalid login!';
        validation = false;
    } else {
        document.getElementById('login_error').innerHTML = '';
        validation = true;
    }
}

function passwordValid(password) {
    if (!password.match(PASSWORD_REG_EXP)) {
        alert('Invalid password. PASSWORD should have at least one number, and at least one '
            + ' special character (!@#$%^&*) and must be between 6 and 16 characters long');
        document.getElementById('password_error').innerHTML = 'Invalid password!';
        validation = false;
    } else {
        document.getElementById('password_error').innerHTML = '';
        validation = true;
    }
}