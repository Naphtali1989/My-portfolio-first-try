'use strict';

var gSortBy = '';


function getUsersToShow() {
    var sorter;
    if (gSortBy === 'none') return;
    else if (gSortBy === 'name') sorter = 'userName';
    else if (gSortBy === 'lastlog') sorter = 'lastLoginTime';

    gUsers.sort(compareValues(sorter));
    return gUsers
}

function setSort(sortBy) {
    gSortBy = sortBy;
}