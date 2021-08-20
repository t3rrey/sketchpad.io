import React from "react";
import Particles from "react-tsparticles";
import { config } from "../configs/cloud.config";
import "pathseg";
import "../styles/tp.css";

const CloudParticles = () => {
  return <Particles id="cloud-part" options={config} />;
};

export default CloudParticles;
