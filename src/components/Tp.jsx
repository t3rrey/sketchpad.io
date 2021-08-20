import React from "react";
import Particles from "react-tsparticles";
import { config } from "../configs/ptest.config";
import "pathseg";
// import "../styles/tp.css";

const TP = () => {
  console.log({ config });
  return (
    <div>
      <Particles options={config} />
    </div>
  );
};

export default TP;
