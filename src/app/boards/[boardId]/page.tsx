"use server";

import Board from "@/components/Board";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

type PageProps = {
  params: {
    boardId: string;
  };
};

export default async function BoardPage({ params: { boardId } }: PageProps) {
  const userEmail = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);

  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes("room:write");

  if (!hasAccess) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      Board: {boardInfo.metadata.boardName}
      <Board id={boardId} />
    </div>
  );
}
