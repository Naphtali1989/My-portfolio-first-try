'use strict';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getTime() {
    return new Date().toString().split(' ')[4];
}

function resetNums() {
    gNums = [];
    for (var i = 0; i < gLvl ** 2; i++) {
        gNums[i] = i + 1;
    }
}

function getRandNum() {
    var randNum = gNums.splice(getRandomInt(0, gNums.length), 1);
    return randNum.pop();
}