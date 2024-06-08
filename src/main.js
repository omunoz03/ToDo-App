import "../style.css";

// Array to store our todos
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodoId = 4;
let filter = "all"; // Initial filter setting

// Function to render the todos based on the current filter
function renderTodos() {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = ''; // Clear the current list to avoid duplicates

  let filteredTodos = [];
  // Filter todos based on the current filter setting
  for (let i = 0; i < todos.length; i++) {
    if (filter === 'all') {
      filteredTodos.push(todos[i]);
    } else if (filter === 'active' && !todos[i].completed) {
      filteredTodos.push(todos[i]);
    } else if (filter === 'completed' && todos[i].completed) {
      filteredTodos.push(todos[i]);
    }
  }

  // Loop through the filtered todos and add them to the DOM
  for (let i = 0; i < filteredTodos.length; i++) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('p-4', 'todo-item');

    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoText.textContent = filteredTodos[i].text;
    if (filteredTodos[i].completed) {
      todoText.style.textDecoration = 'line-through';
    }

    const todoEdit = document.createElement('input');
    todoEdit.classList.add('hidden', 'todo-edit');
    todoEdit.value = filteredTodos[i].text;

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoEdit);
    todoListElement.appendChild(todoItem);
  }
}

// Function to handle adding a new todo
function handleNewTodoKeyDown(event) {
  // Check if the pressed key is 'Enter' and the input is not empty
  if (event.key === 'Enter' && this.value.trim() !== '') {
    // Add the new todo to the todos array
    todos.push({ id: nextTodoId++, text: this.value, completed: false });
    this.value = ''; // Clear the input field
    renderTodos();   // Re-render the todos
  }
}

const newTodoElement = document.getElementById('new-todo');
newTodoElement.addEventListener('keydown', handleNewTodoKeyDown);

// Function to handle marking a todo as completed
function handleTodoClick(event) {
  // Check if the clicked element has the class 'todo-text'
  if (event.target.classList.contains('todo-text')) {
    // Find the clicked todo in the todos array and toggle its completed status
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].text === event.target.textContent) {
        todos[i].completed = !todos[i].completed;
        break;
      }
    }
    renderTodos(); // Re-render the todos
  }
}

const todoListElement = document.getElementById('todo-list');
todoListElement.addEventListener('click', handleTodoClick);

// Function to handle changing the filter
function handleFilterClick(event) {
  // Check if the clicked element is an anchor tag ('A')
  if (event.target.tagName === 'A') {
    // Extract the filter value from the href attribute
    const hrefValue = event.target.getAttribute('href').slice(2);
    filter = hrefValue === '' ? 'all' : hrefValue;
    renderTodos(); // Re-render the todos based on the new filter
  }
}

const todoNavElement = document.getElementById('todo-nav');
todoNavElement.addEventListener('click', handleFilterClick);

// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', renderTodos);
