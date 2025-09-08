// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent, renderTodo, initializeProjectsContent, renderProjects, updateProjectDropdown } from "./TodoDOM.js";
import { createTodoItem, createProjectItem, addProject, addTodoToProject } from "./TodoLogic.js";
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
  };

  const handleProjectCreation = (projectName) => {
    // Add project
    addProject(projectName, projectList);
    // Handle the UI update
    renderProjects(projectList);
    updateProjectDropdown(projectList);
  }

  const onProjectSubmit = (projectData) => {
    console.log(projectData);
    // Extract the data
    const { name: projectName } = projectData;
    handleProjectCreation(projectName);
  }

    initializeTodosContent(onTodoSubmit);
    initializeProjectsContent(onProjectSubmit);
    // Add a default Project first
    handleProjectCreation("Today");
  });


