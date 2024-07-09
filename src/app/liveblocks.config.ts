import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
});

type Presence = {};

export type Column = {
  name: string;
  id: string;
  index: number;
};

export type Card = {
  name: string;
  id: string;
  index: number;
  columnId: string;
};

type Storage = {
  columns: LiveList<LiveObject<Column>>;
  cards: LiveList<LiveObject<Card>>;
};
type UserMeta = {};
type RoomEvent = {};
type ThreadMetadata = {};

export const {
  suspense: { RoomProvider, useMyPresence, useStorage, useMutation, useRoom },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);
