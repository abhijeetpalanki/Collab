"use client";

import { FormEvent } from "react";

export default function NewColumnForm() {
  function handleNewColumn(ev: FormEvent) {
    ev.preventDefault();

    const input = (ev.target as HTMLFormElement).querySelector("input");
    const columnName = input?.value;
    alert("new column: " + columnName);
  }

  return (
    <form onSubmit={handleNewColumn} className="max-w-xs">
      <label className="block">
        <span className="text-gray-600 block">Column Name:</span>
        <input type="text" placeholder="New Column Name..." />
      </label>
      <button type="submit" className="mt-2 block w-full">
        Create Column
      </button>
    </form>
  );
}
