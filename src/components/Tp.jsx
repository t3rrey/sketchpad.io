import React from "react";
import Particles from "react-tsparticles";
import { config } from "../helpers/ptest.config";
const tp = () => {
  return (
    <div>
      <Particles options={config} />
    </div>
  );
};

export default tp;
