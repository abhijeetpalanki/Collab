"use server";

import BoardDeleteButton from "@/components/BoardDeleteButton";
import EmailsAccessList from "@/components/EmailsAccessList";
import NewBoardAccessForm from "@/components/forms/NewBoardAccessForm";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PageProps = {
  params: {
    boardId: string;
  };
};

export default async function BoardSettingsPage({ params }: PageProps) {
  const { boardId } = params;
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userEmail = await getUserEmail();
  if (!boardInfo.usersAccesses[userEmail]) {
    return "Access Denied";
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link
          href={`/boards/${boardId}`}
          className="inline-flex gap-1 items-center btn mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back to Board
        </Link>
        <BoardDeleteButton boardId={boardId} />
      </div>
      <h1 className="text-2xl">
        Access to board {boardInfo.metadata.boardName}:
      </h1>

      <div className="mb-8">
        <EmailsAccessList
          boardId={boardId}
          usersAccesses={boardInfo.usersAccesses}
        />
      </div>

      <NewBoardAccessForm boardId={boardId} />
    </div>
  );
}
