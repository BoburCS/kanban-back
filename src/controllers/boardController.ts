import { RequestHandler } from "express";
import Board from "../models/Board";
import Task from "../models/Task";

type BoardProps = {
  title?: string;
  statuses?: string[];
};

// GET | Get all boards | "/boards"
export const getAllBoards: RequestHandler = async (req, res) => {
  try {
    const boards = await Board.find().select("-__v, -statuses");

    res.status(200).json({ boards });
  } catch (err) {
    res.status(500).json({ err: "Error occured while getting boards" });
  }
};

// GET | Get a board | "/boards/:boardId"
export const getBoard: RequestHandler<{ boardId: string }> = async (req, res) => {
  try {
    const { boardId } = req.params;

    if (!boardId) {
      return res.status(400).json({ err: "Board ID is required" });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ err: "Board not found" });
    }

    res.status(200).json({ board });
  } catch (err) {
    res.status(500).json({ err: "Error occured while getting the board" });
  }
};

// POST | Create a new board | "/boards/create"
export const createBoard: RequestHandler<
  unknown,
  unknown,
  BoardProps
> = async (req, res) => {
  try {
    const { title, statuses } = req.body;

    if (!title || !statuses) {
      return res.status(400).json({ err: "Please provide title and statuses" });
    }

    const newBoard = new Board({ title, statuses });
    await newBoard.save();

    res
      .status(201)
      .json({ board: newBoard, message: "Board created successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while creating board" });
  }
};

// DELETE | Delete a board | "/boards/:boardId"
export const deleteBoard: RequestHandler<{ boardId: string }> = async (req, res) => {
  try {
    const { boardId } = req.params;

    if (!boardId) {
      return res.status(400).json({ err: "Board ID is required" });
    }

    const board = await Board.findById(boardId).exec();
    if (!board) {
      return res.status(404).json({ err: "Board not found" });
    }

    await Task.deleteMany({ boardId: boardId });
    await board.deleteOne({ _id: boardId });

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while deleting board" });
  }
};

// PUT | Update a board | "/boards/:boardId"
export const updateBoard: RequestHandler<
  { boardId: string },
  unknown,
  BoardProps
> = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title, statuses } = req.body;

    if (!boardId) {
      return res.status(400).json({ err: "Board ID is required" });
    }

    if (!title && !statuses) {
      return res.status(400).json({ err: "Please provide title or statuses" });
    }

    const board = await Board.findById(boardId).exec();
    if (!board) {
      return res.status(404).json({ err: "Board not found" });
    }

    board.title = title || board.title;
    board.statuses = statuses || board.statuses;
    await board.save();

    res.status(200).json({ board, message: "Board updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while updating board" });
  }
};
