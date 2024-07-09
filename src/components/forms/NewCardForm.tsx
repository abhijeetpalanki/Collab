"use client";

import { Card, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

export default function NewCardForm({ columnId }: { columnId: string }) {
  const addCard = useMutation(
    ({ storage }, cardName) => {
      storage.get("cards").push(
        new LiveObject<Card>({
          name: cardName,
          id: uniqid.time(),
          index: 9999,
          columnId,
        })
      );
    },
    [columnId]
  );

  function handleNewCard(ev: FormEvent) {
    ev.preventDefault();

    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = "";
    }
  }

  return (
    <form onSubmit={handleNewCard}>
      <input type="text" placeholder="Card Name" />
    </form>
  );
}
