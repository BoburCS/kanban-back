import { RequestHandler } from "express";
import Board from "../models/Board";

type BoardProps = {
  title?: string;
  statuses?: string[];
};

// GET | Get all boards | "/boards"
export const getAllBoards: RequestHandler = async (req, res) => {
  try {
    const boards = await Board.find();

    res.status(200).json({ boards });
  } catch (err) {
    res.status(500).json({ err: "Error occured while getting boards" });
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

// DELETE | Delete a board | "/boards/:id"
export const deleteBoard: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findById(id).exec();
    if (!board) {
      return res.status(404).json({ err: "Board not found" });
    }

    await board.deleteOne({ _id: id });

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: "Error occured while deleting board" });
  }
};

// PUT | Update a board | "/boards/:id"
export const updateBoard: RequestHandler<
  { id: string },
  unknown,
  BoardProps
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, statuses } = req.body;

    if (!title && !statuses) {
      return res.status(400).json({ err: "Please provide title or statuses" });
    }

    const board = await Board.findById(id);
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
