import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function getUserEmail() {
  const session = await getServerSession(authOptions);
  return session?.user?.email || "";
}
