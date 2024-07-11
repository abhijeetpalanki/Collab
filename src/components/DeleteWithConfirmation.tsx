"use client";

import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  onDelete: () => void;
};

export default function DeleteWithConfirmation({ onDelete }: Props) {
  const [wantToDelete, setWantToDelete] = useState(false);

  if (wantToDelete) {
    return (
      <div>
        <h4 className="mb-2 text-center">Are you sure?</h4>
        <div className="flex gap-2">
          <button
            className="btn w-full with-icon"
            onClick={() => setWantToDelete(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            No, Cancel
          </button>
          <button className="w-full btn red with-icon" onClick={onDelete}>
            Yes, Delete!
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="bg-red-500 text-white p-2 w-full flex justify-center items-center gap-2 rounded-md"
      onClick={() => setWantToDelete(true)}
    >
      <FontAwesomeIcon icon={faTrash} />
      Delete
    </button>
  );
}
