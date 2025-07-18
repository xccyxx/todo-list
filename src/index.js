// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent } from "./TodoDOM.js";
import "./styles.css";

const todo = new TodoItem("Buy milk", "Get 2% milk", "2024-12-01", "high");
console.log(todo);


// Pre-populate UI content
document.addEventListener("DOMContentLoaded", (event) => {
    initializeTodosContent();
  });