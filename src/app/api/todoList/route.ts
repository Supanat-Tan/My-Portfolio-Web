import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongodb";
import Todo from "../../../../models/todoList";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();

    const { userId } = await req.json();

    const list = await Todo.find({ userId }).select({
      listTitle: 1,
      userId: 1,
      listDate: 1,
    });
    //console.log("List: ", list);

    return NextResponse.json({ list });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch the todo list" },
      { status: 500 }
    );
  }
}
