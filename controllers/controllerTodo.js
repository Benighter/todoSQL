import pool from "../dataDase/dataBaseConnection.js";  

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Add a new task
export const addNewTasks = async (req, res) => {
  const { description, date, done } = req.body;
  console.log("Received data:", { description, date, done });

  try {
    const result = await pool.query(
      "INSERT INTO tasks (description, date, done) VALUES ($1, $2, $3) RETURNING *",
      [description, date, done || false]
    );
    console.log("Inserted task:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
};

// Update a task
export const upDateTasks = async (req, res) => {
  const { id } = req.params;
  const { description, date, done } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET description = $1, date = $2, done = $3 WHERE id = $4 RETURNING *",
      [description, date, done, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting task with ID:", id);  

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

