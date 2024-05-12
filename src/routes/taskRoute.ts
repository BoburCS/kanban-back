import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

router.get("/:boardId", taskController.getAllTasks);
router.post("/:boardId/create", taskController.createTask);
router.delete("/:boardId/:id", taskController.deleteTask);
// router.put("/:boardId/:id", taskController.updateTask);

export default router;
