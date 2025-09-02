// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent, renderTodo, initializeProjectsContent } from "./TodoDOM.js";
import { handleTodoSubmit } from "./TodoLogic.js";
import "./styles.css";



// Pre-populate UI content
document.addEventListener("DOMContentLoaded", (event) => {

  const onTodoSubmit = (todoData) => {
    // Handle the business logic
    const newTodo = handleTodoSubmit(todoData);
    
    // Handle the UI update
    renderTodo(newTodo);
    
    // Could add more here: save to localStorage, analytics, etc.
  };

  const onProjectSubmit = (projectData) => {
    // Handle the business logic
    const newProject = handleTodoSubmit(projectData);
    
    // Handle the UI update
    renderProject(newProject);
    
    // Could add more here: save to localStorage, analytics, etc.
  }

    initializeTodosContent(onTodoSubmit);
    initializeProjectsContent(onProjectSubmit);
  });


