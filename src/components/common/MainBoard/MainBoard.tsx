import React from "react";
import "../../../css/mainBoard.css";

const MainBoard = () => {
  const myTools = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Three.js",
    "React Three Fiber",
    "Express",
    "Next.js",
    "TailWind",
  ];
  const planToLearn = [
    "C#",
    ".NET",
    "C++",
    "Unity",
    "Unreal Engine",
    "Blender",
    "Vue.js",
  ];

  return (
    <>
      <div className="main-board-container">
        <div className="Familiar">
          <h3>Familiar Things</h3>
          <div className="box-card">
            {myTools.map((tool, index) => (
              <div key={index} className="tools-card">
                {tool}
              </div>
            ))}
          </div>
        </div>
        <div className="Plan">
          <h3>Plan to learn</h3>
          <div className="box-card">
            {planToLearn.map((tool, index) => (
              <div key={index} className="tools-card">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBoard;
