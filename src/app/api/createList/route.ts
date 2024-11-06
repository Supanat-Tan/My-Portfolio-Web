import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongodb";
import Todo from "../../../../models/todoList";

export async function POST(req: Request) {
  try {
    const { listTitle, listDate, userId } = await req.json();

    await connectToMongoDB();
    const data = await Todo.create({ listTitle, listDate, userId });
    console.log("List: ", data);

    return NextResponse.json({ data });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Error creating todo item" },
      { status: 500 }
    );
  }
}
