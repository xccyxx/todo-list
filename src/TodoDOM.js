import TodoItem from "./Todo.js";
import ProjectItem from "./Project.js";
import { deleteTodo } from "./TodoLogic.js";
import { format, differenceInCalendarDays, parseISO } from 'date-fns';

const URGENCY_THRESHOLD_DAYS = 7;

const updateAllProjectDropdown = (projects) => {
    const dropdowns = document.querySelectorAll(".project-select");
    const optionsHTML = projects.map(project => {
        return `<option value='${ project.id }'>${ project.name }</option>`;
    }).join("");
    dropdowns.forEach((dropdown) => {
        dropdown.innerHTML = optionsHTML;
    })
}

const showTodoDetailsModal = (todo, projects, handleEditButtonClick, handleDeleteButtonClick) => {
    const dialog = document.createElement("dialog");
    dialog.className = "todo-details-modal";

    // find out matched project that the todo belongs to
    const matchProject = projects.find((project) => project.todosArr.some(projectTodo => projectTodo.id === todo.id));

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

    // Add on-click edit the form
    const editButton = dialog.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        handleEditButtonClick(todo.id, todo);
        dialog.close();
        dialog.remove();
    })

    // Add on-click delete the form
    const deleteButton = dialog.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
        if (confirm("Delete this todo?")) {
            handleDeleteButtonClick(todo);
            dialog.close();
            dialog.remove();
        }
    })

    // close button
    const closeButton = dialog.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
        dialog.close();
        dialog.remove();
    })

    // finalize the dialog content
    document.body.appendChild(dialog);
    dialog.showModal();
}

const populateProjectDropdown = (container, projects) => {
    const dropdown = container.querySelector(".project-select");
    const optionsHTML = projects.map(project => {
        return `<option value='${ project.id }'>${ project.name }</option>`;
    }).join("");
    dropdown.innerHTML = optionsHTML;
}

const showEditModal = (todoId, todo, projects, matchProject, onTodoEdit) => {
    const dialog = document.createElement("dialog");
    dialog.className = "todo-edit-modal";
    
    // Create form HTML
    dialog.innerHTML = `
        <form class="todo-edit-form">
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
            <button type="button" class="cancel-edit-btn">Cancel</button>
        </form>

    `;

    // pre-set the default value of the priority dropdown
    const editForm = dialog.querySelector('.todo-edit-form');
    editForm.querySelector('.todo-priority').value = todo.priority;

    // append the dialog to the web
    document.body.appendChild(dialog);
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
        dialog.close();
        dialog.remove();
     });        

    // Set up event listener for the Cancel btn
    const cancelBtn = dialog.querySelector(".cancel-edit-btn");
    cancelBtn.addEventListener("click", () => {
        dialog.close();
        dialog.remove();
    })
}

const initializeTodosContent = (onTodoSubmit, todos, projects) => {
    const todosSection = document.querySelector(".todos-section");
    
    // Create add to-do form button
    const addTodoBtn = document.createElement("button");
    addTodoBtn.textContent = "+";
    addTodoBtn.className = "add-todo-button";

    // Add the button to DOM
    todosSection.appendChild(addTodoBtn);   

    // Set up event listener for show add Todo dialog
    addTodoBtn.addEventListener("click", () => {
        //create dialog 
        const dialog = document.createElement("dialog");
        dialog.className = "add-todo-modal";
        dialog.innerHTML = `
            <form class="add-todo-form">
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
                <button type="submit">Add</button>
                <button type="button" class="cancel-add-btn">Cancel</button>
            </form>
        `
        // Populate project options of the add todo form
        populateProjectDropdown(dialog, projects);
        // append the dialog to the DOM
        document.body.appendChild(dialog);
        // show
        dialog.showModal();
        
        // FORM

        // Get form reference
        const addTodoForm = dialog.querySelector(".add-todo-form");

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
            onTodoSubmit(todoData, todos);
            dialog.close();
            dialog.remove();
        });

        // MODAL Buttons

        // Set up event listener for the Cancel btn
        const cancelBtn = dialog.querySelector(".cancel-add-btn");
        cancelBtn.addEventListener("click", () => {
            dialog.close();
            dialog.remove();
        })
    })

    // Add Todo List Div to store all the todo divs
    const todosContainer = document.createElement("div");
    todosContainer.className = "todos-container";
    todosSection.appendChild(todosContainer);
}

const initializeProjectsContent = (onProjectSubmit) => {
    const projectsSection = document.querySelector(".projects-section");

    // Add Projects List Div to store all the project divs
    const projectsContainer = document.createElement("div");
    projectsContainer.className = "projects-container";
    projectsSection.appendChild(projectsContainer);
    
    // Create project form
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

    // Add the form to the projects section
     projectsSection.appendChild(projectForm);
    
     // Set up event listener for data processing
     projectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(projectForm);
        const projectData = {
            name: formData.get("name")
        }
        onProjectSubmit(projectData);
        projectForm.reset();
     });
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
            showTodoDetailsModal(todo, projects, handleEditButtonClick, handleDeleteButtonClick);
        })

        // Due Date Reminder: Calculate days until due
        const dueDate = parseISO(todo.dueDate);
        const today = new Date();
        const daysUntilDue = differenceInCalendarDays(dueDate, today);
        
        // formatted date for styling
        const formattedDate = format(dueDate, 'MMM d, yyyy');

        // Create urgency message if within 7 days
        let urgencyMessage = '';
        if (daysUntilDue >= 0 && daysUntilDue <= URGENCY_THRESHOLD_DAYS) {
            if (daysUntilDue === 0) {
                urgencyMessage = '<p class="urgent-message urgent">Due today</p>';
            } else if (daysUntilDue === 1) {
                urgencyMessage = '<p class="urgent-message urgent">Due tomorrow</p>';
            } else {
                urgencyMessage = `<p class="urgent-message urgent">Due in ${daysUntilDue} days</p>`;
            }
        // if overdue
        } else if (daysUntilDue < 0) {
            urgencyMessage = daysUntilDue === -1 
                ? '<p class="urgent-message overdue">Overdue by 1 day</p>'
                : `<p class="urgent-message overdue">Overdue by ${Math.abs(daysUntilDue)} days</p>`;
        }

        // add todo-view for displaying and hiding purpose
        todoDiv.innerHTML = `
            <div class="todo-view">
                <div class="todo-header">
                    <input type="checkbox" class="complete-checkbox" ${todo.completed? "checked" : ""}/>
                    <h4>${todo.title}</h4>
                </div>
                <p>Due: ${formattedDate}</p>
                ${urgencyMessage}
            </div>
        `;

        // Add on-click todo completion toggling
        const completeCheckbox = todoDiv.querySelector(".complete-checkbox");
        completeCheckbox.addEventListener("click", () => {
            onCompletedToggle(todo);
        })

        fragment.appendChild(todoDiv);
    })

    // Display the new to-do div
    const todosContainer = document.querySelector(".todos-container");
    todosContainer.innerHTML = "";
    todosContainer.appendChild(fragment);
}

const renderProjects = (projects, projectItemOnClick) => {
    const fragment = document.createDocumentFragment();
    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project-item";
        // set up an ID for current project state reference
        projectDiv.dataset.projectId = project.id;

        // create each div for each project
        projectDiv.innerHTML = `
            <h4>${project.name}</h4>
        `;

        // On click for project state for filtering
        projectDiv.addEventListener("click", () => {
            projectItemOnClick(projectDiv.dataset.projectId);
        })

        fragment.appendChild(projectDiv);
    })

    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.innerHTML = "";
    projectsContainer.appendChild(fragment);
}

export { initializeTodosContent, renderTodos, initializeProjectsContent, renderProjects, updateAllProjectDropdown, showEditModal };