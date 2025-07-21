import TodoItem from './Todo.js';

const handleTodoSubmit = (todoData) => {
    const { title, description, dueDate, priority } = todoData;
    const newTodo = new TodoItem(title, description, dueDate, priority);
    console.log("Created:", newTodo);
    return newTodo;
};

export { handleTodoSubmit };