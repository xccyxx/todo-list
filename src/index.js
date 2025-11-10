    // index.js
    import { greeting } from "./greeting.js";
    import TodoItem from "./Todo.js";
    import ProjectItem from "./Project.js";
    import { initializeTodosContent, renderTodos, initializeProjectsContent, renderProjects, updateAllProjectDropdown, showEditModal, exitEditMode } from "./TodoDOM.js";
    import { createTodoItem, createProjectItem, addProject, addTodo, getFilteredTodos, assignTodoToProject, toggleTodoCompletion, updateTodo, reassignProject, deleteTodo, updateTodoInProject } from "./TodoLogic.js";
    import "./styles.css";


    let projects = [];
    let todos = [];
    let currentProjectId = null;
    

      const saveProjectsToStorage = (projects) => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

      const saveTodosToStorage = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }

    // Pre-populate UI content
    document.addEventListener("DOMContentLoaded", (event) => {
      // Load the project and todo list from storage
      projects = JSON.parse(localStorage.getItem("projects")) || [];
      todos = JSON.parse(localStorage.getItem("todos")) || [];

      // Restore the static counters to the highest existing ID
      if (projects.length > 0) {
        ProjectItem.latestId = Math.max(...projects.map(project => project.id));
        console.log(ProjectItem.latestId);
      }

        if (todos.length > 0) {
        TodoItem.latestId = Math.max(...todos.map(todo => todo.id));
        console.log(TodoItem.latestId);
      }

      
      const onTodoSubmit = (todoData, todos) => {
        // Extract the data
        const { title, description, dueDate, priority, project } = todoData;
        const selectedProjectId = parseInt(project);
        
        // Handle the business logic
        const newTodo = createTodoItem(title, description, dueDate, priority);
        addTodo(newTodo, todos);
        assignTodoToProject(newTodo, selectedProjectId, projects);
        // Save to local stoarage
        saveTodosToStorage(todos);
        saveProjectsToStorage(projects);

        // Handle the UI update
        renderTodos(todos, projects, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
        renderProjects(projects, projectItemOnClick);   
      };

      const handleProjectCreation = (projectName) => {
        // Add project
        addProject(projectName, projects);

        // Save to local storage
        saveProjectsToStorage(projects);

        // Handle the UI update
        renderProjects(projects, projectItemOnClick);   
        updateAllProjectDropdown(projects);
      }

      const onProjectSubmit = (projectData) => {
        // Extract the data
        const { name: projectName } = projectData;
        handleProjectCreation(projectName);
      }

      const projectItemOnClick = (projectId) => {
        currentProjectId = projectId;
        let filteredTodos = getFilteredTodos(currentProjectId, projects);
        renderTodos(filteredTodos, projects, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
      }

      const onCompletedToggle = (todo) => {
        toggleTodoCompletion(todo);

        // Save to local stoarage
        saveTodosToStorage(todos);

        // Then re-render the todos to show updated state
        renderTodos(todos, projects, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
      };

      const handleEditButtonClick = (todoId, todo) => {
        // find the project that the todo belongs to
        const matchProject = projects.find((project) => project.todosArr.some(projectTodo => projectTodo.id === todo.id));

        // Handle the UI update
        if (matchProject) {
          showEditModal(todoId, todo, projects, matchProject, onTodoEdit);
        }
      };  

      const onTodoEdit = (todo, editedData) => {
        // Backend
        const updatedTodo = updateTodo(todo, editedData);
        reassignProject(projects, todo, editedData);
        updateTodoInProject(updatedTodo, projects);


        // Save to local stoarage
        saveTodosToStorage(todos);
        saveProjectsToStorage(projects);

        // Frontend
        renderTodos(todos, projects, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
        renderProjects(projects, projectItemOnClick);   
      }

      const handleDeleteButtonClick = (todo) => {
        // Backend
        deleteTodo(todo, projects, todos);

        // Save to local stoarage
        saveTodosToStorage(todos);
        saveProjectsToStorage(projects);

        //Frontend
        renderTodos(todos, projects, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
      renderProjects(projects, projectItemOnClick);   
      }

      // Fire the Functions to populate all the elements when DOM loaded
      initializeTodosContent(onTodoSubmit, todos, projects);
      initializeProjectsContent(onProjectSubmit);
      // Add a default Project whenever the Project list is empty
      if (projects.length === 0) {
        handleProjectCreation("Default");
        
      }
      currentProjectId = projects[0]?.id || null; 
      renderProjects(projects, projectItemOnClick);   
      let filteredTodos = getFilteredTodos(currentProjectId, projects);
      renderTodos(filteredTodos, projects, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick);
      updateAllProjectDropdown(projects);
    });


