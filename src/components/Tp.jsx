import React from "react";
import Particles from "react-tsparticles";
import { config } from "../helpers/ptest.config";
import "pathseg";

const TP = () => {
  console.log({ config });
  return (
    <div>
      <Particles options={config} />
    </div>
  );
};

export default TP;
