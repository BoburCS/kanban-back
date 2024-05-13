import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "./validateEnv";
import { BoardRouter, TaskRouter } from "./routes";

const app = express();

app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/boards", BoardRouter);
app.use("/tasks", TaskRouter);

export default app;
