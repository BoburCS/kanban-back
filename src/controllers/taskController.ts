import { RequestHandler } from "express";
import Task from "../models/Task";
import { SubTask } from "../models/SubTask";

declare type SubTaskProps = {
  title?: string;
  isCompleted?: boolean;
};

declare type TaskProps = {
  title?: string;
  description?: string;
  subTasks?: SubTask[];
  status?: string;
};

declare type TaskBoardId = {
  boardId: string;
};

// GET | Get all tasks | "/tasks/:boardId"
export const getAllTasks: RequestHandler<TaskBoardId> = async (req, res) => {
  try {
    const { boardId } = req.params;

    if (!boardId) {
      return res.status(400).json({ err: "Board ID is required" });
    }

    const tasks = await Task.find({ boardId });
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ err: "Error occured while getting tasks" });
  }
};

// GET | Get a task | "/tasks/task/:taskId"
export const getTask: RequestHandler<{ taskId: string }> = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ err: "Task ID is required" });
    }

    const task = await Task.findById(taskId).exec();

    if (!task) {
      return res.status(404).json({ err: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ err: "Error occured while getting the task" });
  }
};

// POST | Create a new task | "tasks/:boardId/create"
export const createTask: RequestHandler<
  TaskBoardId,
  unknown,
  TaskProps
> = async (req, res) => {
  try {
    const { boardId } = req.params;

    if (!boardId) {
      return res.status(400).json({ err: "Board ID is required" });
    }

    const { title, description, subTasks, status } = req.body;

    if (!title || !description || !subTasks || !status) {
      return res.status(400).json({ err: "All fields are required" });
    }

    const newTask = new Task({ title, description, subTasks, status, boardId });
    await newTask.save();

    res
      .status(201)
      .json({ task: newTask, message: "Task created successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while creating task" });
  }
};

// DELETE | Delete a task | "/tasks/:boardId/:id"
export const deleteTask: RequestHandler<{ taskId: string }> = async (
  req,
  res
) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ err: "Task ID is required" });
    }

    const task = await Task.findById(taskId).exec();
    if (!task) {
      return res.status(404).json({ err: "Task not found" });
    }

    await task.deleteOne({ _id: taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while deleting task" });
  }
};

// PATCH | Update a task | "/tasks/task/:taskId"
export const updateTask: RequestHandler<
  { taskId: string },
  unknown,
  { title?: string; description?: string; status?: string }
> = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    if (!taskId) {
      return res.status(400).json({ err: "Task ID is required" });
    }

    if (!title && !description && !status) {
      return res.status(400).json({
        err: "Please provide at least new title or description or status to update",
      });
    }

    const task = await Task.findById(taskId).exec();

    if (!task) {
      return res.status(404).json({ err: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();

    res.status(200).json({ task, message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while updating task" });
  }
};

// PATCH | Update a subtask | "/tasks/subtask/:taskId/:subtaskId"
export const updateSubTask: RequestHandler<
  { taskId: string; subtaskId: string },
  unknown,
  { title?: string; isCompleted?: boolean }
> = async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;
    if (!taskId) {
      return res.status(400).json({ err: "Task ID is required" });
    }
    if (!subtaskId) {
      return res.status(400).json({ err: "Subtask ID is required" });
    }

    const { title, isCompleted } = req.body;
    if (!title && !isCompleted) {
      return res.status(400).json({
        err: "Please provide at least new title or isCompleted to update",
      });
    }

    const task = await Task.findById(taskId).exec();
    if (!task) {
      return res.status(404).json({ err: "Task not found" });
    }

    const subtask = task.subTasks.id(subtaskId);
    if (!subtask) {
      return res.status(404).json({ err: "Subtask not found" });
    }

    subtask.title = title || subtask.title;
    subtask.isCompleted = isCompleted || subtask.isCompleted;

    await task.save();

    res.status(200).json({ task, message: "Subtask updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while updating subtask" });
  }
};
