"use client";
import { useState, useEffect } from "react";
import ListColumn from "@/app/components/ListColumn";
import { getLists, createList, getBoard } from "@/app/actions";
import Link from "next/link";
import posthog, { initPostHog } from "@/lib/posthog";

interface BoardPageProps {
  params: { id: string };
}

interface ListType {
  _id: string;
  name: string;
  board: string;
  cards: string[];
}

export default function BoardPage({ params }: BoardPageProps) {
  const [lists, setLists] = useState<ListType[]>([]);
  const [newListName, setNewListName] = useState("");
  const [boardName, setBoardName] = useState("");

  const fetchBoard = async () => {
    const board = await getBoard(params.id);
    if (board) setBoardName(board.name);
  };

  const fetchLists = async () => {
    const data = await getLists(params.id);
    setLists(data);
  };

  useEffect(() => {
    const init = async () => {
      await fetchBoard();
      await fetchLists();
    };
    init();
  }, [params.id]);

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (boardName) {
      posthog.capture("Board Page Viewed", {
        board_id: params.id,
        board_name: boardName,
      });
    }
  }, [boardName]);

  const handleAddList = async () => {
    if (!newListName.trim()) return;
    await createList(params.id, newListName.trim());
    setNewListName("");
    fetchLists();

    posthog.capture("List Added", {
      board_id: params.id,
      list_name: newListName.trim(),
    });
  };

  return (
    <div className="p-4">
      <Link
        href="/"
        className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Boards
      </Link>

      <h1 className="text-2xl font-bold mb-4 truncate max-w-[400px]" title={boardName}>
        {boardName}
      </h1>

      <div className="flex gap-4 overflow-x-auto min-h-[400px]">
        {lists.map((list) => (
          <ListColumn key={list._id} _id={list._id} name={list.name} fetchLists={fetchLists} />
        ))}

        <div className="min-w-[250px] p-2 bg-slate-200 rounded flex-shrink-0 flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Add a list..."
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="w-full p-2 mb-2 rounded outline-none text-black"
          />
          <button
            onClick={handleAddList}
            className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            title="Add List"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add List
          </button>
        </div>
      </div>
    </div>
  );
}
