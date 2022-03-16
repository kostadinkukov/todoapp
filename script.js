const addBtn = document.getElementById("add-button");
addBtn.addEventListener('click', addItems);


const clearBtn = document.getElementById("clear-completed-button");
clearBtn.addEventListener('click', clearCompletedToDoItems);

const emptyBtn = document.getElementById("empty-button");
emptyBtn.addEventListener('click', emptyList)

const saveBtn = document.getElementById("save-button");
saveBtn.addEventListener('click', saveList);


const toDoentryBox = document.getElementById("todo-entry-box");  
const toDoList = document.getElementById("todo-list");           


function newToDoItems(itemText, complete) {                       
    const toDoItem = document.createElement("li");
    const toDoText = document.createTextNode(itemText);
    toDoItem.append(toDoText);

    if (complete) {
        toDoItem.classList.add("completed")
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener('dblclick', toggleToDoItemState)
}

function addItems() {
    const itemText = toDoentryBox.value;
    newToDoItems(itemText, false)
}

function toggleToDoItemState() {                                 
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function clearCompletedToDoItems() {
    const completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    const  toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

function saveList() {
    const toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children.item(i);

        let toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItems(toDo.task, toDo.completed);
        }
    }
}
loadList();