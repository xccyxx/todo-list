import TodoItem from "./Todo.js";

const initializeTodosContent = (onTodoSubmit) => {
    const todosSection = document.querySelector(".todos-section");
    
    // Create to-do form
    const todoForm = document.createElement('form');
    todoForm.className = 'todo-form';

    // Create form HTML
    todoForm.innerHTML = `
        <h3>Add New Todo</h3>
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description"></textarea>
        </div>
        <div>
            <label for="dueDate">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate">
        </div>
        <div>
            <label for="priority">Priority:</label>
            <select id="priority" name="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <button type="submit">Add Todo</button>
    `;

    // Add the form to the todos section
     todosSection.appendChild(todoForm);

     // Set up event listener for data processing
     todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(todoForm);

        const title = formData.get('title');
        const description = formData.get('description');  
        const dueDate = formData.get('dueDate');
        const priority = formData.get('priority');
        const newTodo = new TodoItem(title, description, dueDate, priority);
        console.log("Created todo:", newTodo);
     });}

export { initializeTodosContent };