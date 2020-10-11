'use strict';

const BOOK_STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 7;

var gSorterDirection = 1;
var gSortBy = '';
var gBooks;
var gPageIdx = 0;


function initShop() {
    // localStorage.clear();
    gBooks = _createBooks();
    renderBooks();
}


function getBooks() {
    var fromIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
}

function toggleModalVisibility() {
    var elModal = document.querySelector('.hidden-details')
    elModal.classList.toggle('show');
}

function getBookById(bookId) {
    var id = gBooks.find(function(book) {
        return book.id === bookId;
    })
    return id;
}

function findBookIdxById(bookId) {
    var id = gBooks.findIndex(function(book) {
        return book.id === bookId;
    })
    return id;
}

function sortBooksForDisplay() {
    gSorterDirection = (gSorterDirection === (-1)) ? 1 : -1;
    gBooks.sort(function(book1, book2) {

        var res = (book1[gSortBy] < book2[gSortBy]) ? -1 : (book1[gSortBy] > book2[gSortBy]) ? 1 : 0;
        return res * gSorterDirection;
    });
}

// function sortBooksForDisplay() {
//     gBooks.sort(compareValues(gSortBy));
// }

function toggleArrowIcon() {
    var idx;
    if (gSortBy === 'none') return;
    else if (gSortBy === 'name') idx = 0;
    else if (gSortBy === 'price') idx = 1;
    var elIcons = document.querySelectorAll('.arrow-icon')
    for (let index = 0; index < elIcons.length; index++) {
        var elIcon = elIcons[index]
        if (idx === index) {
            elIcon.classList.add('show');
        } else {
            elIcon.classList.remove('show');
        }
    }

}

function addBook(name, price) {
    var book = _createBook(name, price);
    gBooks.unshift(book);
    _saveBooksToStorage(gBooks)
}

function deleteBook(bookId) {
    var idxToDelete = findBookIdxById(bookId);
    gBooks.splice(idxToDelete, 1);
    _saveBooksToStorage(gBooks);
}

function updateBook(bookId) {
    var book = getBookById(bookId);
    var newPrice = prompt('How much does this book cost?')
    book.price = newPrice;
    _saveBooksToStorage(gBooks)
}

function rateBook(bookId, diff) {
    var book = getBookById(bookId);
    if (((book.rate === 10 && diff === 1) || (book.rate === 0 && diff === (-1)))) return;
    book.rate += diff;
    _saveBooksToStorage(gBooks)
}

function changePage(diff) {
    if (((gPageIdx * PAGE_SIZE >= gBooks.length - 3 && diff === 1) || (gPageIdx <= 0 && diff === (-1)))) return;
    gPageIdx += diff;
}

function setSort(sortBy) {
    console.log('gSortBy is:', gSortBy)
    gSortBy = sortBy;
}




// private functions duh:
function _createBook(name, price) {
    return {
        id: makeId(10),
        name,
        price,
        imgUrl: `<img src="imgs/${name}.jpg" class="book-icon ">`,
        rate: 0,
        summary: _createSummary(name)
    }
}

function _createBooks() {
    var books = loadFromStorage(BOOK_STORAGE_KEY)
    if (!books || books.length === 0) {
        books = [];
        for (let index = 0; index < 7; index++) {
            books.push(_createBook(`Harry Potter ${index + 1}`, 120));
        }
        _saveBooksToStorage(books);
    }
    return books;
}

function _saveBooksToStorage(books) {
    saveToStorage(BOOK_STORAGE_KEY, books)
}

function _createSummary(name) {
    var str = '';
    switch (name) {
        case `Harry Potter 1`:
            str = HARRY_POTTER_1;
            break;
        case `Harry Potter 2`:
            str = HARRY_POTTER_2;
            break;
        case `Harry Potter 3`:
            str = HARRY_POTTER_3;
            break;
        case `Harry Potter 4`:
            str = HARRY_POTTER_4;
            break;
        case `Harry Potter 5`:
            str = HARRY_POTTER_5;
            break;
        case `Harry Potter 6`:
            str = HARRY_POTTER_6;
            break;
        case `Harry Potter 7`:
            str = HARRY_POTTER_7;
            break;
    }
    return str;
}