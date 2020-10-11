'use strict';

var gPortItems = [{
        id: 'minesweeper',
        name: 'minesweeper',
        title: 'My Minesweeper',
        desc: 'My first fully functional web page based game.',
        category: 'Games',
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
        url: 'projs/icon-shop',
        publishedAt: 1448693940000,
    }, {
        id: 'safe-content',
        name: 'safe-content',
        title: 'My safe-content',
        desc: 'A web page log-in and admin content.',
        category: 'Web pages',
        url: 'projs/safe-content',
        publishedAt: 1448693940000,
    },
    {
        id: 'book-shop',
        name: 'book-shop',
        title: 'My Bookshop',
        desc: 'A rendered table for a bookshop web page.',
        category: 'Web pages',
        url: 'projs/book-shop',
        publishedAt: 1448693940000,
    }, {
        id: 'todos',
        name: 'todos',
        title: 'My to-do list',
        desc: 'A web page with a simple to-do list.',
        category: 'Web pages',
        url: 'projs/todos',
        publishedAt: 1448693940000,
    },
    {
        id: 'touch-nums',
        name: 'touch-nums',
        title: 'My touch-nums game',
        desc: 'A simple web page based game of numbers.',
        category: 'Games',
        url: 'projs/touch-nums',
        publishedAt: 1448693940000,
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