"use client";

import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function Board({ id, name }: { id: string; name: string }) {
  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{ columns: new LiveList([]), cards: new LiveList([]) }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => (
          <>
            <div className="flex gap-2 justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl">Board: {name}</h1>
              </div>
              <Link
                href={`/boards/${id}/settings`}
                className="flex gap-2 items-center btn"
              >
                <FontAwesomeIcon icon={faCog} /> Board Settings
              </Link>
            </div>
            <Columns />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
