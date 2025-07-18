// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent } from "./TodoDOM.js";
import "./styles.css";



// Pre-populate UI content
document.addEventListener("DOMContentLoaded", (event) => {
    initializeTodosContent();
  });