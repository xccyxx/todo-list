import TodoItem from './Todo.js';
import ProjectItem from './Project.js';

const handleTodoSubmit = (todoData) => {
    const { title, description, dueDate, priority } = todoData;
    const newTodo = new TodoItem(title, description, dueDate, priority);
    return newTodo;
};

const addTodoToProject = (todo, projectId) => {
}

const handleProjectSubmit = (projectData) => {
    const { name } = projectData;
    const newProject = new ProjectItem(name);
    return newProject;
}

export { handleTodoSubmit, handleProjectSubmit };