import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function getUserEmail(): Promise<string> {
  const session = await getServerSession(authOptions);
  return session?.user?.email || "";
}
