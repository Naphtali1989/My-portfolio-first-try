'use strict';

console.log('Hi');


function onInit() {
    renderTodos();
}

function renderTodos() {
    var strHTML = '';
    var todos = getTodosForDisplay();
    sortTodosForDisplay();
    todos.forEach(function(todo) {
        var upDown = ''
        if (gFilterBy === 'ALL') {
            upDown += `<button onclick="onMoveTodoUp(event,'${todo.id}')">&#8593;</button>
                        <button onclick="onMoveTodoDown(event,'${todo.id}')">&#8595</button>`;
        }
        strHTML += `<li class="${(todo.isDone)? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
        ${(upDown)? upDown : ''}
                    ${todo.txt} | 
                    </span>  - priority: ${todo.prio} | -
                    <span class="time-stamp">Created on: ${todo.createdAt}
                    <button onclick="onRemoveTodo(event,'${todo.id}')">x</button>
                    </li>`;
    })

    var elList = document.querySelector('.todo-list');
    if (todos.length === 0) {
        var emptyMsg = getEmptyMsg(strHTML);
        elList.classList.add('todo-empty');
        strHTML = emptyMsg;
    } else {
        elList.classList.remove('todo-empty');
    }
    elList.innerHTML = strHTML;

    document.querySelector('.total').innerText = getTodosCount();
    document.querySelector('.active').innerText = getActiveTodosCount();
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var txt = elNewTodoTxt.value;
    var elPrio = document.querySelector('.prio-num');
    var prio = elPrio.value;
    if (!txt || !prio) return;

    addTodo(txt, prio);
    renderTodos();
    elNewTodoTxt.value = '';
    elPrio.value = '';
}

function onMoveTodoUp(ev, todoId) {
    ev.stopPropagation();
    MoveTodoUp(todoId);
    renderTodos();
}

function onMoveTodoDown(ev, todoId) {
    ev.stopPropagation();
    MoveTodoDown(todoId);
    renderTodos();
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos();
}