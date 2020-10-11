'use strict';

const TABLE_HEADER = `<tr class="header-row">
<td class="header-cell name-header" onclick="onSetSortBy('name')">Name <img src="imgs/arrow.svg" class="arrow-icon"></td>
<td class="header-cell price-header" onclick="onSetSortBy('price')">Price <img src="imgs/arrow.svg" class="arrow-icon"></td>
<td class="header-cell actions-header">Actions</td>
</tr>`;


function renderBooks() {
    var books = getBooks();
    var strHTMLs = books.map(function(book) {
        return `<tr class="book-row ${book.name}">
            <td class="book-cell name">${book.name}</td>
            <td class="book-cell price">$${book.price}</td>
            <td class="book-cell actions">
                <button class="read-btn" onclick="onReadBook('${book.id}')">Read</button>
                <button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
                <button class="delete-btn" onclick="onDeleteBook('${book.id}')">Delete</button>
            </td>
        </tr>`
    });
    strHTMLs.unshift(TABLE_HEADER);
    var elBookTable = document.querySelector('.book-table');
    elBookTable.innerHTML = strHTMLs.join('');
}

function renderBookDetails(book) {
    var strHTML = `
                    <div class="top-part">
                    ${book.imgUrl}
                        <button class="close-modal" onclick="onCloseModal()">X</button>
                    </div>
                    <div class="book-details">
                        <h1 class="book-header"">${book.name}</h1>
                        <h4>Price: $${book.price}</h4>
                        <div class="rating-details">
                            <button class="adding-btn" onclick="onRateBook('${book.id}', 1)">+</button>
                            <h1 class="book-rate"> Rating: ${book.rate}</h1>
                            <button class="subbing-btn" onclick="onRateBook('${book.id}', -1)">-</button>
                        </div>
                        <p>${book.summary}</p>
                    </div>
    `;
    var elBookDetails = document.querySelector('.hidden-details');
    elBookDetails.innerHTML = strHTML;
}

function onAddBook() {
    var elBookName = document.querySelector('.book-adder input[name=bookName]');
    var name = elBookName.value;
    var elPrice = document.querySelector('.book-adder input[name=price]');
    var price = elPrice.value;
    if (!name) return;
    addBook(name, price);
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    updateBook(bookId);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    renderBookDetails(book);
    toggleModalVisibility();
}

function onCloseModal() {
    toggleModalVisibility();
}

function onRateBook(bookId, diff) {
    rateBook(bookId, diff);
    var book = getBookById(bookId);
    renderBookDetails(book);
}

// function onAddRating(bookId, rate) {
//     addRating(bookId, rate);
//     var book = getBookById(bookId);
//     renderBookDetails(book);
// }

// function onSubtractRating(bookId, rate) {
//     subtractRating(bookId, rate);
//     var book = getBookById(bookId);
//     renderBookDetails(book);
// }

function onChangePage(diff) {
    changePage(diff);
    renderPageNum();
    renderBooks();
}

function onGetPrevPage() {
    getPrevPage();
    renderPageNum();
    renderBooks();
}

function onGetNextPage() {
    getNextPage();
    renderPageNum();
    renderBooks();
}

function onSetSortBy(sortBy) {
    setSort(sortBy);
    sortBooksForDisplay();
    renderBooks();
    toggleArrowIcon();
}

function renderPageNum() {
    var elSpan = document.querySelector('.curr-page-num');
    elSpan.innerHTML = gPageIdx + 1;
}









// My flex experience:
// const TABLE_HEADER = `<div class="header-row">
// <div class="header-cell name-header" onclick="onSortBy('name')"><h1>Name</h1></div>
// <div class="header-cell price-header" onclick="onSortBy('price')><h1>Price</h1></div>
// <div class="header-cell actions-header"><h1>Actions</h1></div>
// </div>`;

// function renderBooks() {
//     var books = getBooks();
//     var strHTML = books.map(function(book) {
//         return `<div class="book-row ${book.name}">
//             <div class="book-cell name"><h1>${book.name}</h1></div>
//             <div class="book-cell price"><h1>$${book.price}</h1></div>
//             <div class="book-cell actions">
//                 <button class="read-btn" onclick="onReadBook('${book.id}')">Read</button>
//                 <button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
//                 <button class="delete-btn" onclick="onDeleteBook('${book.id}')">Delete</button>
//             </div>
//         </div>`
//     });
//     strHTML.unshift(TABLE_HEADER);
//     var elBookTable = document.querySelector('.book-table');
//     elBookTable.innerHTML = strHTML.join('');
// }