import TodoItem from './Todo.js';
import ProjectItem from './Project.js';

const createTodoItem = (title, description, dueDate, priority) => {
    const newTodo = new TodoItem(title, description, dueDate, priority);
    return newTodo;
};

const createProjectItem = (projectName) => {
    const newProject = new ProjectItem(projectName);
    return newProject;
}

const addProject = (projectName, projects) => {
    // Handle the business logic
    const newProject = createProjectItem(projectName);
    projects.push(newProject);
    console.log(projects);
}

const addTodo = (newTodoItem, todos) => {
    if (newTodoItem) {
        todos.push(newTodoItem);
    }
}

const assignTodoToProject = (todo, selectedProjectId, projects) => {
    const targetProject = projects.find(project => project.id === selectedProjectId);
    if (targetProject) {
        targetProject.todosArr.push(todo);
    }
}

const toggleTodoCompletion = (todo) => {
    todo.completed = !todo.completed;
}

const updateTodo = (todo, editedData) => {
    todo.title = editedData.title;
    todo.description = editedData.description;
    todo.dueDate = editedData.dueDate;
    todo.priority = editedData.priority;
}

const reassignProject = (projects, todo, editedData) => {
    const oldProject = projects.find((project) => project.todosArr.includes(todo));
    const targetProjectId = parseInt(editedData.projectId);

    // if the old project is found and the user changed the project only
    if (oldProject && oldProject.id !== targetProjectId) {
        // find the position of the todo in the matched project
        const todoIndex = oldProject.todosArr.indexOf(todo);
        // remove the todo in the old project
        oldProject.todosArr.splice(todoIndex, 1);
        // add the todo to the new project
        assignTodoToProject(todo, targetProjectId, projects);
    }
}   

const deleteTodo = (todo, projects, todos) => {
    const matchProject = projects.find((project) => project.todosArr.includes(todo));
    if (matchProject && todos.includes(todo)) {
        // delete the Todo from project list
        const todoIndexInProjects = matchProject.todosArr.indexOf(todo);
        matchProject.todosArr.splice(todoIndexInProjects, 1);

        // delete the Todo from todo list
        const todoIndexInTodos = todos.indexOf(todo);
        todos.splice(todoIndexInTodos, 1);
    }
}


export { createTodoItem, createProjectItem, addProject, addTodo, assignTodoToProject, toggleTodoCompletion, updateTodo, reassignProject, deleteTodo };