"use client";

import { useState } from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const defaultColumns = [
  { id: "col1", name: "todo", index: 0 },
  { id: "col2", name: "in progress", index: 1 },
  { id: "col3", name: "done", index: 2 },
];

export type CardType = {
  id: string | number;
  name: string;
  index: number;
  columnId: string;
};

const defaultCards = [
  { id: "asea", name: "task 1", index: 0, columnId: "col1" },
  { id: "ased", name: "task 4", index: 1, columnId: "col1" },
  { id: "awea", name: "task 2", index: 1, columnId: "col2" },
  { id: "aase", name: "task 3", index: 2, columnId: "col3" },
];

export default function Board() {
  const [cards, setCards] = useState(defaultCards);
  const [columns, setColumns] = useState(defaultColumns);

  return (
    <div className="flex gap-4">
      {columns.map((column) => (
        <Column
          {...column}
          key={column.id}
          cards={cards
            .sort((a, b) => a.index - b.index)
            .filter((c) => c.columnId === column.id)}
          setCards={setCards}
        />
      ))}
      <NewColumnForm />
    </div>
  );
}
