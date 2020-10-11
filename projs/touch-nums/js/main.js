'use strict';

var gTimer = 0;
var gLvl;
var gGameInterval;
var gNums = [];
var gPrevNum = 0;
var gLevels = [
    { name: 'Easy', level: 4 },
    { name: 'Medium', level: 5 },
    { name: 'Hard', level: 6, },
    { name: 'Heroic', level: 7 },
    { name: 'Nightmare', level: 8 }
]


function init() {
    if (gGameInterval) clearInterval(gGameInterval);
    gLvl = 4;
    gTimer = 0;
    gPrevNum = 0;
    resetNums()
    renderBoard();
}

function resetBoard(elResetBtn) {
    if (gGameInterval) clearInterval(gGameInterval);
    init();
}

function handleKey(ev) {
    if (ev.key === 'Escape') init();
}

function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < gLvl; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gLvl; j++) {
            var cell = getRandNum()
            var className = ` cell cell-${cell}`;
            strHtml += `<td onclick="cellClicked(this, ${cell})" 
                            class="${className}" >`;
            strHtml += cell;
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }
    var elGame = document.querySelector('.game-board');
    elGame.innerHTML = strHtml;
}

function checkVictory() {
    if (gPrevNum > ((gLvl ** 2) - 1)) {
        if (gGameInterval) clearInterval(gGameInterval);
        var elSpan = document.querySelector('.difficulty');
        alert(`Victory!!! You completed the game on ${elSpan.innerText} Mode 
                \nin about: ${Math.floor(gTimer)} seconds!`);
        resetBoard();
    }
}

function changeDifficulty() {
    if (gGameInterval) clearInterval(gGameInterval);
    gTimer = 0;
    gPrevNum = 0;
    var desiredLevel = gLvl + 1;
    var elSpan = document.querySelector('.difficulty');
    if (desiredLevel >= (gLevels.length + 4)) {
        gLvl = 4;
        elSpan.innerText = gLevels[0].name
    } else {
        for (var i = 0; i < gLevels.length; i++) {
            if (desiredLevel === gLevels[i].level) {
                gLvl++;
                elSpan.innerText = gLevels[i].name
            }
        }
    }
    resetNums()
    renderBoard()
}

function cellClicked(elCell, num) {
    if (gTimer === 0) gGameInterval = setInterval(showTimer, 10)
    var isRightNum = (num === gPrevNum + 1);
    if (!isRightNum) return;

    elCell.classList.add('clicked');
    gPrevNum++;
    checkVictory();
}

function showTimer() {
    gTimer += 0.011;
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = 'Timer: ' + gTimer.toFixed(3);
}