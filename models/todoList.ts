import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoListSchema = new Schema(
  {
    listTitle: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    listDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true, collection: "todoList" }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoListSchema);

export default Todo;
