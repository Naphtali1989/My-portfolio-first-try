'use strict';

function renderCellShown(location, value) {
    var cell = gBoard[location.i][location.j];
    var cellSelector = '.' + getClassName(location);
    var elCell = document.querySelector(cellSelector);

    elCell.classList.remove('covered');
    elCell.innerHTML = value;
    if (!cell.isShown) {
        getPrevLocations(location);
        gShownCount++;
    }
    cell.isShown = true;
}

function renderEmptyCells(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board.length - 1) continue;
            var cell = board[i][j];

            var location = { i: i, j: j };

            if (cell.isMarked) continue;
            if (cell.isShown) continue;

            if (!cell.isMine && cell.minesAroundCount > 0) {
                renderCellShown(location, cell.minesAroundCount);
            } else {
                renderCellShown(location, '');

                renderEmptyCells(board, i, j)
            }
        }
    }
}


function renderRevealedCell(location, value) {
    var cellSelector = '.' + getClassName(location);
    var elCell = document.querySelector(cellSelector);
    elCell.classList.remove('covered');
    elCell.innerHTML = value;
}

function renderLives() {
    var elLifeCount = document.querySelector('.lives span');
    var strHTML = '';
    for (var i = 0; i < gLifeCount; i++) {
        strHTML += LIVES;
    }
    elLifeCount.innerHTML = strHTML;
}

function renderFlags() {
    var elFlagCount = document.querySelector('.flags-left span');
    elFlagCount.innerHTML = gGame.markedCount;
}

function renderFlagsForWin(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            if (cell.isShown) continue;

            var location = { i: i, j: j };
            var cellSelector = '.' + getClassName(location);
            var elCell = document.querySelector(cellSelector);
            elCell.innerHTML = FLAG;
        }
    }
}

function renderSafeClicks() {
    var elSafeClickCount = document.querySelector('.safe-click span');
    elSafeClickCount.innerHTML = gSafeClickCount;
}

function renderHints() {
    var elHintCounter = document.querySelector(`.hints span`);
    var strHTML = '';
    for (var i = 0; i < gHintsCount; i++) {
        strHTML += (i === 0 && gGame.isHintActive) ? HINTS_ON : HINTS_OFF;
        if (gHintsCount === 1) break;
    }
    elHintCounter.innerHTML = strHTML;
}

function renderWinners(difficulty) {
    var currStorage = localStorage.getItem(`Winners-${difficulty}`);
    if (!currStorage) return;

    var currWinners = organizeWinnersIntoArr(currStorage);
    var strHTML = `<tr> <th colspan="2" class="high-score-head">${difficulty}</th></tr>
                <tr>
                <td class="high-score-sub-head">Name</td>
                <td class="high-score-sub-head">Seconds</td>
                </tr>`;
    for (var i = 0; i < currWinners.length; i++) {
        strHTML += `<tr><td class="high-score-cell">${currWinners[i].name}</td>
                        <td class="high-score-cell">${currWinners[i].time}</td></tr>`;
    }

    var elHighScore = document.querySelector('.high-scores');
    elHighScore.innerHTML = strHTML;

    var winnersStr = changeObjsToStr(currWinners);
    localStorage.setItem(`Winners-${difficulty}`, winnersStr);
}