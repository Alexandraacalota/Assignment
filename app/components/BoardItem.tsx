"use client";
import { useState } from "react";
import Link from "next/link";

interface BoardItemProps {
  _id: string;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

export default function BoardItem({ _id, name, onDelete, onEdit }: BoardItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);

  const submitEdit = () => {
    onEdit(_id, newName);
    setEditMode(false);
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-slate-100 flex flex-col justify-between">
      {editMode ? (
        <input value={newName} onChange={(e) => setNewName(e.target.value)} className="p-2 border rounded mb-2" />
      ) : (
        <Link href={`/board/${_id}`}>
        <h2
            className="text-lg font-bold cursor-pointer hover:text-blue-600 truncate max-w-[200px]"
            title={name}
        >
            {name}
        </h2>
        </Link>
      )}

      <div className="flex gap-2 mt-2 justify-end">
        {editMode ? (
        <>
            <button
            onClick={() => setEditMode(false)}
            className="p-1 rounded hover:bg-gray-200"
            title="Cancel"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>

            <button
            onClick={submitEdit}
            className="p-1 rounded hover:bg-green-200"
            title="Save"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            </button>
        </>
        ) : (
          <>
            <button onClick={() => setEditMode(true)}
            className="p-1 rounded hover:bg-gray-200"
            title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487l3.651 3.65-10.607 10.607H6.255v-3.651l10.607-10.607z" />
              </svg>
            </button>

            <button onClick={() => onDelete(_id)}
            className="p-1 rounded hover:bg-red-200"
            title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v1h8V5a2 2 0 00-2-2m-4 0h4"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
