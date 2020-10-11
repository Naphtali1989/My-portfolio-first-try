'use strict';

var gFirstClick = {};

function showTimer() {
    var elTimer = document.querySelector('.timer span');
    elTimer.innerText = gSecsPassed;
    gSecsPassed += 1;
}

function changeDiff(size, mines) {
    if (gGame.isManual) return;
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    initGame();
}

function getRandEmptyCell() {
    var rowIdx = getRandomInt(0, gLevel.SIZE);
    var colIdx = getRandomInt(0, gLevel.SIZE);
    var tempCell = gBoard[rowIdx][colIdx];
    if (tempCell.isMine || (gFirstClick.i === rowIdx && gFirstClick.j === colIdx) ||
        tempCell.isShown) return getRandEmptyCell();
    else {
        return { i: rowIdx, j: colIdx };
    }
}

function setMines(board, rowIdx, colIdx) {
    var minesToPlace = gLevel.MINES;
    while (minesToPlace > 0) {
        if (gGame.isManual) break;

        gFirstClick = { i: rowIdx, j: colIdx }
        var randEmptyCell = getRandEmptyCell();
        board[randEmptyCell.i][randEmptyCell.j].isMine = true;
        minesToPlace--;
    }
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(board, i, j);
        }
    }
}

function revealNegs(board, rowIdx, colIdx) {
    gGame.isHintActive = false;
    renderHints();

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board.length - 1) continue;
            var cell = board[i][j];
            if (cell.isShown) continue;
            var location = { i: i, j: j };
            if (cell.isMine) {
                renderRevealedCell(location, MINE_BLACK);
            } else if (cell.minesAroundCount > 0) {
                renderRevealedCell(location, cell.minesAroundCount);
            } else {
                renderRevealedCell(location, '');
            }
        }
    }
    setTimeout(function() {
        renderBoard(board)
        addNumColors()
    }, 1000);
}

function addNumColors() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            var cell = gBoard[i][j];
            elCell.classList.add(`number-${cell.minesAroundCount}`)
        }
    }
}

function playVictorySound() {
    var sound = new Audio("sound/victory.mp3");
    sound.play();
}

function playSadSound() {
    var sound = new Audio("sound/sad.mp3");
    sound.play();
}

function playExplosionSound() {
    var sound = new Audio("sound/explode.mp3");
    sound.play();
}

function createCurrGameCondition() {
    var tempGame = {
        isOver: gGame.isOver,
        isOn: gGame.isOn,
        isManual: gGame.isManual,
        isHintActive: gGame.isHintActive,
        isSafeOn: gGame.isSafeOn,
        minesToPlace: gGame.minesToPlace,
        markedCount: gGame.markedCount,
        face: gGame.face
    }

    return tempGame;
}

function getPrevLocations(location) {
    var rowIdx = location.i;
    var colIdx = location.j;
    var prevStep = { i: rowIdx, j: colIdx };
    gLastMoves.push(prevStep);
}