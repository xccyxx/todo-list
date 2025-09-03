import TodoItem from './Todo.js';
import ProjectItem from './Project.js';

const createTodoItem = (title, description, dueDate, priority) => {
    const newTodo = new TodoItem(title, description, dueDate, priority);
    return newTodo;
};

const addTodoToProject = (todo, selectedProjectId, projectList) => {
    const targetProject = projectList.find(project => project.id === selectedProjectId);
    if (targetProject) {
        targetProject.todosArr.push(todo);
    }
    console.log(targetProject.todosArr);
}

const handleProjectSubmit = (projectData) => {
    const { name } = projectData;
    const newProject = new ProjectItem(name);
    return newProject;
}

export { createTodoItem, handleProjectSubmit, addTodoToProject };