import React, { useState } from "react";
import { useProgress } from "@react-three/drei";
import "../../css/loadingScene.css";

const LoadingScene = () => {
  const { progress, active } = useProgress();
  const [showLoading, setShowLoading] = useState(true);

  if (!active) {
    setTimeout(() => {
      setShowLoading(false);
    }, 5000);
  }

  return (
    <>
      {showLoading && (
        <div className="main-loading-scene">
          <div>Loading... {progress.toFixed(0)}%</div>
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </>
  );
};

export default LoadingScene;
