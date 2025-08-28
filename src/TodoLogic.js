import TodoItem from './Todo.js';

const handleTodoSubmit = (todoData) => {
    const { title, description, dueDate, priority } = todoData;
    const newTodo = new TodoItem(title, description, dueDate, priority);
    console.log("Created:", newTodo);
    return newTodo;
};

const addTodoToProject = (todo, projectId) => {
    projectId.
}

const handleProjectSubmit = (projectData) => {
    const { name } = projectData;
    const newProject = new ProjectItem(name);
    return newProject;
}

export { handleTodoSubmit };