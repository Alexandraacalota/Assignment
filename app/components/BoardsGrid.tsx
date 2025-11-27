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
          placeholder="Add a board..."
          className="grow rounded-l-lg p-2 text-black outline-none"
        />
        <button
          onClick={handleAdd}
          className="rounded-r-lg bg-blue-600 p-2 text-white flex items-center justify-center gap-1 hover:bg-blue-700 transition"
          title="Add Board"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add
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
