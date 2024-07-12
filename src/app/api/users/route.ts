import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { User, UserType } from "@/models/User";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    return new Response("no db connection string", { status: 500 });
  }

  await mongoose.connect(connectionString);

  let users = [];

  if (url.searchParams.get("ids")) {
    const emails = url.searchParams.get("ids")?.split(",");
    users = await User.find({ email: { $in: emails } });
  }

  if (url.toString().includes("?search=")) {
    const searchPhrase = url.searchParams.get("search");
    const searchRegex = `.*${searchPhrase}.*`;
    users = await User.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });
  }

  return Response.json(
    users.map((u: UserType) => ({
      id: u.email,
      name: u.name,
      image: u.image,
    }))
  );
}
