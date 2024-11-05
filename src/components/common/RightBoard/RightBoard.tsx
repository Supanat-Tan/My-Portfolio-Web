import React, { useState } from "react";
import "../../../css/rightBoard.css";
import Credits from "./Credits";
import MyProfiles from "./MyProfiles";

const RightBoard = () => {
  const [showCredit, setShorCredit] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleMenu = (profile: boolean, credit: boolean) => {
    setShorCredit(credit);
    setShowProfile(profile);
  };
  return (
    <>
      <div className="right-board-container">
        <div className="right-choices">
          <div onClick={() => handleMenu(true, false)}>My Profile</div>
          <div onClick={() => handleMenu(false, true)}>Credits</div>
        </div>
        <div className="right-content">
          {showCredit && <Credits />}
          {showProfile && <MyProfiles />}
        </div>
      </div>
    </>
  );
};

export default RightBoard;
