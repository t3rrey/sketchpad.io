import svgShape from "../assets/rectIcon.svg";
export const config = {
  autoPlay: true,
  fpsLimit: 60,
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
      speed: 0.5,
    },
    number: {
      density: {
        area: 700,
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
          value: "none",
        },
        width: 0.5,
        opacity: 1,
      },
    },
    position: { x: 50, y: 50 },
    enable: true,
    inline: {
      arrangement: "equidistant",
    },
    move: {
      radius: 5,
      type: "path",
    },
    scale: 1,
    type: "inline",
    url: svgShape,
  },
};
