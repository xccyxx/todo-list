// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent, renderTodo, initializeProjectsContent, renderProjects, updateProjectDropdown } from "./TodoDOM.js";
import { handleTodoSubmit, handleProjectSubmit } from "./TodoLogic.js";
import "./styles.css";


var projectList = [];

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
    const newProject = handleProjectSubmit(projectData);
    
    projectList.push(newProject);
    // Handle the UI update
    renderProjects(projectList);
    
    // Could add more here: save to localStorage, analytics, etc.
    updateProjectDropdown(projectList);
  }

    initializeTodosContent(onTodoSubmit);
    initializeProjectsContent(onProjectSubmit);
  });


