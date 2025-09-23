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
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>
        <div>
            <label for="project">Assign to Project:</label>
            <select name="project" class="project-select">
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

const renderTodos = (todos, onCompletedToggle, handleEditButtonClick) => {
    const fragment = document.createDocumentFragment();
    todos.forEach(todo => {
        // a "card" for each to-do
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        todoDiv.dataset.todoId = todo.id;
        // add todo-view for displaying and hiding purpose
        todoDiv.innerHTML = `
            <div class="todo-view">
                <h4>${todo.title}</h4>
                <p>${todo.description}</p>
                <p>Due: ${todo.dueDate}</p>
                <p class="priority">Priority: ${todo.priority} </p>
                <p>Completed: ${todo.completed? "✅" : "❌"}</p>
                <button type="button" class="complete-btn">${todo.completed? "Uncomplete" : "Complete"}</button>
                <button type="button" class="edit-btn">Edit</button>     
            </div>
        `;

        // Add on-click todo completion toggling
        const completeButton = todoDiv.querySelector(".complete-btn");
        completeButton.addEventListener("click", () => {
            onCompletedToggle(todo);
        })

        // Add on-click edit the form
        const editButton = todoDiv.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
            handleEditButtonClick(todo.id, todo);
        })

        fragment.appendChild(todoDiv);
    })

    // Display the new to-do div
    const todosContainer = document.querySelector(".todos-container");
    todosContainer.innerHTML = "";
    todosContainer.appendChild(fragment);
}

const enterEditMode = (todoId, todo, projects, matchProject, onTodoEdit) => {
    const todoDiv = document.querySelector(`[data-todo-id="${todoId}"]`);
    // Hide the current HTML elements
    const todoView = todoDiv.querySelector(".todo-view");
    todoView.style.display = "none";

    // Create to-do edit form that look like the Todo Divs
    const editForm = document.createElement('form');
    editForm.className = 'todo-edit-form';
    
    // Create form HTML
    editForm.innerHTML = `
        <h3>Edit Todo:</h3>
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value="${todo.title}" required>
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description">${todo.description}</textarea>
        </div>
        <div>
            <label for="dueDate">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" value="${todo.dueDate}">
        </div>
        <div>
            <label for="priority">Priority:</label>
            <select id="priority" name="priority" class="todo-priority">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>
        <div>
            <label for="project">Assign to Project:</label>
            <select name="project" class="project-select">
            </select>
        </div>
        <button type="submit">Confirm</button>
    `;

    // pre-set the default value of the priority dropdown
    editForm.querySelector('.todo-priority').value = todo.priority;

    // append the form to the todo div
    todoDiv.appendChild(editForm);

    // pre-set the default value of the project dropdown
    updateProjectDropdown(projects);
    editForm.querySelector(".project-select").value = matchProject.id;



    // // Set up event listener for data processing
    // editForm.addEventListener("submit", (e) => {
    //     e.preventDefault();

    //     const formData = new FormData(editForm);

    //     const todoData = {
    //         title: formData.get('title'),
    //         description: formData.get('description'), 
    //         dueDate: formData.get('dueDate'),
    //         priority: formData.get('priority'),
    //         project: formData.get("project")
    //     }
    //     onTodoSubmit(todoData);
    //  });
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
    const dropdowns = document.querySelectorAll(".project-select");
    const optionsHTML = projects.map(project => {
        return `<option value='${ project.id }'>${ project.name }</option>`;
    }).join("");
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = optionsHTML;
    })
}

const rendorPriorityList = (todoId) => {
    const priorityElement = document.querySelector(`#${todoId} .priority`);
    priorityElement.innerHTML = 
    `
        <div>
            <label for="priority">Priority:</label>
            <select id="priority" name="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    `
}

export { initializeTodosContent, renderTodos, initializeProjectsContent, renderProjects, updateProjectDropdown, enterEditMode };