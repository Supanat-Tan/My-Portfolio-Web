"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
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

  const circleRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const circleSelector = circleRef.current;

    if (circleSelector) {
      circleSelector.style.transition = "transform 0.2s ease-out";
      circleSelector.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation]);

  const regRotator = (degree: SetStateAction<number>) => {
    setRotation(degree);
  };

  const resetRotator = () => {
    setRotation(0);
  };

  return (
    <div className="w-[60%] max-w-[200px] h-[50%] flex flex-row absolute bg-transparent top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] text-lg container">
      <div className="flex-[1_1_0%] flex flex-col">
        <div
          onMouseEnter={() => regRotator(60)}
          onMouseLeave={resetRotator}
          className="flex-1 text-white cursor-pointer flex justify-center items-center"
          onClick={() => {
            moveCam([0, 0.5, -2], [-PI / 2, 0, 0]);
            handleMenu(true, false, false);
            showMainMenu(false);
          }}
        >
          Feature
        </div>
        <div
          onMouseEnter={() => regRotator(90)}
          onMouseLeave={resetRotator}
          className="flex-1 text-white cursor-pointer flex justify-center items-center"
          onClick={() => {
            moveCam([0, 0.825, -0.7], [0, 0, 0]);
            handleMenu(false, true, false);
            showMainMenu(false);
          }}
        >
          My Familiar Tools
        </div>
        <div
          onMouseEnter={() => regRotator(120)}
          onMouseLeave={resetRotator}
          className="flex-1 text-white cursor-pointer flex justify-center items-center"
          onClick={() => {
            moveCam([0.5, 0.825, 0], [0, -PI / 2, 0]);
            handleMenu(false, false, true);
            showMainMenu(false);
          }}
        >
          Profile & Credits
        </div>
        <div
          className={`flex-1 text-white cursor-pointer flex justify-center items-center transition-all duration-200 ${
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
