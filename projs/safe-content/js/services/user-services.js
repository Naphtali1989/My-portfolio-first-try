'use strict';

const STORAGE_KEY = 'usersDB';
const CURR_USER_STORAGE_KEY = 'currUser';

var gNextId = 101
var gCurrLoggedUser;
var gUsers = _createUsers();


// function getUsersToShow() {

// }

function getUser(userName) {
    var currUser = gUsers.find(function(user) {
        return user.userName === userName
    });
    if (!currUser) return null;
    return currUser
}

function getUserById(id) {
    var currUser = gUsers.find(function(user) {
        return user.id === id
    });
    if (!currUser) return null;
    return currUser
}

function checkUserLogin(userName, pwd) {
    var currUser = getUser(userName);
    if (!currUser.password === pwd) return
    currUser.lastLoginTime = createTimeStamp();
    gCurrLoggedUser = currUser;
    _saveUsers();
    loginUser();
}

function loginUser() {
    gCurrLoggedUser = loadFromStorage(CURR_USER_STORAGE_KEY)
    if (!gCurrLoggedUser) return;
    gCurrLoggedUser.isLogged = true;
    saveToStorage(CURR_USER_STORAGE_KEY, gCurrLoggedUser);
    toggleSecretUserPage();
}

function getLoggedInUser() {
    return gCurrLoggedUser
}

function doLogout() {
    toggleSecretUserPage();
    gCurrLoggedUser.isLogged = false;
    gCurrLoggedUser = null;
    _saveUsers();
}




function _createUser(userName, password, imgPath) {
    return {
        id: 'u' + gNextId++,
        userName,
        password,
        lastLoginTime: '',
        isAdmin: false,
        isLogged: false,
        pic: imgPath
    }
}

function _createUsers() {
    var users = loadFromStorage(STORAGE_KEY);
    if (!users) {
        users = [];
        users.push(_createUser('Captain Jean Luc Picard', '123', '<img class="avatar " src="imgs/picard.jpg">'))
        users.push(_createUser('Comander William T. Riker', '123', '<img class="avatar " src="imgs/riker.jpg">'))
        users.push(_createUser('Comander Data', '123', '<img class="avatar " src="imgs/data.jpg">'))
        users.push(_createUser('Lieutenant Warf', '123', '<img class="avatar " src="imgs/warf.jpg">'))
        users.push(_createUser('Lieutenant Jordy LeForge', '123', '<img class="avatar " src="imgs/jordy.jpg">'))
        users.push(_createUser('Chief O\'Brian', '123', '<img class="avatar " src="imgs/obrian.jpg">'))
        users.push(_createUser('Counselor Deana Troy', '123', '<img class="avatar " src="imgs/troy.jpg">'))
        users.push(_createUser('Dr. Beverly Crusher', '123', '<img class="avatar " src="imgs/crusherdr.jpg">'))
        users.push(_createUser('Ensign Westley Crusher', '123', '<img class="avatar " src="imgs/wesley.jpg">'))
    }
    _makeAdmin(users[0])
    _makeAdmin(users[1])
    return users;
}

function _saveUsers() {
    saveToStorage(STORAGE_KEY, gUsers);
    saveToStorage(CURR_USER_STORAGE_KEY, gCurrLoggedUser);
}


function _saveUser() {
    saveToStorage(CURR_USER_STORAGE_KEY, gCurrLoggedUser);
}

function _makeAdmin(user) {
    user.isAdmin = true;
}