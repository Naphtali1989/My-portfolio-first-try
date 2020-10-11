const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gSortBy = 'none';
var gTodos = _createTodos();


function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return gTodos;
    var res = gTodos.filter(function(todo) {
        return (
            gFilterBy === 'DONE' && todo.isDone ||
            gFilterBy === 'ACTIVE' && !todo.isDone
        )
    })
    return res;
}

function sortTodosForDisplay() {
    var sorter;
    if (gSortBy === 'none') return;
    else if (gSortBy === 'txt') sorter = 'txt';
    else if (gSortBy === 'created') sorter = 'createdAt';
    else if (gSortBy === 'prio') sorter = 'prio';
    gTodos.sort(compareValues(sorter));
}

function addTodo(txt, prio) {
    gTodos.unshift(_createTodo(txt, prio))
    saveToStorage(STORAGE_KEY, gTodos);
}

function removeTodo(id) {
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === id
    })
    var sure = confirm('Are you sure you want to delete this mission?');
    if (!sure) return;
    gTodos.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gTodos);
}

function MoveTodoDown(id) {
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === id
    });
    if (idx === (-1) || idx >= gTodos.length - 1) return;

    var targetIdx = idx + 1;
    var currTodo = gTodos.splice(idx, 1);
    gTodos.splice(targetIdx, 0, currTodo.pop());

}

function MoveTodoUp(id) {
    var idx = gTodos.findIndex(function(todo) {
        return todo.id === id
    });
    if (idx === 0) return;

    var targetIdx = idx - 1;
    var currTodo = gTodos.splice(idx, 1);
    gTodos.splice(targetIdx, 0, currTodo.pop());

}

function toggleTodo(id) {
    var todo = gTodos.find(function(todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    var count = gTodos.reduce(function(count, todo) {
        if (!todo.isDone) count += 1
        return count;
    }, 0)
    return count;
}

function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function(todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

function getEmptyMsg(str) {
    if (gTodos.length === 0) return getEmptyAlert('none');
    var areNoneActive = gTodos.every(function(todo) {
        return (!todo.isDone);
    });
    console.log('areNoneActive are: ', areNoneActive)
    if (areNoneActive) {
        str += getEmptyAlert('done');
    } else { str += getEmptyAlert(''); }
    return str;
}



// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt, prio) {
    return {
        id: makeId(),
        txt,
        isDone: false,
        createdAt: createTimeStamp(),
        prio
    };
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = []
        todos.push(_createTodo('Learn HTML', 1))
        todos.push(_createTodo('Master CSS', 2))
        todos.push(_createTodo('Become JS Ninja', 3))
    }
    return todos;
}