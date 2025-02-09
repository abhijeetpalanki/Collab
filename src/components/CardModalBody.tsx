import { useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  Card,
  useMutation,
  useStorage,
  useThreads,
} from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/client";
import { Composer, Thread } from "@liveblocks/react-ui";
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @ts-ignore
import { faFileLines, faComments } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { BoardContext, BoardContextProps } from "./BoardContext";
import DeleteWithConfirmation from "./DeleteWithConfirmation";
import CancelButton from "./CancelButton";
import CardDescription from "./CardDescription";

export default function CardModalBody() {
  const router = useRouter();
  const params = useParams();
  const { threads } = useThreads({
    query: {
      metadata: {
        cardId: params.cardId.toString(),
      },
    },
  });

  const { setOpenCard } = useContext<BoardContextProps>(BoardContext);
  const [editMode, setEditMode] = useState(false);

  const card = useStorage((root) => {
    return root.cards.find((c) => c.id === params.cardId);
  }, shallow);

  const updateCard = useMutation(({ storage }, cardId, updateData) => {
    const index = storage
      .get("cards")
      .findIndex((c) => c.toObject().id === cardId);
    const card = storage.get("cards").get(index);
    for (let updateKey in updateData) {
      card?.set(updateKey as keyof Card, updateData[updateKey]);
    }
  }, []);

  useEffect(() => {
    if (params.cardId && setOpenCard) {
      setOpenCard(params.cardId.toString());
    }
  }, [params]);

  function handleName(ev: FormEvent) {
    ev.preventDefault();

    const input = (ev.target as HTMLFormElement).querySelector("input");
    if (input) {
      const newName = input.value;
      updateCard(params.cardId, { name: newName });
      setEditMode(false);
    }
  }

  const deleteCard = useMutation(({ storage }, id) => {
    const cards = storage.get("cards");
    const cardIndex = cards.findIndex((c) => c.toObject().id === id);
    cards.delete(cardIndex);
  }, []);

  function handleDelete() {
    deleteCard(params.cardId);
    if (setOpenCard) {
      setOpenCard(null);
    }
    router.back();
  }

  return (
    <>
      {!editMode && (
        <div className="flex justify-between">
          <h4 className="text-2xl">{card?.name}</h4>
          <button className="text-gray-400" onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {editMode && (
        <div>
          <form onSubmit={handleName}>
            <input type="text" defaultValue={card?.name} className="mb-2" />
            <button type="submit" className="w-full">
              Save
            </button>
          </form>
          <div className="mt-2">
            <DeleteWithConfirmation onDelete={() => handleDelete()} />
          </div>
          <CancelButton onClick={() => setEditMode(false)} />
        </div>
      )}
      {!editMode && (
        <div>
          <h2 className="flex gap-2 items-center mt-4">
            <FontAwesomeIcon icon={faFileLines} />
            Description
          </h2>
          <CardDescription />
          <h2 className="flex gap-2 items-center mt-4">
            <FontAwesomeIcon icon={faComments} />
            Comments
          </h2>
          <div className="-mx-4">
            {threads &&
              threads.map((thread) => (
                <div key={thread.id}>
                  <Thread thread={thread} id={thread.id} />
                </div>
              ))}
            {threads?.length === 0 && (
              <div>
                <Composer metadata={{ cardId: params.cardId.toString() }} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
