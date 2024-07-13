"use client";

import Link from "next/link";
import PresenceAvatars from "./PresenceAvatars";
import { RoomInfo } from "@liveblocks/node";
import { RoomProvider } from "@/app/liveblocks.config";

export default function BoardTiles({ boards }: { boards: RoomInfo[] }) {
  return (
    <>
      <div className="my-4 grid md:grid-cols-3 lg:grid-cols-4 gap-2">
        {boards?.length > 0 &&
          boards.map((board) => (
            <Link
              className="bg-gray-200 px-8 py-12 relative rounded-md block"
              href={`/boards/${board.id}`}
              key={board.id}
            >
              {board.metadata.boardName}

              <RoomProvider id={board.id} initialPresence={{}}>
                <div className="absolute bottom-1 right-1">
                  <PresenceAvatars
                    presenceKey={"boardId"}
                    presenceValue={board.id}
                  />
                </div>
              </RoomProvider>
            </Link>
          ))}
      </div>
    </>
  );
}
