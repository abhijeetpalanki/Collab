"use client";

import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      className="bg-gray-300 py-2 px-4 ml-2 rounded-md"
      onClick={() => signIn("google")}
    >
      Login <FontAwesomeIcon icon={faArrowRightToBracket} />
    </button>
  );
}
