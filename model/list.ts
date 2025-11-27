import { model, models, Schema, Types } from "mongoose";

export interface List {
  _id: string;
  name: string;
  board: Types.ObjectId;
  cards: Types.ObjectId[];
}

const ListSchema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  name: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }]
});

const ListModel = models.List || model<List>("List", ListSchema, "Lists");
export default ListModel;
