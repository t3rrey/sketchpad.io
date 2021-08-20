import smalldeer from "../assets/penTest.svg";
export const config = {
  autoPlay: true,
  size: "70%",
  detectRetina: false,
  fpsLimit: 30,
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: {
        value: "#f0f",
      },
      distance: 30,
      enable: true,
      opacity: 0.4,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      enable: true,
      outModes: {
        default: "bounce",
        bottom: "bounce",
        left: "bounce",
        right: "bounce",
        top: "bounce",
      },
      speed: 1,
    },
    number: {
      density: {
        area: 500,
      },
      value: 100,
    },
    opacity: {
      value: {
        min: 0.05,
        max: 0.4,
      },
      animation: {
        enable: true,
        minimumValue: 0.05,
      },
    },
    size: {
      random: {
        enable: true,
      },
      value: 1,
      animation: {
        speed: 5,
        minimumValue: 0.1,
      },
    },
  },
  polygon: {
    draw: {
      enable: true,
      stroke: {
        color: {
          value: "#ffffff",
        },
        width: 0.5,
        opacity: 0.2,
      },
    },
    enable: true,
    inline: {
      arrangement: "equidistant",
    },
    move: {
      radius: 10,
      type: "path",
    },
    scale: 0.5,
    type: "inline",
    url: smalldeer,
  },
};
