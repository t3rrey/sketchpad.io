import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import setCanvasBrush from "../helpers/setCanvasBrush";
import { drawTriangleShape, addRect } from "../helpers/canvas";

import colorPicker from "../img/colorSelectorButton.svg";
import circleBtn from "../img/circleButton.svg";
import squareBtn from "../img/squareButton.svg";
import triangleBtn from "../img/triangleButton.svg";
import clearBtn from "../img/clearButton.svg";
import drawToolBtn from "../img/drawToolButton.svg";

import fill from "../helpers/fabric.fill";
import Controls from "./Controls";

import pencil from "../img/tool.pencil.svg";
import spray from "../img/tool.spray.svg";

const brushes = {
  pencil,
  spray,
  hline: spray,
};

let canvas;
let globalFillColor = "#000";
let paint;

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
  // Options
  const [fillColor, setFillColor] = useState(globalFillColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [lineWidth, setLineWidth] = useState(10);
  const [lineColor, setLineColor] = useState("#000000");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOffset, setShadowOffset] = useState(0);
  const [shadowWidth, setShadowWidth] = useState(0);

  const [drawingMode, setDrawingMode] = useState(false);
  const [canvasController, setCanvasController] = useState();
  const [brush, setBrush] = useState();
  const [selectedTool, setSelectedTool] = useState();

  const canvasEl = useRef();
  const config = {
    lineWidth,
    lineColor,
    shadowColor,
    shadowOffset,
    shadowWidth,
  };

  console.log({ brush });

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
      canvas.on({
        "mouse:up": function (e) {
          const objects = [];
          canvas.forEachObject(function (object) {
            console.log(object.selectable);
            if (object.selectable) {
              objects.push(object);
            }
          });
          objects.reverse().forEach((object) => {
            canvas.bringToFront(object);
          });
        },
      });

      canvas.on({
        "mouse:down": function (e) {
          const mouse = canvas.getPointer(e.e),
            mouseX = Math.round(mouse.x),
            mouseY = Math.round(mouse.y);
          console.log({ paint });
          if (!paint) return;
          paint = false;
          fill(canvas, [mouseX, mouseY], {
            fillColor: globalFillColor,
            fillTolerance: 2,
          });
        },
      });
    }
  }, [canvasEl]);

  useEffect(() => {
    if (canvas) canvas.isDrawingMode = drawingMode;
  }, [drawingMode]);

  const onBrushUpdate = () => {
    if (!canvas.freeDrawingBrush) return;

    const brush = canvas.freeDrawingBrush;

    brush.shadow = new fabric.Shadow({
      blur: shadowWidth,
      offsetX: shadowOffset,
      offsetY: shadowOffset,
      color: shadowColor,
    });
  };
  useEffect(onBrushUpdate, [shadowWidth, shadowOffset, shadowColor]);
  useEffect(() => {
    setWidth(lineWidth);
    setColor(lineColor);
    onBrushUpdate();
  }, [brush]);

  const handleChangeColor = (event) => {
    setLineColor(event.target.value);
    setColor(event.target.value);
  };

  const handleChangeLineWidth = (event) => {
    setLineWidth(event.target.value);
    setWidth(event.target.value);
  };

  const brushClicked = (canvas, brush) => {
    setCanvasBrush(canvas, brush);
    setBrush(brush);
  };

  return (
    <div className="mainContent">
      <button
        onClick={() => fill(canvas, [10, 10], { fillColor, fillTolerance: 2 })}
      >
        Fill
      </button>
      <Controls canvas={canvasController} />
      <div className="main-tools-wrap">
        <div>
          <img
            className="tool-btn"
            onClick={() => setDrawingMode(!drawingMode)}
            src={(drawingMode && brushes[brush]) || drawToolBtn}
            alt=""
            width="40"
          />
          {drawingMode && (
            <div
              className="tools-list"
              onClick={(event) => {
                const brush = event.target.name;
                console.log({ brush, canvas });
                if (brush) {
                  brushClicked(canvas, brush);
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
                <img
                  src={brushes[tool.toLowerCase()] || brushes.pencil}
                  name={tool}
                  title={tool}
                  className="tool"
                />
              ))}
            </div>
          )}
        </div>
        <img
          className="tool-btn"
          onClick={() => addRect(canvas)}
          src={squareBtn}
          alt="rectangleTool"
          width="40"
        />
        <img
          className="tool-btn"
          onClick={() => drawTriangleShape(canvas)}
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
        <div>
          <img
            src={colorPicker}
            onClick={() => setShowColorPicker(!showColorPicker)}
            width="40"
          />

          {showColorPicker && (
            <input
              type="color"
              value={fillColor}
              className="color-value"
              onChange={(event) => {
                setFillColor(event.target.value);
                globalFillColor = event.target.value;
                paint = true;
              }}
            />
          )}
        </div>
      </div>

      <div>
        {drawingMode && (
          <div id="drawing-mode-options">
            <h5>Options</h5>
            <div className="options-list">
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
