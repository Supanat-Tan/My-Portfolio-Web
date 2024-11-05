"use client";
import ThreeScene from "@/components/3dscene/Scene1";
import WelcomeMenu from "@/components/common/WelcomeMenu";
import ScrollMenu from "@/components/common/Scroll/ScrollMenu";
import MainBoard from "@/components/common//MainBoard/MainBoard";
import RightBoard from "@/components/common/RightBoard/RightBoard";
import NavBox from "@/components/common/NavBox";
import * as THREE from "three";
import { useState } from "react";
import "./globals.css";
const Home = () => {
  const [camPos, setCamPos] = useState(new THREE.Vector3(0, 0, 3));
  const [camRot, setCamRot] = useState(new THREE.Quaternion().identity());
  const [menuVisibility, setMenuVisibility] = useState(true);
  const [allowOrbit, setAllowOrbit] = useState(false);
  const [allowFrame, setAllowFrame] = useState(true);
  const [showScrollMenu, setShowScrollMenu] = useState(false);
  const [showMainBoard, setShowMainBoard] = useState(false);
  const [showRightBoard, setshowRightBoard] = useState(false);
  const [scrollMenuTimeout, setScrollMenuTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [mainFuncTimeout, setMainFuncTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [rightFuncTimeout, setRightFuncTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const moveCam = (position: Array<number>, rotation: Array<number>) => {
    setAllowOrbit(false);
    setAllowFrame(true);
    setCamPos(new THREE.Vector3(...position));

    const targetRotation = new THREE.Euler(...rotation);
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      targetRotation
    );
    setCamRot(targetQuaternion);
  };

  const showMainMenu = (tf: boolean) => {
    setMenuVisibility(tf);
  };

  const showScrollFunc = () => {
    setShowMainBoard(false);
    setshowRightBoard(false);

    if (mainFuncTimeout) {
      clearTimeout(mainFuncTimeout);
      setMainFuncTimeout(null);
    }
    if (rightFuncTimeout) {
      clearTimeout(rightFuncTimeout);
      setRightFuncTimeout(null);
    }

    if (scrollMenuTimeout) {
      clearTimeout(scrollMenuTimeout);
    }

    const timeoutScroll = setTimeout(() => {
      setShowScrollMenu(true);
    }, 2000);

    setScrollMenuTimeout(timeoutScroll);
  };

  const showMainFunc = () => {
    setShowScrollMenu(false);
    setshowRightBoard(false);

    if (scrollMenuTimeout) {
      clearTimeout(scrollMenuTimeout);
      setScrollMenuTimeout(null);
    }

    if (mainFuncTimeout) {
      clearTimeout(mainFuncTimeout);
    }
    if (rightFuncTimeout) {
      clearTimeout(rightFuncTimeout);
      setRightFuncTimeout(null);
    }

    const timeoutMain = setTimeout(() => {
      setShowMainBoard(true);
    }, 2000);

    setMainFuncTimeout(timeoutMain);
  };

  const showRightFunc = () => {
    setShowScrollMenu(false);
    setShowMainBoard(false);

    if (scrollMenuTimeout) {
      clearTimeout(scrollMenuTimeout);
      setScrollMenuTimeout(null);
    }

    if (mainFuncTimeout) {
      clearTimeout(mainFuncTimeout);
      setMainFuncTimeout(null);
    }
    if (rightFuncTimeout) {
      clearTimeout(rightFuncTimeout);
    }

    const timeoutRight = setTimeout(() => {
      setshowRightBoard(true);
    }, 2000);

    setRightFuncTimeout(timeoutRight);
  };

  const handleMenu = (
    scroll: boolean,
    mainBoard: boolean,
    rightBoard: boolean
  ) => {
    switch (true) {
      case scroll:
        showScrollFunc();
        break;
      case mainBoard:
        showMainFunc();
        break;
      case rightBoard:
        showRightFunc();
        break;
      default:
        setShowScrollMenu(false);
        setShowMainBoard(false);
        setshowRightBoard(false);
    }
  };

  const allowOrbitHandle = () => {
    setAllowOrbit((o) => !o);
    setAllowFrame((f) => !f);
  };

  return (
    <>
      <div className="w-[100%] h-[100%] bg-[hsl(0,0%,5%)] absolute main-screen">
        {menuVisibility && (
          <WelcomeMenu
            moveCam={moveCam}
            handleMenu={handleMenu}
            showMainMenu={showMainMenu}
            allowOrbitHandle={allowOrbitHandle}
            allowOrbit={allowOrbit}
          />
        )}
        {showScrollMenu && <ScrollMenu />}
        {showMainBoard && <MainBoard />}
        {showRightBoard && <RightBoard />}

        <div className="w-[100%] h-[100%]">
          <ThreeScene
            camPos={camPos}
            camRot={camRot}
            allowOrbit={allowOrbit}
            allowFrame={allowFrame}
          />
        </div>
        {!menuVisibility && (
          <NavBox
            moveCam={moveCam}
            handleMenu={handleMenu}
            showMainMenu={showMainMenu}
          />
        )}
      </div>
    </>
  );
};

export default Home;
