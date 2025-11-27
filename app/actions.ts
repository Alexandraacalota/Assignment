"use server";

import connectMongo from "@/db/mongoose";
import BoardModel from "@/model/board";
import ListModel from "@/model/list";
import CardModel from "@/model/card";
import { Types, ObjectId } from "mongoose";

export interface BoardType {
  _id: string;
  name: string;
  lists: string[];
}

export interface ListType {
  _id: string;
  name: string;
  board: string;
  cards: string[];
}

export interface CardTypeClient {
  _id: string;
  list: string;
  title: string;
  description: string;
}

// Actions for boards
export async function getBoards(): Promise<BoardType[]> {
  await connectMongo();
  const boards = await BoardModel.find({}).lean<Array<{ _id: ObjectId; name: string; lists: Types.ObjectId[] }>>();
  return boards.map(b => ({
    _id: b._id.toString(),
    name: b.name,
    lists: b.lists.map(l => l.toString())
  }));
}

export async function createBoard(name: string) {
  await connectMongo();
  const board = new BoardModel({ _id: new Types.ObjectId(), name, lists: [] });
  await board.save();
}

export async function updateBoard(id: string, name: string) {
  await connectMongo();
  await BoardModel.findByIdAndUpdate(id, { name });
}

export async function deleteBoard(id: string) {
  await connectMongo();
  const lists = await ListModel.find({ board: id });
  const listIds = lists.map(l => l._id);
  await CardModel.deleteMany({ list: { $in: listIds } });
  await ListModel.deleteMany({ board: id });
  await BoardModel.findByIdAndDelete(id);
}

export async function getBoard(id: string): Promise<BoardType | null> {
  await connectMongo();
  const board = await BoardModel.findById(id).lean<{ _id: ObjectId; name: string; lists: Types.ObjectId[] }>();
  if (!board) return null;
  return {
    _id: board._id.toString(),
    name: board.name,
    lists: board.lists.map(l => l.toString())
  };
}

// Actions for lists
export async function getLists(boardId: string): Promise<ListType[]> {
  await connectMongo();
  const lists = await ListModel.find({ board: boardId }).lean<Array<{ _id: ObjectId; name: string; board: ObjectId; cards: Types.ObjectId[] }>>();
  return lists.map(l => ({
    _id: l._id.toString(),
    name: l.name,
    board: l.board.toString(),
    cards: l.cards.map(c => c.toString())
  }));
}

export async function createList(boardId: string, name: string) {
  await connectMongo();
  const list = new ListModel({ _id: new Types.ObjectId(), name, board: boardId, cards: [] });
  await list.save();
  await BoardModel.findByIdAndUpdate(boardId, { $push: { lists: list._id } });
}

export async function updateList(id: string, name: string) {
  await connectMongo();
  await ListModel.findByIdAndUpdate(id, { name });
}

export async function deleteList(id: string) {
  await connectMongo();
  const list = await ListModel.findById(id);
  if (!list) return;
  await CardModel.deleteMany({ list: list._id });
  await BoardModel.findByIdAndUpdate(list.board, { $pull: { lists: list._id } });
  await ListModel.findByIdAndDelete(id);
}

// Actions for cards
export async function getCards(listId: string): Promise<CardTypeClient[]> {
  await connectMongo();
  const cards = await CardModel.find({ list: listId }).lean<Array<{ _id: ObjectId; title: string; description: string; list: ObjectId }>>();
  return cards.map(c => ({
    _id: c._id.toString(),
    list: c.list.toString(),
    title: c.title,
    description: c.description
  }));
}

export async function createCard(listId: string, title: string) {
  await connectMongo();
  const card = new CardModel({ _id: new Types.ObjectId(), title, description: "", list: listId });
  await card.save();
  await ListModel.findByIdAndUpdate(listId, { $push: { cards: card._id } });
}

export async function updateCard(id: string, title: string, description: string) {
  await connectMongo();
  await CardModel.findByIdAndUpdate(id, { title, description });
}

export async function deleteCard(id: string) {
  await connectMongo();
  const card = await CardModel.findById(id);
  if (card) {
    await ListModel.findByIdAndUpdate(card.list, { $pull: { cards: card._id } });
    await CardModel.findByIdAndDelete(id);
  }
}
