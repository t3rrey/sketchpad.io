import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import setCanvasBrush from "../helpers/setCanvasBrush";
import circleBtn from "../img/circleButton.svg";
import squareBtn from "../img/squareButton.svg";
import triangleBtn from "../img/triangleButton.svg";
import clearBtn from "../img/clearButton.svg";
import drawToolBtn from "../img/drawToolButton.svg";
import Controls from "./Controls";

let canvas;

const getDimensions = () => ({
  height: 800,
  width: window.innerWidth * 0.98,
});

const getCanvas = () => {
  console.log("getCanvas called!");
  return new fabric.Canvas("react-canvas", getDimensions());
};

const setColor = (color) => {
  const brush = canvas.freeDrawingBrush;
  brush.color = color;

  if (brush.getPatternSrc) {
    brush.source = brush.getPatternSrc.call(brush);
  }
};

const setWidth = (width) => {
  const brush = canvas.freeDrawingBrush;
  if (!brush) return;

  brush.width = parseInt(width);
  console.log({ width, pattern: brush.getPatternSrc });

  if (brush.getPatternSrc) {
    brush.source = brush.getPatternSrc.call(brush);
  }
};

export default function Draw() {
  const [lineWidth, setLineWidth] = useState(10);
  const [lineColor, setLineColor] = useState("#000000");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOffset, setShadowOffset] = useState(0);
  const [shadowWidth, setShadowWidth] = useState(0);
  const [drawingMode, setDrawingMode] = useState(false);
  const [canvasController, setCanvasController] = useState();

  const canvasEl = useRef();
  const config = {
    lineWidth,
    lineColor,
    shadowColor,
    shadowOffset,
    shadowWidth,
  };

  // On resize and delete shape events
  useEffect(() => {
    const onResize = () => {
      // console.log("Resize happened");
      canvas.setDimensions(getDimensions());
    };
    const onDelete = (event) => {
      if (event.key !== "Delete") return;
      const objects = canvas.getActiveObjects();
      console.log({ objects });
      objects.forEach((object) => canvas.remove(object));
    };

    // On resize
    window.addEventListener("resize", onResize);
    // On keyup
    document.addEventListener("keyup", onDelete);

    // On unmount, remove resize event
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keyup", onDelete);
    };
  }, []);

  useEffect(() => {
    if (canvasEl.current) {
      canvas = getCanvas();
      setCanvasController(canvas);
    }
  }, [canvasEl]);

  useEffect(() => {
    if (canvas) canvas.isDrawingMode = drawingMode;
  }, [drawingMode]);

  useEffect(() => {
    if (!canvas.freeDrawingBrush) return;

    const brush = canvas.freeDrawingBrush;

    brush.shadow = new fabric.Shadow({
      blur: shadowWidth,
      offsetX: shadowOffset,
      offsetY: shadowOffset,
      color: shadowColor,
    });
  }, [shadowWidth, shadowOffset, shadowColor]);

  const handleChangeColor = (event) => {
    setLineColor(event.target.value);
    setColor(event.target.value);
  };

  const handleChangeLineWidth = (event) => {
    setLineWidth(event.target.value);
    setWidth(event.target.value);
  };

  return (
    <div className="mainContent">
      <Controls canvas={canvasController} />
      <div className="main-tools-wrap">
        <img
          className="tool-btn"
          onClick={() => setDrawingMode(!drawingMode)}
          src={drawToolBtn}
          alt=""
          width="40"
        />
        <img
          className="tool-btn"
          onClick={addRect}
          src={squareBtn}
          alt="rectangleTool"
          width="40"
        />
        <img
          className="tool-btn"
          onClick={drawTriangleShape}
          src={triangleBtn}
          width="40"
        />
        <img className="tool-btn" src={circleBtn} alt="" width="40" />
        <img
          className="tool-btn"
          onClick={clearCanvas}
          src={clearBtn}
          alt=""
          width="40"
        />
      </div>

      <div>
        {drawingMode && (
          <div id="drawing-mode-options">
            <label htmlFor="drawing-mode-selector">Mode:</label>
            <div
              onClick={(event) => {
                const brush = event.target.name;
                console.log({ brush, canvas });
                if (brush) {
                  setCanvasBrush(canvas, brush);
                }
              }}
            >
              {[
                "Pencil",
                "Circle",
                "Spray",
                "Pattern",
                "hline",
                "vline",
                "square",
                "diamond",
                "texture",
              ].map((tool) => (
                <img src={`./img/${tool}.png`} name={tool} title={tool} />
              ))}
            </div>
            <br />
            <label htmlFor="drawing-line-width">Line width:</label>
            <span className="info">{lineWidth}</span>
            <input
              type="range"
              value={lineWidth}
              onChange={handleChangeLineWidth}
              min="1"
              max="150"
              id="drawing-line-width"
            />
            <br />
            <label htmlFor="drawing-color">Line color:</label>
            <input
              type="color"
              value={lineColor}
              onChange={handleChangeColor}
              id="drawing-color"
            />
            <br />
            <label htmlFor="drawing-shadow-color">Shadow color:</label>
            <input
              type="color"
              value={shadowColor}
              onChange={(event) => setShadowColor(event.target.value)}
              id="drawing-shadow-color"
            />
            <br />
            <label htmlFor="drawing-shadow-width">Shadow width:</label>
            <span className="info">{shadowWidth}</span>
            <input
              type="range"
              value={shadowWidth}
              onChange={(event) => setShadowWidth(+event.target.value)}
              min="0"
              max="50"
              id="drawing-shadow-width"
            />
            <br />
            <label htmlFor="drawing-shadow-offset">Shadow offset:</label>
            <span className="info">{shadowOffset}</span>
            <input
              type="range"
              value={shadowOffset}
              onChange={(event) => setShadowOffset(+event.target.value)}
              min="0"
              max="50"
              id="drawing-shadow-offset"
            />
            <br />
          </div>
        )}
      </div>
      <canvas ref={canvasEl} id="react-canvas"></canvas>
    </div>
  );
}

function clearCanvas() {
  canvas.clear();
}

function addRect() {
  let newRectangle = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "blue",
    width: 100,
    height: 100,
    hasControls: true,
  });
  canvas.add(newRectangle);
  canvas.centerObject(newRectangle);
}

function drawTriangleShape() {
  let newTriangle = new fabric.Triangle({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: "red",
    hasControls: true,
  });
  canvas.add(newTriangle);
  canvas.centerObject(newTriangle);
}


