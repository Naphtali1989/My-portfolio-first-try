'use strict';

// Leaving this table head here for the possibility of rendering divs instead of table
const TABLE_HEAD = `<table>
                        <thead>
                            <tr>
                                <td class="cell">User Id</td>
                                <td class="cell">User Name</td>
                                <td class="cell">Password</td>
                                <td class="cell">Last log-in</td>
                                <td class="cell">Admin</td>
                            </tr>
                        </thead>
                        <tbody>
`;

function initAdmin() {
    renderUsersTable();
}

function renderUsersTable() {
    var users = getUsersToShow();
    console.log(users)
    var strHTML = users.map(user => {
        return `<tr>
        <td class="cell">${user.id}</td>
        <td class="cell">${user.userName}</td>
        <td class="cell">${user.password}</td>
        <td class="cell">${user.lastLoginTime}</td>
        <td class="cell">${user.isAdmin}</td>
        </tr>`
    });
    strHTML = TABLE_HEAD + strHTML.join('') + '</tbody></table>';
    var elAdminos = document.querySelector('.secret-for-admins');
    console.log('This is the string entering eladmionos:', elAdminos)
    elAdminos.innerHTML = strHTML;
}

function renderUsersDivs() {
    var strHTML = gUsers.map(user => {
        return `
        <div class="card-content">
        <h4>${user.userName}</h4>
        <div class="card" onclick="onShowUserInfo('${user.id}')">
        ${user.pic}
        </div>
        </div>`
    });
    strHTML.unshift('<div class="card-container">')
    strHTML.push(`</div>`)
    var elAdminos = document.querySelector('.secret-for-admins');
    elAdminos.innerHTML = strHTML.join('');
}

function renderUserInfo(user, el) {
    var strHTML = `<button class="close-card" onclick="onCloseCard('.current-card')">x</button>
                <div class="inner-avatar">${user.pic}</div>
                <p>Id: ${user.id}</p>
                <p>User Name: ${user.userName}</p>
                <p>Password: ${user.password}</p>
                <p>Last Log-in: ${user.lastLoginTime}</p>
                <p>Admin: ${user.isAdmin}</p>
                `
    el.innerHTML = strHTML;
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderUsersTable();
}

function onShowUserInfo(id) {
    showUserInfo(id);
}

function onCloseCard(className) {
    closeCard(className);
}

function onRenderCards(elBtn) {
    removePressed();
    elBtn.classList.add('pressed');
    renderUsersDivs();
}

function onRenderTable(elBtn) {
    removePressed();
    elBtn.classList.add('pressed');
    renderUsersTable();
}

function removePressed() {
    var currElBtn = document.querySelector('.pressed');
    if (!currElBtn) return;
    currElBtn.classList.remove('pressed');
}

function showUserInfo(id) {
    var currUser = getUserById(id)
    var elCard = document.querySelector('.current-card');
    renderUserInfo(currUser, elCard)
    toggleCard(elCard);
}

function closeCard(className) {
    var elCard = document.querySelector(className);
    toggleCard(elCard)
}

function toggleCard(el) {
    el.classList.toggle('show');
}