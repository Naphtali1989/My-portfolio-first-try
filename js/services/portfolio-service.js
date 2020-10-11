'use strict';

var gPortItems = [{
        id: 'minesweeper',
        name: 'minesweeper',
        title: 'My Minesweeper',
        desc: 'My first fully functional web page based game.',
        category: 'Games',
        imgUrl: '01',
        url: 'projs/minesweeper',
        publishedAt: 1448693940000,
        fullDesc: `This is my Minesweeper project, 
                    I have made it in accordance to the specifications requested by the Coding Academy group.
                    `,
    },
    {
        id: 'icon-shop',
        name: 'icon-shop',
        title: 'My icon-shop',
        desc: 'A fictional icons shop.',
        category: 'Web pages',
        imgUrl: '02',
        url: 'projs/icon-shop',
        publishedAt: 1448693940000,
        fullDesc: `This is an Icon Shop simulator, 
                    I played with the possibilities of cutting out icons from a Sprite image and added some functinoality.
                    `,
    }, {
        id: 'safe-content',
        name: 'safe-content',
        title: 'My safe-content',
        desc: 'A web page log-in and admin content.',
        category: 'Web pages',
        imgUrl: '03',
        url: 'projs/safe-content',
        publishedAt: 1448693940000,
        fullDesc: `This is a "Safe-content" project, 
                    I made a log-in page as well as a basic welcome page. I added an Admin page with a table of available users.
                    `,
    },
    {
        id: 'book-shop',
        name: 'book-shop',
        title: 'My Bookshop',
        desc: 'A rendered table for a bookshop web page.',
        category: 'Web pages',
        imgUrl: '04',
        url: 'projs/book-shop',
        publishedAt: 1448693940000,
        fullDesc: `This is my Book Shop project, 
                    I made a CRUDL based table of books, which is fully functional and has an extra sorting up/down feature.
                    `,
    }, {
        id: 'todos',
        name: 'todos',
        title: 'My to-do list',
        desc: 'A web page with a simple to-do list.',
        category: 'Web pages',
        imgUrl: '05',
        url: 'projs/todos',
        publishedAt: 1448693940000,
        fullDesc: `This is my To do list project, 
                    I made a to do list based on specifications from Coding Academy staff, with full functionality.
                    `,
    },
    {
        id: 'touch-nums',
        name: 'touch-nums',
        title: 'My touch-nums game',
        desc: 'A simple web page based game of numbers.',
        category: 'Games',
        imgUrl: '06',
        url: 'projs/touch-nums',
        publishedAt: 1448693940000,
        fullDesc: `This is my touch nums project, 
                    This is a gamer where you need to pres on the next number based on the last one you clicked.
                    `,
    }
];


function getPortItems() {
    return gPortItems;
}

function getPortItemById(itemId) {
    return gPortItems.find(function(item) {
        return itemId === item.id;
    });
}