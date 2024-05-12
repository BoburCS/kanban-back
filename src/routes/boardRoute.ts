import express from "express";
import * as boardController from "../controllers/boardController";

const router = express.Router();

router.get("/", boardController.getAllBoards);
router.get("/:boardId", boardController.getBoard);
router.post("/create", boardController.createBoard);
router.delete("/:boardId", boardController.deleteBoard);
router.put("/:boardId", boardController.updateBoard);

export default router;
