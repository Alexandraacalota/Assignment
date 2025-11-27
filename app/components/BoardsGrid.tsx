"use client";
import { useState } from "react";
import BoardItem from "./BoardItem";
import { getBoards, createBoard, deleteBoard, updateBoard } from "@/app/actions";

type BoardType = Awaited<ReturnType<typeof getBoards>>;

export default function BoardsGrid({ boardsInitial }: { boardsInitial: BoardType }) {
  const [boards, setBoards] = useState<BoardType>(boardsInitial);
  const [newBoard, setNewBoard] = useState("");

  const handleAdd = async () => {
    if (!newBoard.trim()) return;
    await createBoard(newBoard.trim());
    setBoards(await getBoards());
    setNewBoard("");
  };

  const handleDelete = async (id: string) => {
    await deleteBoard(id);
    setBoards(await getBoards());
  };

  const handleEdit = async (id: string, name: string) => {
    await updateBoard(id, name);
    setBoards(await getBoards());
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Boards</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newBoard}
          onChange={(e) => setNewBoard(e.target.value)}
          placeholder="New board name"
          className="grow rounded-l-lg p-2 text-black outline-none"
        />
        <button onClick={handleAdd} className="rounded-r-lg bg-blue-600 p-2 text-white">
          Add Board
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {boards.map((board) => (
          <BoardItem key={board._id} {...board} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}
