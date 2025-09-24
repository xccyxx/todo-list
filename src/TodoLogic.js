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

const addTodo = (newTodoItem, todoList) => {
    if (newTodoItem) {
        todoList.push(newTodoItem);
    }
}

const assignTodoToProject = (todo, selectedProjectId, projects) => {
    const targetProject = projects.find(project => project.id === selectedProjectId);
    if (targetProject) {
        targetProject.todosArr.push(todo);
    }
    console.log(targetProject.todosArr);
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




export { createTodoItem, createProjectItem, addProject, addTodo, assignTodoToProject, toggleTodoCompletion, updateTodo };