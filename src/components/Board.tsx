"use client";

import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";

export default function Board({ id }: { id: string }) {
  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{ columns: new LiveList([]), cards: new LiveList([]) }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => (
          <>
            <Columns />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
