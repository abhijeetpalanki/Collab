import { ReactSortable } from "react-sortablejs";
import { Card, useMutation, useStorage } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/NewCardForm";

type ColumnProps = {
  id: string;
  name: string;
};

export default function Column({ id, name }: ColumnProps) {
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

  return (
    <div className="w-48 bg-white shadow-sm rounded-md p-2">
      <h3>{name}</h3>
      {columnCards && (
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
      <NewCardForm columnId={id} />
    </div>
  );
}
