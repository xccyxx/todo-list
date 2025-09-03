// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent, renderTodo, initializeProjectsContent, renderProjects, updateProjectDropdown } from "./TodoDOM.js";
import { createTodoItem, handleProjectSubmit, addTodoToProject } from "./TodoLogic.js";
import "./styles.css";


var projectList = [];

// Pre-populate UI content
document.addEventListener("DOMContentLoaded", (event) => {

  const onTodoSubmit = (todoData) => {
    // Extract the data
    const { title, description, dueDate, priority, project } = todoData;
    const selectedProjectId = parseInt(project);
    
    // Handle the business logic
    const newTodo = createTodoItem(title, description, dueDate, priority);
    addTodoToProject(newTodo, selectedProjectId, projectList);

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


