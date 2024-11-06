import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import "../../../css/todoList.css";

interface ToDoListItem {
  _id: string;
  listTitle: string;
  listDate: Date | null;
}

const ToDoList = () => {
  const [todoLists, setToDoLists] = useState<ToDoListItem[]>([]);
  const [listTitle, setListTitle] = useState("");
  const [listDate, setListDate] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const { data: session } = useSession();

  const userId = (session?.user as { id?: string })?.id;

  const formRef = useRef<HTMLFormElement | null>(null);

  const successHandler = (state: string) => {
    setSuccess(state);

    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  const errorHandler = (state: string) => {
    setError(state);

    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleSubmit = async (
    e: React.FormEvent,
    cl: string,
    date: Date | null
  ) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/createList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listTitle,
          listDate,
          userId,
        }),
      });

      if (res.ok) {
        const resData = await res.json();
        const newlyAdd = {
          _id: resData.data._id,
          listTitle: cl,
          listDate: date,
        };
        setToDoLists((l) => [...l, newlyAdd]);
        if (formRef.current) {
          formRef.current.reset();
        }

        successHandler("Successfully created list");
        setListTitle("");
        setListDate(null);
      } else {
        console.log("Failed to create list");
        errorHandler("Failed to create list");
        setToDoLists(todoLists);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const list = await fetch("/api/todoList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        });

        if (!list.ok) {
          throw new Error("Network Response was not ok");
        }

        const data = await list.json();
        setToDoLists(data.list);
      } catch (err) {
        setError("Error");
        console.log(err);
      } finally {
        setisLoading(false);
      }
    };

    fetchList();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100%] text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100%] text-2xl">
        Error fetching data
      </div>
    );
  }

  const handleDelete = async (e: React.FormEvent, listId: string) => {
    e.preventDefault();
    try {
      const deleteList = await fetch(`/api/delete?listId=${listId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId,
        }),
      });

      if (!deleteList.ok) {
        throw new Error(`Error: ${deleteList.statusText}`);
      }
      successHandler("Successfully Delete");
      setToDoLists((prev) => prev.filter((todo) => todo._id !== listId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row main-todo items-center justify-center">
      <div className="flex-[2_1_0%] h-[100%] flex flex-col justify-center items-center">
        <div className="flex-1 flex flex-col justify-center items-center font-normal">
          <form
            className="flex flex-col items-center justify-center"
            action=""
            onSubmit={(e) =>
              handleSubmit(e, listTitle, listDate ? new Date(listDate) : null)
            }
            ref={formRef}
          >
            <label className="block mt-4" htmlFor="list">
              Type in your to do list
            </label>
            <input
              className="black p-2 mt-4 rounded-lg bg-transparent border-2 border-black w-[100%]"
              type="text"
              id="list"
              name="listTitle"
              onChange={(e) => setListTitle(e.target.value)}
            />
            <label className="block mt-4" htmlFor="listDate">
              Date
            </label>
            <input
              className="black p-2 mt-4 rounded-lg bg-transparent border-2 border-black w-[100%]"
              type="date"
              name="listDate"
              id="listDate"
              onChange={(e) => setListDate(e.target.value)}
            />
            <button className="block mt-4 border-2 border-black rounded-lg p-2">
              Submit
            </button>
          </form>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          {success && (
            <div className="bg-green-500 text-white w-[80%] rounded-lg h-[100px] flex justify-center items-center text-center">
              {success}
            </div>
          )}
        </div>
      </div>
      <div className="flex-[8_0_0%] flex flex-col justify-center items-center h-[100%] content-box">
        {todoLists.map((todo) => (
          <div
            key={todo._id}
            className="flex mt-4 w-[90%] h-auto justify-center items-center"
          >
            {todo.listTitle} ---{" "}
            {todo.listDate
              ? new Date(todo.listDate).toISOString().split("T")[0]
              : ""}
            <button
              key={todo._id}
              onClick={(e) => handleDelete(e, todo._id)}
              className="ml-5 text-red-600 border-2 border-red-500 rounded-lg h-[80%] p-[2px]"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
