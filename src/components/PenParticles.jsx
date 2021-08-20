import React from "react";
import Particles from "react-tsparticles";
import { config } from "../configs/pen.config";
import "pathseg";
import "../styles/tp.css";

const PenParticles = () => {
  console.log({ config });
  return <Particles id="pen-part" options={config} />;
};

export default PenParticles;
