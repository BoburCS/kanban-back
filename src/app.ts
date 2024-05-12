import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "./validateEnv";
import boardRoute from "./routes/boardRoute";
import taskRoute from "./routes/taskRoute";

const app = express();

app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/boards", boardRoute);
app.use("/tasks", taskRoute);

export default app;
