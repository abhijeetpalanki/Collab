"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="bg-gray-300 py-2 px-4 ml-2 rounded-md"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}
