const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editToDo = null;

// function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();

    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return;
    }

    // EDIT MODE
    if (addBtn.value === "Edit") {

        // ✅ FIX: old text ko pehle store kiya
        const oldText = editToDo.target.previousElementSibling.innerHTML;

        editToDo.target.previousElementSibling.innerHTML = inputText;
        updateLocalTodos(oldText, inputText);

        addBtn.value = "Add";
        inputBox.value = "";
        editToDo = null;
        return;
    }

    // ADD MODE
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
};

// function to update todo
const updateToDo = (e) => {

    if (e.target.innerHTML === "Remove") {
        removeLocalTodos(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editToDo = e;
    }
};

// save to localStorage
const saveLocalTodos = (todo) => {
    let Todos;
    if (localStorage.getItem("Todos") === null) {
        Todos = [];
    } else {
        Todos = JSON.parse(localStorage.getItem("Todos"));
    }

    Todos.push(todo);
    localStorage.setItem("Todos", JSON.stringify(Todos));
};

// get from localStorage
const getLocalTodos = () => {
    let Todos;
    if (localStorage.getItem("Todos") === null) {
        Todos = [];
    } else {
        Todos = JSON.parse(localStorage.getItem("Todos"));
    }

    Todos.forEach(Todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = Todo;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
};

// remove from localStorage
const removeLocalTodos = (todo) => {
    let Todos = JSON.parse(localStorage.getItem("Todos")) || [];
    const todoText = todo.children[0].innerHTML;
    Todos.splice(Todos.indexOf(todoText), 1);
    localStorage.setItem("Todos", JSON.stringify(Todos));
};

// update localStorage after edit
const updateLocalTodos = (oldText, newText) => {
    let Todos = JSON.parse(localStorage.getItem("Todos"));
    const index = Todos.indexOf(oldText);
    if (index !== -1) {
        Todos[index] = newText;
    }
    localStorage.setItem("Todos", JSON.stringify(Todos));
};

const deleteLocalTodos = ()=>{
    // (left empty as in your original code)
}

document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateToDo);
