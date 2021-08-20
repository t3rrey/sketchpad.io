import React from "react";
import "../../styles/infobox.css";
import CloudParticles from "../CloudParticles";
import TP from "../PenParticles";
import SquareIcon from "../SquareParticles";

function InfoBox() {
  return (
    <div className="infobox-main-wrapper">
      <div className="main-infobox-1">
        <div className="info-child">
          <TP id="pen-part" />
        </div>
        <div className="info-child">
          <SquareIcon id="square-part" />
        </div>
        <div className="info-child">
          <CloudParticles id="cloud-part" />
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
