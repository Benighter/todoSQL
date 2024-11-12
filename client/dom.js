export const taskInput = document.getElementById("taskInput");
export const taskList = document.getElementById("taskList");
export const addTaskBtn = document.getElementById("addTaskBtn");
export const updateModal = document.getElementById("updateModal");
export const updateInput = document.getElementById("updateInput");
export const saveUpdateBtn = document.getElementById("saveUpdateBtn");
export const cancelUpdateBtn = document.getElementById("cancelUpdateBtn");

export function renderTask(task, onUpdate, onDelete, onDone) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);

  const taskText = document.createElement("span");
  taskText.textContent = `${task.description} (Due: ${new Date(task.date).toLocaleString()})`;
  if (task.done) {
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "grey";
  }
  li.appendChild(taskText);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "🗑️";
  deleteButton.style.fontSize = "1rem";
  deleteButton.style.backgroundColor = "transparent";
  deleteButton.onclick = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id, li);
    }
  };

  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  if (task.done) {
    updateButton.disabled = true;
    updateButton.hidden = true;
  } else {
    updateButton.onclick = () => onUpdate(task);
  }

  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  if (task.done) {
    doneButton.disabled = true;
    doneButton.hidden = true;
  }

  doneButton.onclick = () => {
    onDone(task, () => {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "grey";
      doneButton.hidden = true;
      updateButton.disabled = true;
      updateButton.hidden = true;
    });
  };

  li.appendChild(deleteButton);
  li.appendChild(updateButton);
  li.appendChild(doneButton);
  taskList.appendChild(li);
}
