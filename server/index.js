import  express  from "express";
import pkg from 'pg';
const { Pool } = pkg;
import  cors from "cors";
const app = express();
const port = 5001;

//load the static files
import path  from 'path';
import  {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "newtodo",
  password: "",
  port: 5432,
});



app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add a new task
app.post("/tasks", async (req, res) => {
  const { description, date, done } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (description, date, done) VALUES ($1, $2, $3) RETURNING *",
      [description, date, done || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
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
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

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
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
