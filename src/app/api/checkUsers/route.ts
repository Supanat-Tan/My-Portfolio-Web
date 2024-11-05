import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    await connectToMongoDB();
    const user = await User.findOne({ email }).select("email");
    console.log("User: ", user);

    return NextResponse.json({ user });
  } catch (err) {
    console.log(err);
  }
}
