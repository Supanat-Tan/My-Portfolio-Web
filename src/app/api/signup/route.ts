import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToMongoDB();
    await User.create({ email, password: hashedPassword });

    return NextResponse.json(
      { message: "User successfully register" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error While regeistering the user" },
      { status: 500 }
    );
  }
}
