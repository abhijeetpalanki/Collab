"use client";

import { signIn } from "next-auth/react";

export default function LoginView() {
  return (
    <div className="w-full pt-8 text-center">
      <button className="primary" onClick={() => signIn("google")}>
        Login
      </button>
    </div>
  );
}
