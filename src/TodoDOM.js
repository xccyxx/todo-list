import TodoItem from "./Todo.js";
import ProjectItem from "./Project.js";

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
        <div>
            <select name="project" id="project-select">
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

        const todoData = {
            title: formData.get('title'),
            description: formData.get('description'), 
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            project: formData.get("project")
        }
        onTodoSubmit(todoData);
     });

    // Add Todos List Div to store all the project divs
    const todosContainer = document.createElement("div");
    todosContainer.className = "todos-container";
    todosSection.appendChild(todosContainer);
}

const renderTodo = (todos) => {
    const fragment = document.createDocumentFragment();
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        todoDiv.innerHTML = `
            <h4>${todo.title}</h4>
            <p>${todo.description}</p>
            <span>Due: ${todo.dueDate}</span>
            <span>Priority: ${todo.priority}</span>
            <p>${todo.completed}</p>
        `;
        fragment.appendChild(todoDiv);
    })

    // Display the new to-do div
    const todosContainer = document.querySelector(".todos-container");
    todosContainer.innerHTML = "";
    todosContainer.appendChild(fragment);
}

const initializeProjectsContent = (onProjectSubmit) => {
    const projectsSection = document.querySelector(".projects-section");

    // Add Projects List Div to store all the project divs
    const projectsContainer = document.createElement("div");
    projectsContainer.className = "projects-container";
    projectsSection.appendChild(projectsContainer);
    
    // Create to-do form
    const projectForm = document.createElement('form');
    projectForm.className = 'project-form';

    // Create form HTML
    projectForm.innerHTML = `
        <h3>Add New Project</h3>
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <button type="submit">Add Project</button>
    `;

    // Add the form to the projectS section
     projectsSection.appendChild(projectForm);
    
     // Set up event listener for data processing
     projectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(projectForm);
        const projectData = {
            name: formData.get("name")
        }
        onProjectSubmit(projectData);
     });
}

const renderProjects = (projects) => {
    const fragment = document.createDocumentFragment();
    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project-item";
        projectDiv.innerHTML = `
            <h4>${project.name}</h4>
            <p>${project.todosArr}</p>
        `;
        fragment.appendChild(projectDiv);
    })

    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.innerHTML = "";
    projectsContainer.appendChild(fragment);
}

const updateProjectDropdown = (projects) => {
    const dropdown = document.querySelector("#project-select");
    const optionsHTML = projects.map(project => {
        return `<option value='${ project.id }'>${ project.name }</option>`;
    }).join("");
    dropdown.innerHTML = optionsHTML;
}

export { initializeTodosContent, renderTodo, initializeProjectsContent, renderProjects, updateProjectDropdown };