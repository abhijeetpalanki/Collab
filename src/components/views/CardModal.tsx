"use client";

import { useParams, useRouter } from "next/navigation";

import "@liveblocks/react-ui/styles.css";
import CardModalBody from "../CardModalBody";
import { useEffect } from "react";
import { useUpdateMyPresence } from "@/app/liveblocks.config";

export default function CardModal() {
  const router = useRouter();
  const params = useParams();
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    if (params.cardId) {
      updateMyPresence({ cardId: params.cardId.toString() });
    }
  }, [params]);

  function handleBackdrop() {
    router.back();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-10"></div>
      <div
        className="absolute top-0 z-20 w-full inset-0"
        onClick={handleBackdrop}
      >
        <div className="bg-white p-1 px-4 my-8 max-w-sm mx-auto rounded-md">
          <div onClick={(ev) => ev.stopPropagation()}>
            <CardModalBody />
          </div>
        </div>
        <div>&nbsp;</div>
      </div>
    </>
  );
}
