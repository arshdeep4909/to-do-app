// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// functions

function addTodo(event) {
  event.preventDefault();

  //adding a new item to todo-list  section
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);

  const checkButton = document.createElement("button");
  checkButton.classList.add("check-button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(checkButton);

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    removelocaltodos(todo);
    todo.remove();
  }

  if (item.classList[0] === "check-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    if (e.target.value === "all") {
      todo.style.display = "flex";
    } else if (e.target.value === "complete") {
      if (todo.classList.contains("completed")) {
        todo.style.display = "flex";
      } else todo.style.display = "none";
    } else {
      if (!todo.classList.contains("completed")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
  });
}

// ADDING LOCAL STORAGE FUNCTIONS

//saving the lists when added to the local storage
// we call this function when we create the list in the addTodo function
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) todo = [];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// getting the todo from local storage when we load the page

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //adding a new item to todo-list  section
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkButton);

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removelocaltodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;

  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
