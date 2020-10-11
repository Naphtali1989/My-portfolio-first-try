'use strict';


function init() {
    loginUser();
    renderLogedInUserScreen()
}

function onDoLogin(ev) {
    if (ev) {
        if (ev.key !== 'Enter') return;
    }
    var elUserNameTxt = document.querySelector('.user-name-txt');
    var user = elUserNameTxt.value;
    var elPasswordTxt = document.querySelector('.password-num');
    var pwd = elPasswordTxt.value;

    if (!user || !pwd) return;
    checkUserLogin(user, pwd);

    elUserNameTxt.value = '';
    elPasswordTxt.value = '';
}

function renderLogedInUserScreen() {
    var user = getLoggedInUser();
    var elSecret = document.querySelector('.secret');
    var adminStr = (user.isAdmin) ? '' : ' not';
    var adminLink = (user.isAdmin) ? `<a href="admins.html" class="admin-page">To the Admins Page!</a>` : '';

    var strHTML =
        `
    <div class="secret-container">
        <h1>Welcome ${user.userName}!</h1>
        <div class="inner-container">
            <div class="admin-div">
                <h1>You are${adminStr} an Admin.</h1>
            </div>
            <div class="last-login-time">
                <p>You last logged in at: ${user.lastLoginTime}</p>
            </div>
        </div>
        ${adminLink}
        <button class="btn log-out-btn" onclick="onDoLogout()">Log-Out</button>
    </div>
    `
    elSecret.innerHTML = strHTML;
}

function onDoLogout() {
    doLogout();
}

function toggleSecretUserPage() {
    var elS = document.querySelectorAll('.the-whole-page>*:not(:last-child)');
    elS.forEach(el => {
        el.classList.toggle('hide')
    })
}