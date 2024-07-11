"use client";

import { RoomProvider } from "@/app/liveblocks.config";
import { BoardContextProvider } from "@/components/BoardContext";
import { LiveList } from "@liveblocks/client";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function BoardLoyout({ children, modal }: PageProps) {
  const params = useParams();

  return (
    <BoardContextProvider>
      <RoomProvider
        id={params.boardId.toString()}
        initialPresence={{}}
        initialStorage={{
          columns: new LiveList([]),
          cards: new LiveList([]),
        }}
      >
        {children}
        {modal}
      </RoomProvider>
    </BoardContextProvider>
  );
}
