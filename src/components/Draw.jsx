import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import setCanvasBrush from "../helpers/setCanvasBrush";
import { drawTriangleShape, addRect } from "../helpers/canvas";

import fill from "../helpers/fabric.fill";
import Controls from "./Controls";

import pencil from "../assets/tool.pencil.svg";
import spray from "../assets/tool.spray.svg";

import history from "../helpers/canvas.history";
import download from "../helpers/canvas.tojpg";

import bucketToolImg from "../assets/button-icons/bucket-tool.svg";
import cirlceToolImg from "../assets/button-icons/circle-tool.svg";
import clearToolImg from "../assets/button-icons/clear-tool.svg";
import downloadToolImg from "../assets/button-icons/download-tool.svg";
import penToolImg from "../assets/button-icons/pen-tool.svg";
import rectToolImg from "../assets/button-icons/rect-tool.svg";
import triangleToolImg from "../assets/button-icons/triangle-tool.svg";
import undoToolImg from "../assets/button-icons/undo-tool.svg";
import redoToolImg from "../assets/button-icons/redo-tool.svg";

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

  const undo = () => {
    history.undo();
  };

  const redo = () => {
    history.redo();
  };

  const canvasEl = useRef();
  const config = {
    lineWidth,
    lineColor,
    shadowColor,
    shadowOffset,
    shadowWidth,
  };

  console.log({ brush });

  useEffect(() => {
    document.addEventListener("keypress", function (e) {
      const zKey = 26;

      if (e.ctrlKey && e.which === zKey) {
        undo();
      }
    });
  }, []);

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
    if (!canvasEl.current) return;
    canvas = getCanvas();
    setCanvasController(canvas);

    history.init(canvas);

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
      <Controls canvas={canvasController} />
      <div className="draw-sidetools-main">
        <div className="tool-btn" id="pencil">
          <img src={penToolImg} alt="" />
        </div>
        <div
          className="tool-btn"
          id="drawSquare"
          onClick={() => addRect(canvas)}
        >
          <img src={rectToolImg} alt="" />
        </div>
        <div
          className="tool-btn"
          id="drawTriangle"
          onClick={() => drawTriangleShape(canvas)}
        >
          <img src={triangleToolImg} alt="" />
        </div>
        <div className="tool-btn" id="drawCircle">
          <img src={cirlceToolImg} alt="" />
        </div>
        <div
          className="tool-btn"
          id="fillBucket"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <img src={bucketToolImg} alt="" />
        </div>
        <div className="tool-btn" id="clearCanvas" onClick={clearCanvas}>
          <img src={clearToolImg} alt="" />
        </div>
        <div className="tool-btn" id="undoAction" onClick={undo}>
          <img src={undoToolImg} alt="" />
        </div>
        <div className="tool-btn" id="redoAction" onClick={redo}>
          <img src={redoToolImg} alt="" />
        </div>
        <div
          className="tool-btn"
          id="downloadCanvas"
          onClick={() => download(canvas)}
        >
          <img src={downloadToolImg} alt="" />
        </div>
      </div>
      <div className="main-tools-wrap">
        <div>
          <img
            className="tool-btn"
            onClick={() => setDrawingMode(!drawingMode)}
            src={drawingMode && brushes[brush]}
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
                  alt="penTool"
                />
              ))}
            </div>
          )}
        </div>
        <img
          className="tool-btn"
          onClick={() => addRect(canvas)}
          src=""
          alt="rectangleTool"
          width="40"
        />
        <img
          className="tool-btn"
          onClick={() => drawTriangleShape(canvas)}
          src=""
          width="40"
          alt=""
        />
        <img className="tool-btn" src="" alt="" width="40" />
        <img
          className="tool-btn"
          onClick={clearCanvas}
          src=""
          alt=""
          width="40"
        />
        <div>
          <img
            className="tool-btn"
            src=""
            onClick={() => setShowColorPicker(!showColorPicker)}
            width="40"
            alt=""
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
  history.onClear();
}
