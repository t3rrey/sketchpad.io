import Particles from "react-tsparticles";
import React from "react";
import { alternativeParticles } from "../../configs/particle.config";

function Particlesbackground() {
  return (
    <div>
      <Particles options={alternativeParticles} />
    </div>
  );
}

export default Particlesbackground;
