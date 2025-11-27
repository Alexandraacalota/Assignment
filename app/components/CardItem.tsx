"use client";
import { useState } from "react";

interface CardItemProps {
  _id: string;
  title: string;
  description: string;
  onEdit: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function CardItem({ _id, title, description, onEdit, onDelete }: CardItemProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(description);

  const submitEdit = () => {
    onEdit(_id, newTitle, newDesc);
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="bg-white p-3 rounded-lg shadow hover:shadow-md cursor-pointer transition flex flex-col gap-1"
        onClick={() => setModalOpen(true)}
        title={title}
      >
        <h4 className="font-semibold truncate max-w-[200px]">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 truncate max-w-[200px]">{description}</p>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-2/3 max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Card</h2>
            
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border rounded mb-4 outline-none text-lg"
              placeholder="Title"
            />

            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-3 border rounded mb-4 outline-none text-md resize-none min-h-[150px]"
              placeholder="Description"
            />

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={submitEdit}
                className="p-2 rounded hover:bg-green-200 transition"
                title="Save"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded hover:bg-gray-200 transition"
                title="Cancel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={() => { onDelete(_id); setModalOpen(false); }}
                className="p-2 rounded hover:bg-red-200 transition"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v1h8V5a2 2 0 00-2-2m-4 0h4"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
