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

  try {
    console.log('Sending task to server...'); 

    const response = await fetch("http://localhost:5001/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        date: new Date().toISOString(),
        done: false,
      }),
    });

    console.log("Response status:", response.status); 

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData); 
      throw new Error(`Failed to add task: ${errorData.message || response.statusText}`);
    }

    const responseData = await response.json();
    //testing
    console.log("Response data:", responseData); 

    const newTask = responseData;
    renderTask(newTask, handleUpdate, handleDelete, handleDone); 
    taskInput.value = ""; 

  } catch (error) {
    console.error("Error adding task:", error); 
    alert("Error adding task: " + error.message); 
  }
}

async function loadTasks() {
  try {
    const response = await fetch("http://localhost:5001/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to load tasks");
    }
    const tasks = await response.json();
    taskList.innerHTML = ""; 
    tasks.forEach((task) => renderTask(task, handleUpdate, handleDelete, handleDone));
  } catch (error) {
    console.error(error);
    alert("Error loading tasks");
  }
}

function handleUpdate(task) {
  currentTask = task;
  updateInput.value = task.description;
  updateModal.style.display = "flex";
}

async function handleDelete(taskId, liElement) {
  try {
    const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, { method: "DELETE" });
    if (response.ok) {
      taskList.removeChild(liElement); 
    } else {
      const errorData = await response.json();
      console.error("Error response data:", errorData);
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error(error);
    alert("Error deleting task: " + error.message);
  
  }
}

async function handleDone(task, updateUI) {
  try {
    const response = await fetch(`http://localhost:5001/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, done: true }),
    });

    if (response.ok) {
      updateUI(); 
    } else {
      const errorData = await response.json();
      console.error("Error response data:", errorData);
      throw new Error('Failed to mark task as done');
    }
  } catch (error) {
    console.error(error);
    alert("Error marking task as done: " + error.message);
  }
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

  try {
    const response = await fetch(`http://localhost:5001/api/tasks/${currentTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      updateModal.style.display = "none"; 
      currentTask = null;
      await loadTasks(); 
    } else {
      const errorData = await response.json();
      console.error("Error response data:", errorData);
      throw new Error('Failed to update task');
    }
  } catch (error) {
    console.error(error);
    alert("Error updating task: " + error.message);
  }
}

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
