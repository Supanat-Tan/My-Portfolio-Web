import React, { useState } from "react";
import "../../../css/scrollMenu.css";
import ToDoList from "./ToDoList";
import Login from "./LoginSignup";
import { signOut, useSession } from "next-auth/react";

const ScrollMenu = () => {
  const { data: session } = useSession();

  const [showToDoList, setShowToDoList] = useState(false);

  const handleMenu = (op1: boolean) => {
    setShowToDoList(op1);
  };

  return (
    <>
      <div className="main-scroll-container">
        <div className="control">
          <div className="control-logo">
            Welcome <p>{session?.user?.email}</p>
          </div>
          {session && (
            <div className="control-choices">
              <div onClick={() => handleMenu(true)}>To Do List</div>
              <div onClick={() => handleMenu(false)}>More Coming</div>
              <div onClick={() => signOut()} className="text-red-500">
                Sign out
              </div>
            </div>
          )}
        </div>
        <div className="content">
          {!session && <Login />}

          {showToDoList && <ToDoList />}
        </div>
      </div>
    </>
  );
};

export default ScrollMenu;
