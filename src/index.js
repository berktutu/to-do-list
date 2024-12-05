"use strict";

import "./styles.css";

// Counters
let projectCounter = 0;
let taskCounter = 0;

// Projects array
const projects = [];

// DOM elements
const projectBtnsContainer = document.getElementById("project-buttons");
const projectNameElement = document.getElementById("project-name");
const taskContainer = document.querySelector(".task-container");
const projectModalContent = document.querySelector(".project-modal-content");
const taskModalContent = document.querySelector(".task-modal-content");
const formProjectName = document.querySelector("#project-form-name");
const formTaskName = document.querySelector("#task-name");
const formTaskDescription = document.querySelector("#task-description");
const formTaskDate = document.querySelector("#task-date");
const formTaskStatus = document.querySelector("#task-checkbox");

// Button elements
const addProjectBtn = document.getElementById("add-project");
const addTaskBtn = document.getElementById("add-task");
const projectModalCloseBtn = document.querySelector(".project-modal-close");
const taskModalCloseBtn = document.querySelector(".task-modal-close");
const formAddProjectBtn = document.querySelector(".add-project-btn");
const formAddTaskBtn = document.querySelector(".add-task-btn");

// Function to add a new project
function addProject() {
  projectCounter++;
  const projectName = formProjectName.value;

  if (projectName) {
    taskContainer.innerHTML = "";
    projectNameElement.textContent = "";

    const newProject = {
      key: `project${projectCounter}`,
      name: projectName,
      tasks: [],
    };
    projects.push(newProject);

    // Add project button
    const projectBtn = document.createElement("button");
    projectBtn.textContent = projectName;
    projectBtn.dataset.key = newProject.key;
    projectBtn.classList.add("project-btn");
    projectBtnsContainer.appendChild(projectBtn);

    projectNameElement.dataset.key = newProject.key;
    projectNameElement.textContent = projectName;

    // Make add task button visible
    addTaskBtn.classList.remove("hidden");

    // Add event listener to project buttons
    projectBtn.addEventListener("click", selectProject);

    formProjectName.value = "";
  }
}

function renderTasks(currentProject) {
  taskContainer.innerHTML = "";

  currentProject.tasks.forEach((task) => {
    const taskCardEl = document.createElement("div");
    taskCardEl.classList.add("task-card");
    taskCardEl.dataset.key = task.key;

    const taskHtml = `
    <div class="task-content-container">
      <div class="task-content">
        <h2 class="task-title">${task.name}</h2>
        <p class="task-description">${task.description}</p>
        <p class="task-date">${task.due_date}</p>
        <p class="task-status">${task.status}</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="delete"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </div>
    `;

    taskCardEl.innerHTML = taskHtml;
    // Insert the html
    taskContainer.appendChild(taskCardEl);

    const deleteBtn = taskCardEl.querySelector(".delete");
    deleteBtn.addEventListener("click", () =>
      deleteTask(currentProject, task.key)
    );
  });
}

function deleteTask(currentProject, taskKey) {
  currentProject.tasks = currentProject.tasks.filter(
    (task) => task.key !== taskKey
  );

  renderTasks(currentProject);
}

function selectProject(e) {
  if (e.target.classList.contains("project-btn")) {
    projectNameElement.dataset.key = e.target.dataset.key;
    projectNameElement.textContent = e.target.textContent;
    const currentProject = projects.find(
      (project) => project.key === projectNameElement.dataset.key
    );
    renderTasks(currentProject);
  }
}

// Function to add a new task
function addTask() {
  const currentProject = projects.find(
    (project) => project.key === projectNameElement.dataset.key
  );

  if (!currentProject) {
    return;
  }

  taskCounter++;

  const taskName = formTaskName.value;
  const taskDescription = formTaskDescription.value;
  const taskDueDate = formTaskDate.value;
  const taskStatus = formTaskStatus.checked ? "Completed" : "Incompleted";

  if (taskName && taskDescription && taskDueDate && taskStatus) {
    const newTask = {
      key: `task${taskCounter}`,
      name: taskName,
      description: taskDescription,
      due_date: taskDueDate,
      status: taskStatus,
    };

    currentProject.tasks.push(newTask);

    const taskCardEl = document.createElement("div");
    taskCardEl.classList.add("task-card");

    // Display the task
    const taskHtml = `
            <div class="task-content-container">
              <div class="task-content">
                <h2 class="task-title">${taskName}</h2>
                <p class="task-description">${taskDescription}</p>
                <p class="task-date">${taskDueDate}</p>
                <p class="task-status">${taskStatus}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="delete"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
            </div>
          `;

    taskCardEl.innerHTML = taskHtml;
    // Insert the html
    taskContainer.appendChild(taskCardEl);

    formTaskName.value = "";
    formTaskDescription.value = "";
    formTaskDate.value = "";
    formTaskStatus.checked = false;
  }
}

function openModal(modal) {
  modal.classList.remove("hidden");
  modal.classList.add("visible");
}

function closeModal(modal) {
  modal.classList.remove("visible");
  modal.classList.add("hidden");
}

// Event handlers
formAddProjectBtn.addEventListener("click", function () {
  addProject();
  closeModal(projectModalContent);
});

addProjectBtn.addEventListener("click", function () {
  openModal(projectModalContent);
});

projectModalCloseBtn.addEventListener("click", function () {
  closeModal(projectModalContent);
});

addTaskBtn.addEventListener("click", function () {
  openModal(taskModalContent);
});

formAddTaskBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Add task button clicked");
  addTask();
  closeModal(taskModalContent);
});

taskModalCloseBtn.addEventListener("click", function () {
  closeModal(taskModalContent);
});
