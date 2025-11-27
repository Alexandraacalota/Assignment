"use client";
import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import { getCards, createCard, deleteCard, updateCard, updateList, deleteList } from "@/app/actions";

interface ListColumnProps {
  _id: string;
  name: string;
  fetchLists?: () => void;
}

interface CardType {
  _id: string;
  title: string;
  description: string;
  list: string;
}

export default function ListColumn({ _id, name, fetchLists }: ListColumnProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [newCard, setNewCard] = useState("");
  const [listName, setListName] = useState(name);
  const [editMode, setEditMode] = useState(false);

  const fetchCardsData = async () => setCards(await getCards(_id));

  useEffect(() => {
    fetchCardsData();
  }, [_id]);

  const handleAddCard = async () => {
    if (!newCard.trim()) return;
    await createCard(_id, newCard.trim());
    setNewCard("");
    fetchCardsData();
  };

  const handleDeleteCard = async (cardId: string) => {
    await deleteCard(cardId);
    fetchCardsData();
  };

  const handleEditCard = async (cardId: string, title: string, description: string) => {
    await updateCard(cardId, title, description);
    fetchCardsData();
  };

  const handleEditList = async () => {
    await updateList(_id, listName);
    setEditMode(false);
  };

  const handleDeleteList = async () => {
    await deleteList(_id);
    fetchLists?.();
  };

  return (
    <div className="bg-slate-200 p-2 rounded min-w-[250px] flex-shrink-0 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        {editMode ? (
          <div className="flex gap-1 w-full">
            <input value={listName} onChange={(e) => setListName(e.target.value)} className="p-1 rounded grow" />

            <button onClick={handleEditList}
            className="p-1 rounded hover:bg-green-200"
            title="Save">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>

            <button onClick={() => setEditMode(false)}
            className="p-1 rounded hover:bg-gray-200"
            title="Cancel">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-bold truncate max-w-[150px]" title={listName}>{listName}</h3>
            <div className="flex gap-1">
              <button onClick={() => setEditMode(true)}
              className="p-1 rounded hover:bg-gray-200"
              title="Edit List">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487l3.651 3.65-10.607 10.607H6.255v-3.651l10.607-10.607z" />
                </svg>
              </button>

              <button onClick={handleDeleteList}
              className="p-1 rounded hover:bg-red-200"
              title="Delete List">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a2 2 0 00-2 2v1h8V5a2 2 0 00-2-2m-4 0h4"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {cards.map(card => (
          <CardItem key={card._id} {...card} onDelete={handleDeleteCard} onEdit={handleEditCard} />
        ))}
      </div>

      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
          className="grow p-1 rounded"
          placeholder="Add a card..."
        />
        <button onClick={handleAddCard}
        className="bg-blue-600 text-white p-1 rounded flex-shrink-0 flex items-center justify-center gap-1 hover:bg-blue-700 transition"
        title="Add Card">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
    </div>
  );
}
