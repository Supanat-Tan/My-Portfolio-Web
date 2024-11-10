"use client";
import React from "react";
import "../../css/welcomeCSS.css";

interface WelcomeMenuProps {
  moveCam: (position: Array<number>, rotation: Array<number>) => void;
  handleMenu: (
    scroll: boolean,
    mainBoard: boolean,
    rightBoard: boolean
  ) => void;
  allowOrbitHandle: () => void;
  allowOrbit: boolean;
  showMainMenu: (tf: boolean) => void;
}

const WelcomeMenu: React.FC<WelcomeMenuProps> = ({
  moveCam,
  handleMenu,
  allowOrbitHandle,
  allowOrbit,
  showMainMenu,
}) => {
  const PI = Math.PI;

  return (
    <div className="container">
      <div className="">
        <div
          className=""
          onClick={() => {
            moveCam([0, 0.5, -2], [-PI / 2, 0, 0]);
            handleMenu(true, false, false);
            showMainMenu(false);
          }}
        >
          Feature
        </div>
        <div
          className=""
          onClick={() => {
            moveCam([0, 0.825, -0.7], [0, 0, 0]);
            handleMenu(false, true, false);
            showMainMenu(false);
          }}
        >
          My Familiar Tools
        </div>
        <div
          className=""
          onClick={() => {
            moveCam([0.5, 0.825, 0], [0, -PI / 2, 0]);
            handleMenu(false, false, true);
            showMainMenu(false);
          }}
        >
          Profile & Credits
        </div>
        <div
          className={`orbit-control transition-all duration-200 ${
            allowOrbit ? "bg-green-500" : "bg-red-400"
          }`}
          onClick={allowOrbitHandle}
        >
          {allowOrbit ? "Orbit Control On" : "Orbit Control Off"}
        </div>
      </div>
    </div>
  );
};

export default WelcomeMenu;
