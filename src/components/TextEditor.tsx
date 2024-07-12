// @ts-ignore
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Doc } from "yjs";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Collaboration } from "@tiptap/extension-collaboration";
import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
import { Underline } from "@tiptap/extension-underline";
import { useSelf } from "@/app/liveblocks.config";
// @ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faHeading,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

type EditorProps = {
  doc: Doc;
  provider: LiveblocksYjsProvider<any, any, any, any>;
  cardId: string;
};

export default function TextEditor({ doc, provider, cardId }: EditorProps) {
  const userInfo = useSelf((me: any) => me.info);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: "Task description...",
      }),
      Collaboration.configure({
        document: doc,
        field: cardId,
      }),
      CollaborationCursor.configure({
        provider,
        user: userInfo || undefined,
      }),
      Underline.configure(),
    ],
  });

  return (
    <div>
      <div className="flex gap-1 mb-1 mt-2 editor-buttons">
        <button
          className={editor?.isActive("bold") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          className={editor?.isActive("italic") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          className={editor?.isActive("underline") ? "active" : ""}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button
          className={editor?.isActive("heading") ? "active" : ""}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <FontAwesomeIcon icon={faHeading} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
