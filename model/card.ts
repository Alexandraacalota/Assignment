import { model, models, Schema, Types } from "mongoose";

export interface Card {
  _id: string;
  title: string;
  description: string;
  list: Types.ObjectId;
}

const CardSchema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  list: { type: Schema.Types.ObjectId, ref: "List", required: true }
});

const CardModel = models.Card || model<Card>("Card", CardSchema, "Cards");
export default CardModel;
