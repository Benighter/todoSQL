import express from "express";
import { getAllTasks, addNewTasks, upDateTasks, deleteTask } from "../controllers/controllerTodo.js";

const router = express.Router();

router.get("/tasks", getAllTasks);
router.post("/tasks", addNewTasks);
router.put("/tasks/:id", upDateTasks);
router.delete("/tasks/:id", deleteTask);

export default router;
