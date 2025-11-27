"use server";

import connectMongo from "@/db/mongoose";
import BoardModel, { Board } from "@/model/board";
import ListModel, { List } from "@/model/list";
import CardModel, { Card } from "@/model/card";
import { Types } from "mongoose";


// Actions for boards
export async function getBoards(): Promise<Board[]> {
  await connectMongo();
  const boards = await BoardModel.find({}).lean();
  return boards.map(b => ({ ...b, _id: b._id.toString() }));
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
  const listIds = lists.map((list) => list._id);
  await CardModel.deleteMany({ list: { $in: listIds } });
  await ListModel.deleteMany({ board: id });
  await BoardModel.findByIdAndDelete(id);
}

export async function getBoard(id: string) {
  await connectMongo();
  const board = await BoardModel.findById(id).lean();
  if (!board) return null;
  return { ...board, _id: board._id.toString() };
}

// Actions for lists
export async function getLists(boardId: string): Promise<List[]> {
  await connectMongo();
  const lists = await ListModel.find({ board: boardId }).lean();
  return lists.map(l => ({ ...l, _id: l._id.toString(), board: l.board.toString() }));
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
export async function getCards(listId: string): Promise<Card[]> {
  await connectMongo();
  const cards = await CardModel.find({ list: listId }).lean();
  return cards.map(c => ({ ...c, _id: c._id.toString(), list: c.list.toString() }));
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