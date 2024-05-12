import { Schema, InferSchemaType, model } from "mongoose";
import { SubTaskSchema } from "./SubTask";

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subTasks: {
    type: [SubTaskSchema],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
});

type Task = InferSchemaType<typeof TaskSchema>;

export default model<Task>("Task", TaskSchema);
