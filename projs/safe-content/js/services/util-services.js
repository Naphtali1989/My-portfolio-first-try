'use strict';

function createTimeStamp() {
    var currTime = new Date();
    var currDate = `${currTime.getDate()}/${(currTime.getMonth() + 1)}/${currTime.getFullYear()}`
    var currHour = (currTime.getHours() < 10 ? '0' : '') + currTime.getHours()
    var currMin = (currTime.getMinutes() < 10 ? '0' : '') + currTime.getMinutes()
    var currSec = (currTime.getSeconds() < 10 ? '0' : '') + currTime.getSeconds()

    return `${currDate}, ${currHour}:${currMin}:${currSec}`;
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) return 0;

        const A = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const B = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

function togglePwdVisibility() {
    var x = document.querySelector('.password-num');
    if (x.type === 'password') {
        x.type = 'text';
    } else {
        x.type = 'password';
    }
}