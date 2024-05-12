import express from "express";
import * as boardController from "../controllers/boardController";

const router = express.Router();

router.get("/", boardController.getAllBoards);
router.post("/create", boardController.createBoard);
router.delete("/:id", boardController.deleteBoard);
router.put("/:id", boardController.updateBoard);

export default router;
