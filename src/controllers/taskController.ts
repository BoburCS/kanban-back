import { RequestHandler } from "express";
import Task from "../models/Task";

declare type SubTaskProps = {
  title?: string;
};

declare type TaskProps = {
  title?: string;
  description?: string;
  subTasks?: SubTaskProps[];
  status?: string;
};

declare type TaskBoardId = {
  boardId: string;
};

// GET | Get all tasks | "/tasks"
export const getAllTasks: RequestHandler<TaskBoardId> = async (req, res) => {
  try {
    const { boardId } = req.params;

    const tasks = await Task.find({ boardId });
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ err: "Error occured while getting tasks" });
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
    const { title, description, subTasks, status } = req.body;

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
export const deleteTask: RequestHandler<TaskBoardId> = async (req, res) => {
  try {
    const { boardId } = req.params;

    const task = await Task.findById(boardId).exec();
    if (!task) {
      return res.status(404).json({ err: "Task not found" });
    }

    await task.deleteOne({ _id: boardId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while deleting task" });
  }
};

// PUT | Update a task | "/tasks/:id"
// export const updateTask: RequestHandler<
//   TaskBoardId,
//   unknown,
//   TaskProps
// > = async (req, res) => {
//   try {
//     const { boardId } = req.params;

//     const { title, description, subTasks, status } = req.body;

//     const task = await Task.findById(boardId).exec();

//     if (!task) {
//       return res.status(404).json({ err: "Task not found" });
//     }

//     task.title = title || task.title;
//     task.description = description || task.description;
//     task.subTasks = subTasks || task.subTasks;
//     task.status = status || task.status;
//     await task.save();

//     res.status(200).json({ task, message: "Task updated successfully" });
//   } catch (err) {
//     res.status(500).json({ err: "Error occured while updating task" });
//   }
// };
