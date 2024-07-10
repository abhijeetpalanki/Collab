import { ReactSortable } from "react-sortablejs";
import { Card, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/NewCardForm";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faEllipsis,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type ColumnProps = {
  id: string;
  name: string;
};

export default function Column({ id, name }: ColumnProps) {
  const [renameMode, setRenameMode] = useState(false);
  const router = useRouter();

  async function handleName(ev: FormEvent) {
    ev.preventDefault();

    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input.value;
      updateColumn(id, newName);
      setRenameMode(false);
    }
  }

  const columnCards = useStorage<Card[]>((root) => {
    return root.cards
      .filter((card) => card.columnId === id)
      .map((c) => ({ ...c }))
      .sort((a, b) => a.index - b.index);
  }, shallow);

  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage.get("cards").get(index);
    if (card) {
      for (const key in updateData) {
        card?.set(key as keyof Card, updateData[key]);
      }
    }
  }, []);

  const updateColumn = useMutation(({ storage }, id, newName) => {
    const columns = storage.get("columns");
    columns.find((col) => col.toObject().id === id)?.set("name", newName);
  }, []);

  const setTaskOrderForColumn = useMutation(
    ({ storage }, sortedCards: Card[], newColumnId) => {
      const idsOfSortedCards = sortedCards.map((c) => c.id.toString());
      const allCards: Card[] = [
        ...storage.get("cards").map((c) => c.toObject()),
      ];
      idsOfSortedCards.forEach((sortedCardId, colIndex) => {
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId
        );
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        });
      });
    },
    []
  );

  const deleteColumn = useMutation(({ storage }, id) => {
    const columns = storage.get("columns");
    const columnIndex = columns.findIndex((col) => col.toObject().id === id);
    columns.delete(columnIndex);
  }, []);

  return (
    <div className="w-48 bg-white shadow-sm rounded-md p-2">
      {!renameMode && (
        <div className="flex justify-between">
          <h3>{name}</h3>
          <button className="text-gray-300" onClick={() => setRenameMode(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {renameMode && (
        <div className="mb-8">
          Edit Name:
          <form onSubmit={handleName} className="mb-2">
            <input type="text" defaultValue={name} />
            <button type="submit" className="w-full mt-2">
              Save
            </button>
          </form>
          <button
            className="bg-red-500 text-white p-2 rounded-md justify-center flex gap-2 w-full items-center"
            onClick={() => deleteColumn(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete Column
          </button>
          <button
            className="btn flex justify-center gap-2 w-full mt-2 items-center"
            onClick={() => setRenameMode(false)}
          >
            <FontAwesomeIcon icon={faCancel} />
            Cancel Edit
          </button>
        </div>
      )}
      {!renameMode && columnCards && (
        <ReactSortable
          list={columnCards}
          setList={(items) => setTaskOrderForColumn(items, id)}
          group="cards"
          className="min-h-12"
          ghostClass="opacity-40"
        >
          {columnCards.map((card) => (
            <div className="border bg-white my-2 p-4 rounded-md" key={card.id}>
              <span>{card.name}</span>
            </div>
          ))}
        </ReactSortable>
      )}
      {!renameMode && <NewCardForm columnId={id} />}
    </div>
  );
}
