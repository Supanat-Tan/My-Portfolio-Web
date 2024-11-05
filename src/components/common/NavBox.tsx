import React from "react";
import "../../css/navBox.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface NavBoxProps {
  moveCam: (position: Array<number>, rotation: Array<number>) => void;
  handleMenu: (
    scroll: boolean,
    mainBoard: boolean,
    rightBoard: boolean
  ) => void;
  showMainMenu: (tf: boolean) => void;
}

const NavBox: React.FC<NavBoxProps> = ({
  moveCam,
  handleMenu,
  showMainMenu,
}) => {
  const PI = Math.PI;

  const { data: session } = useSession();

  return (
    <div className="box-container">
      <div
        className="flex justify-center items-center text-white w-[100%] h-10 m-2 cursor-pointer"
        onClick={() => {
          moveCam([0, 0, 3], [0, 0, 0]);
          handleMenu(false, false, false);
          showMainMenu(true);
        }}
      >
        Home
      </div>
      <div
        className="flex justify-center items-center text-white w-[100%] h-10 m-2 cursor-pointer"
        onClick={() => {
          moveCam([0, 0.5, -2], [-PI / 2, 0, 0]);
          handleMenu(true, false, false);
          showMainMenu(false);
        }}
      >
        Main
      </div>
      <div
        className="flex justify-center items-center text-white w-[100%] h-10 m-2 cursor-pointer"
        onClick={() => {
          moveCam([0, 0.825, -0.7], [0, 0, 0]);
          handleMenu(false, true, false);
          showMainMenu(false);
        }}
      >
        My familiar Tools
      </div>
      <div
        className="flex justify-center items-center text-white w-[100%] h-10 m-2 cursor-pointer"
        onClick={() => {
          moveCam([0.5, 0.825, 0], [0, -PI / 2, 0]);
          handleMenu(false, false, true);
          showMainMenu(false);
        }}
      >
        Profile & Credits
      </div>
      {session && (
        <div
          className="flex justify-center items-center text-white w-[100%] h-10 m-2 cursor-pointer"
          onClick={() => signOut()}
        >
          Sign out
        </div>
      )}
    </div>
  );
};

export default NavBox;
