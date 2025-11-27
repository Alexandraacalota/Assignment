import { model, models, Schema, Types } from "mongoose";

export interface Board {
  _id: string;
  name: string;
  lists: Types.ObjectId[];
}

const BoardSchema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  name: { type: String, required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }]
});

const BoardModel = models.Board || model<Board>("Board", BoardSchema, "Boards");
export default BoardModel;
