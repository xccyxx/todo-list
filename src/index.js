// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent, renderTodos, initializeProjectsContent, renderProjects, updateProjectDropdown } from "./TodoDOM.js";
import { createTodoItem, createProjectItem, addProject, addTodo, assignTodoToProject, toggleTodoCompletion } from "./TodoLogic.js";
import "./styles.css";


var projectList = [];
var todoList = [];

// Pre-populate UI content
document.addEventListener("DOMContentLoaded", (event) => {

  const onTodoSubmit = (todoData) => {
    // Extract the data
    const { title, description, dueDate, priority, project } = todoData;
    const selectedProjectId = parseInt(project);
    
    // Handle the business logic
    const newTodo = createTodoItem(title, description, dueDate, priority);
    addTodo(newTodo, todoList);
    assignTodoToProject(newTodo, selectedProjectId, projectList);

    // Handle the UI update
    renderTodos(todoList, onCompletedToggle);
  };

  const handleProjectCreation = (projectName) => {
    // Add project
    addProject(projectName, projectList);
    // Handle the UI update
    renderProjects(projectList);
    updateProjectDropdown(projectList);
  }

  const onProjectSubmit = (projectData) => {
    // Extract the data
    const { name: projectName } = projectData;
    handleProjectCreation(projectName);
  }

  const onCompletedToggle = (todo) => {
    toggleTodoCompletion(todo);
    // Then re-render the todos to show updated state
    renderTodos(todoList, onCompletedToggle);
  };

  const onPriorityChange = () => {
    rendorPriorityList();
  }

    initializeTodosContent(onTodoSubmit);
    initializeProjectsContent(onProjectSubmit);
    // Add a default Project first
    handleProjectCreation("Today");
  });


