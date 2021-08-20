import React from "react";
import Particles from "react-tsparticles";
import { config } from "../configs/square.config";
import "pathseg";
import "../styles/tp.css";

const SquareParticles = () => {
  return <Particles id="square-part" options={config} />;
};

export default SquareParticles;
