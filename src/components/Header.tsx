import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-gray-200 py-4 px-8">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/logo.png" alt="logo" width={36} height={36} />
          <span className="font-bold text-2xl">Collab</span>
        </Link>
        <div>
          {session && (
            <>
              Hello, {session.user?.name}
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              Not logged in <LoginButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
