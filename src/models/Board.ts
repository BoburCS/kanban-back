import { Schema, InferSchemaType, model } from "mongoose";

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  statuses: {
    type: [String],
    required: true,
  },
});

type Board = InferSchemaType<typeof BoardSchema>;

export default model<Board>("Board", BoardSchema);
