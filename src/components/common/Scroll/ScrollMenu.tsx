import React, { useState } from "react";
import "../../../css/scrollMenu.css";
import ToDoList from "./ToDoList";
import Login from "./LoginSignup";
import { signOut, useSession } from "next-auth/react";
import ImageSlider from "./ImageSlider";

const ScrollMenu = () => {
  const { data: session } = useSession();

  const [showToDoList, setShowToDoList] = useState(false);
  const [showImageSlider, setShowImageSlider] = useState(false);

  const handleMenu = (op1: boolean, op2: boolean) => {
    setShowToDoList(op1);
    setShowImageSlider(op2);
  };

  const images = ["/imgs/mech_1.jpg", "/imgs/mech_2.jpg", "/imgs/mech_3.jpg"];

  return (
    <>
      <div className="main-scroll-container">
        <div className="control">
          <div className="control-logo">
            Welcome <p>{session?.user?.email}</p>
          </div>
          {session && (
            <div className="control-choices">
              <div onClick={() => handleMenu(true, false)}>To Do List</div>
              <div onClick={() => handleMenu(false, true)}>Image Slider</div>
              <div onClick={() => signOut()} className="text-red-500">
                Sign out
              </div>
            </div>
          )}
        </div>
        <div className="content">
          {!session && <Login />}
          {showImageSlider && <ImageSlider images={images} interval={5000} />}
          {showToDoList && <ToDoList />}
        </div>
      </div>
    </>
  );
};

export default ScrollMenu;
