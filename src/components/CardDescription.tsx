import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// @ts-ignore
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Doc } from "yjs";

import { useRoom } from "@/app/liveblocks.config";
import TextEditor from "./TextEditor";

export default function CardDescription() {
  const { cardId } = useParams();
  const room = useRoom();

  const [doc, setDoc] = useState<Doc | null>(null);
  const [provider, setProvider] = useState<LiveblocksYjsProvider<
    any,
    any,
    any,
    any
  > | null>(null);

  useEffect(() => {
    const yDoc = new Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <>
      <TextEditor doc={doc} provider={provider} cardId={cardId.toString()} />
    </>
  );
}
