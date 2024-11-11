import { 
  taskInput, 
  taskList, 
  addTaskBtn, 
  updateModal, 
  updateInput, 
  saveUpdateBtn, 
  cancelUpdateBtn,
  renderTask 
} from './dom.js';

let currentTask = null;

async function addTask() {
  const description = taskInput.value.trim();
  if (description === "") {
    alert("Please enter a task");
    return;
  }
  if (description.length > 30) {
    alert("Description can't be more than 30 characters");
    return;
  }

  const response = await fetch("http://localhost:5001/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description,
      date: new Date().toISOString(),
      done: false,
    }),
  });

  const newTask = await response.json();
  renderTask(newTask, handleUpdate, handleDelete, handleDone);
  taskInput.value = "";
}

async function loadTasks() {
  const response = await fetch("http://localhost:5001/tasks");
  const tasks = await response.json();
  taskList.innerHTML = "";
  tasks.forEach((task) => renderTask(task, handleUpdate, handleDelete, handleDone));
}

// Task handlers
function handleUpdate(task) {
  currentTask = task;
  updateInput.value = task.description;
  updateModal.style.display = "flex";
}

async function handleDelete(taskId, liElement) {
  await fetch(`http://localhost:5001/tasks/${taskId}`, { method: "DELETE" });
  taskList.removeChild(liElement);
}

async function handleDone(task, updateUI) {
  await fetch(`http://localhost:5001/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, done: true }),
  });
  updateUI();
}


async function saveUpdate() {
  const updatedDescription = updateInput.value.trim();
  if (updatedDescription === "") {
    alert("Description can't be empty");
    return;
  }
  if (updatedDescription.length > 30) {
    alert("Description can't be more than 30 characters");
    return;
  }

  if (!currentTask) {
    alert("No task selected for update");
    return;
  }

  const updatedTask = { ...currentTask, description: updatedDescription };
  await fetch(`http://localhost:5001/tasks/${currentTask.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });

  updateModal.style.display = "none";
  currentTask = null;
  await loadTasks();
}

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
window.addEventListener("load", loadTasks);


saveUpdateBtn.addEventListener("click", saveUpdate);
cancelUpdateBtn.addEventListener("click", () => {
  updateModal.style.display = "none";
  currentTask = null;
});

window.onclick = (event) => {
  if (event.target === updateModal) {
    updateModal.style.display = "none";
    currentTask = null;
  }
};
 