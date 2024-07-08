"use client";

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

export default function NewBoardPage() {
  async function handleCreateNewBoard(formData: FormData) {
    const boardName = formData.get("name")?.toString() || "";
    const { id } = await createBoard(boardName);
    redirect(`/boards/${id}`);
  }

  return (
    <div>
      <form action={handleCreateNewBoard} className="max-w-xs block">
        <h1 className="text-xl mb-4">Create New Board</h1>
        <input type="text" name="name" placeholder="Board Name" />
        <button type="submit" className="mt-2 w-full">
          Create Board
        </button>
      </form>
    </div>
  );
}
