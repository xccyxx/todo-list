// index.js
import { greeting } from "./greeting.js";
import TodoItem from "./Todo.js";
import { initializeTodosContent, renderTodos, initializeProjectsContent, renderProjects, updateAllProjectDropdown, enterEditMode, exitEditMode } from "./TodoDOM.js";
import { createTodoItem, createProjectItem, addProject, addTodo, assignTodoToProject, toggleTodoCompletion, updateTodo, reassignProject, deleteTodo } from "./TodoLogic.js";
import "./styles.css";


let projectList = [];
let todoList = [];

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
      renderTodos(todoList, projectList, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
    renderProjects(projectList);                   
  };

  const handleProjectCreation = (projectName) => {
    // Add project
    addProject(projectName, projectList);
    // Handle the UI update
    renderProjects(projectList);
    updateAllProjectDropdown(projectList);
  }

  const onProjectSubmit = (projectData) => {
    // Extract the data
    const { name: projectName } = projectData;
    handleProjectCreation(projectName);
  }

  const onCompletedToggle = (todo) => {
    toggleTodoCompletion(todo);
    // Then re-render the todos to show updated state
    renderTodos(todoList, projectList, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
  };

  const handleEditButtonClick = (todoId, todo) => {
    // find the project that the todo belongs to
    const matchProject = projectList.find((project) => project.todosArr.includes(todo));
    // Handle the UI update
    enterEditMode(todoId, todo, projectList, matchProject, onTodoEdit);
  };  

  const onTodoEdit = (todo, editedData) => {
    updateTodo(todo, editedData);
    reassignProject(projectList, todo, editedData);
    renderTodos(todoList, projectList, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
    renderProjects(projectList);
  }

  const handleDeleteButtonClick = (todo) => {
    deleteTodo(todo, projectList, todoList);
    renderTodos(todoList, projectList, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);  
  }

  initializeTodosContent(onTodoSubmit);
  initializeProjectsContent(onProjectSubmit);
  // Add a default Project first
  handleProjectCreation("Default");
  });


