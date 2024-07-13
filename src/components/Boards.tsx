"use server";

import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import BoardTiles from "./BoardTiles";

export default async function Boards() {
  const email = await getUserEmail();
  const { data: rooms } = await liveblocksClient.getRooms({ userId: email });

  return <BoardTiles boards={rooms} />;
}
