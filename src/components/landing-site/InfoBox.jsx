import React from "react";
import "../../styles/infobox.css";
import TP from "../Tp";

function InfoBox() {
  return (
    <div className="infobox-main-wrapper">
      <div className="main-infobox-1">
        <div className="info-child">
          <TP />
        </div>
        <div className="info-child"></div>
        <div className="info-child"></div>
      </div>
    </div>
  );
}

export default InfoBox;
