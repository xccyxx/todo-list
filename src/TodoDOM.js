import TodoItem from "./Todo.js";
import ProjectItem from "./Project.js";
import { deleteTodo } from "./TodoLogic.js";

const initializeTodosContent = (onTodoSubmit) => {
    const todosSection = document.querySelector(".todos-section");
    
    // Create to-do form
    const addTodoFormContainer = document.createElement("div");
    addTodoFormContainer.className = 'add-todo-form-container';
    const addTodoForm = document.createElement('form');

    // Create form HTML
    addTodoForm.innerHTML = `
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
            <input type="date" id="dueDate" name="dueDate" required>
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
    addTodoFormContainer.appendChild(addTodoForm);
    todosSection.appendChild(addTodoFormContainer);
     
    // Set up event listener for data processing
    addTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(addTodoForm);

        const todoData = {
            title: formData.get('title'),
            description: formData.get('description'), 
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            project: formData.get("project")
        }
        onTodoSubmit(todoData);
     });

    // Add Todo List Div to store all the project divs
    const todosContainer = document.createElement("div");
    todosContainer.className = "todos-container";
    todosSection.appendChild(todosContainer);
}

const renderTodos = (todos, projects, onCompletedToggle, handleEditButtonClick, handleDeleteButtonClick) => {
    const fragment = document.createDocumentFragment();
    todos.forEach(todo => {
        // a "card" for each to-do
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        todoDiv.dataset.todoId = todo.id;
        // Add on-click to expand details
        todoDiv.addEventListener("click", () => {
            showTodoDetailsModal(todo, projects, handleEditButtonClick);
        })

        // add todo-view for displaying and hiding purpose
        todoDiv.innerHTML = `
            <div class="todo-view">
                <div class="todo-header">
                    <input type="checkbox" class="complete-checkbox" ${todo.completed? "checked" : ""}/>
                    <h4>${todo.title}</h4>
                </div>
                <p>Due: ${todo.dueDate}</p>
                <button type="button" class="edit-btn">Edit</button>     
                <button type="button" class="delete-btn">Delete</button>
            </div>
        `;

        // Add on-click todo completion toggling
        const completeCheckbox = todoDiv.querySelector(".complete-checkbox");
        completeCheckbox.addEventListener("click", () => {
            onCompletedToggle(todo);
            console.log(todo.completed);
        })

        // Add on-click delete the form
        const deleteButton = todoDiv.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            handleDeleteButtonClick(todo);
        })

        fragment.appendChild(todoDiv);
    })

    // Display the new to-do div
    const todosContainer = document.querySelector(".todos-container");
    todosContainer.innerHTML = "";
    todosContainer.appendChild(fragment);
}

const showTodoDetailsModal = (todo, projects, handleEditButtonClick) => {
    const dialog = document.createElement("dialog");
    dialog.className = "todo-details-modal";

    // find out matched project that the todo belongs to
    const matchProject = projects.find((project) => project.todosArr.includes(todo));

    dialog.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>Due: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <p>Project: ${matchProject?.name || "None"}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <button class="close-btn">Close</button>
    `
    document.body.appendChild(dialog);
    dialog.showModal();

    // Add on-click edit the form
    const editButton = dialog.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        dialog.close();
        dialog.remove();
        handleEditButtonClick(todo.id, todo);
    })
}

const enterEditMode = (todoId, todo, projects, matchProject, onTodoEdit) => {
    // const todoDiv = document.querySelector(`[data-todo-id="${todoId}"]`);
    // // Hide the current HTML elements
    // const todoView = todoDiv.querySelector(".todo-view");
    // todoView.style.display = "none";

    const dialog = document.createElement("dialog");
    dialog.className = "todo-edit-modal";

    // Create to-do edit form that look like the Todo Divs
    const editForm = dialog.createElement('form');
    editForm.className = 'todo-edit-form';
    
    // Create form HTML
    dialog.innerHTML = `
        <form class="todo-edit-form" method="dialog">
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
            <button type="button" class="exit-edit-btn">Cancel</button>
        </form>

    `;

    // pre-set the default value of the priority dropdown
    editForm.querySelector('.todo-priority').value = todo.priority;

    // append the form to the todo div
    dialog.appendChild(editForm);
    dialog.showModal();

    // pre-set the default value of the project dropdown
    populateProjectDropdown(dialog, projects);
    editForm.querySelector(".project-select").value = matchProject.id;


    // Set up event listener for data processing
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(editForm);

        const editedData = {
            title: formData.get('title'),
            description: formData.get('description'), 
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            projectId: formData.get("project")
        }
        onTodoEdit(todo, editedData);
     });

    // Set up event listener for the Cancel btn
    const exitBtn = dialog.querySelector(".exit-edit-btn");
    exitBtn.addEventListener("click", () => {
        exitEditMode(todoId, todo);
    })
}

const exitEditMode = (todoId, todo) => {
    const todoDiv = document.querySelector(`[data-todo-id="${todoId}"]`);
    // Hide the current HTML elements
    const todoView = todoDiv.querySelector(".todo-view");
    todoView.style.display = "block";

    // Delete the to-do edit form
    const editForm = todoDiv.querySelector(".todo-edit-form");
    editForm.remove();
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

        // Todo items as li
        const todosHTML = project.todosArr
            .map(todo => `<li><p class="todo-title">${todo.title}</p><p>Due: ${todo.dueDate}</p></li>`)
            .join("");

        // create each div for each project containing all the todos
        projectDiv.innerHTML = `
            <h4>${project.name}</h4>
            <ul>${todosHTML}</ul>
        `;

        fragment.appendChild(projectDiv);
    })

    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.innerHTML = "";
    projectsContainer.appendChild(fragment);
}

const updateAllProjectDropdown = (projects) => {
    const dropdowns = document.querySelectorAll(".project-select");
    const optionsHTML = projects.map(project => {
        return `<option value='${ project.id }'>${ project.name }</option>`;
    }).join("");
    dropdowns.forEach((dropdown) => {
        dropdown.innerHTML = optionsHTML;
    })
}

const populateProjectDropdown = (container, projects) => {
    const dropdown = container.querySelector(".project-select");
    const optionsHTML = projects.map(project => {
        return `<option value='${ project.id }'>${ project.name }</option>`;
    }).join("");
    dropdown.innerHTML = optionsHTML;
}


export { initializeTodosContent, renderTodos, initializeProjectsContent, renderProjects, updateAllProjectDropdown, enterEditMode, exitEditMode };