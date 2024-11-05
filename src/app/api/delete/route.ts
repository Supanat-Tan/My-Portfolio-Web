import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../lib/mongodb";
import Todo from "../../../../models/todoList";

export async function DELETE(req: Request) {
  try {
    const { listId } = await req.json();

    await connectToMongoDB();
    const res = await Todo.findOneAndDelete({ _id: listId });
    console.log("Delete: ", res);

    return NextResponse.json({ res });
  } catch (err) {
    console.log(err);
  }
}
