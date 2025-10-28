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
}

const addTodo = (newTodoItem, todos) => {
    if (newTodoItem) {
        todos.push(newTodoItem);
    }
}

const getFilteredTodos = (currentProjectId, projects) => {
    currentProjectId = parseInt(currentProjectId);
    const targetProject = projects.find(targetProject => targetProject.id === currentProjectId);
    return targetProject.todosArr;
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

const updateTodo = (todo, editedData, projects) => {
    // update the todo data in todo arr only
    todo.title = editedData.title;
    todo.description = editedData.description;
    todo.dueDate = editedData.dueDate;
    todo.priority = editedData.priority;

    // return the updated todo for future use
    return todo;
}

const updateTodoInProject = (todo, projects) => {
    const matchProject = projects.find((project) => project.todosArr.some(projectTodo => projectTodo.id === todo.id));
    // Safety check
    if (!matchProject) return;

    const index = matchProject.todosArr.findIndex(projectTodo => projectTodo.id === todo.id);
    if (index !== -1) {
        matchProject.todosArr[index] = todo;
    }
}

const reassignProject = (projects, todo, editedData) => {
    const oldProject = projects.find((project) => project.todosArr.some(projectTodo => projectTodo.id === todo.id));
    const targetProjectId = parseInt(editedData.projectId);

    // if the old project is found and the user changed the project only
    if (oldProject && oldProject.id !== targetProjectId) {
        // find the position of the todo in the matched project
        const todoIndex = oldProject.todosArr.findIndex(projectTodo => projectTodo.id === todo.id);
        // remove the todo in the old project
        oldProject.todosArr.splice(todoIndex, 1);   
        // add the todo to the new project
        assignTodoToProject(todo, targetProjectId, projects);
    }
}   

const deleteTodo = (todo, projects, todos) => {
    const matchProject = projects.find((project) => project.todosArr.some(projectTodo => projectTodo.id === todo.id));
    // delete the Todo from project list
    if (matchProject) {
        const index = matchProject.todosArr.findIndex(projectTodo => projectTodo.id === todo.id);
        matchProject.todosArr.splice(index, 1);
    }

    // delete the Todo from todo list
    const index = todos.findIndex(todoItem => todoItem.id === todo.id);
    if (index !== -1) {
        todos.splice(index, 1);
    }
}


export { createTodoItem, createProjectItem, addProject, addTodo, getFilteredTodos, assignTodoToProject, toggleTodoCompletion, updateTodo, updateTodoInProject, reassignProject, deleteTodo };