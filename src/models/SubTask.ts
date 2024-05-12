import { Schema, InferSchemaType, model } from "mongoose";

export const SubTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export type SubTask = InferSchemaType<typeof SubTaskSchema>;

export default model<SubTask>("SubTask", SubTaskSchema);
