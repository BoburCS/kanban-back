import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

router.get("/:boardId", taskController.getAllTasks);
router.get("/task/:taskId", taskController.getTask);
router.post("/:boardId/create", taskController.createTask);
router.delete("/:taskId", taskController.deleteTask);
router.patch("/task/:taskId", taskController.updateTask);
router.patch("/subtask/:taskId/:subtaskId", taskController.updateSubTask);

export default router;
