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
        }
        onTodoSubmit(todoData);
     });
}

const renderTodo = (todoItem) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";
    todoDiv.innerHTML = `
        <h4>${todoItem.title}</h4>
        <p>${todoItem.description}</p>
        <span>Due: ${todoItem.dueDate}</span>
        <span>Priority: ${todoItem.priority}</span>
    `;

    // Display the new to-do div
    const todosSection = document.querySelector(".todos-section");
    todosSection.appendChild(todoDiv);

    // return todoDiv for later use
     return todoDiv;
}

const initializeProjectsContent = (onProjectSubmit) => {
    const projectsSection = document.querySelector(".projects-section");

    // Add Projects List Div to store all the project divs
    const projectsList = document.createElement("div");
    projectsList.className = "projects-list";
    projectsSection.appendChild(projectsList);
    
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

    const projectsList = document.querySelector(".projects-list");
    projectsList.textContent = "";
    projectsList.appendChild(fragment);
}

const updateProjectDropdown = (projectList) => {
    const dropdown = document.querySelector("#project-select");
    const optionsHTML = projectList.map(project => {
        return `<option value='${ project.name }'>${ project.name }</option>`;
    }).join("");
    dropdown.innerHTML = optionsHTML;
}

export { initializeTodosContent, renderTodo, initializeProjectsContent, renderProjects, updateProjectDropdown };