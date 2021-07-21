import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";

let canvas;

const getDimensions = () => ({
  height: 800,
  width: window.innerWidth / 1.5,
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

export default function Draw() {
  const [lineWidth, setLineWidth] = useState(3);
  const [lineColor, setLineColor] = useState("#000000");
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowOffset, setShadowOffset] = useState(0);
  const [shadowWidth, setShadowWidth] = useState(0);
  const [drawingMode, setDrawingMode] = useState(false);
  
  const canvasEl = useRef();

  const config = {
    lineWidth,
    lineColor,
    shadowColor,
    shadowOffset,
    shadowWidth,
  };

  // console.log({ canvasEl });

  useEffect(() => {
    const onResize = () => {
     // console.log("Resize happened");
      canvas.setDimensions(getDimensions());
    };
    // On resize
    window.addEventListener("resize", onResize);
    // On unmount, remove resize event
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    console.log({ canvasEl });

    if (canvasEl.current && !canvas) {
      canvas = getCanvas();
    }
  }, [canvasEl]);

  useEffect(() => {
    if (canvas) canvas.isDrawingMode = drawingMode;
  }, [drawingMode]);

  const handleChangeColor = (event) => {
    setLineColor(event.target.value);
    setColor(event.target.value);
  };

  return (
    <div>
      <button onClick={addRect}>Add Rectangle</button>
      <button onClick={() => setDrawingMode(!drawingMode)}>
        {drawingMode ? "Cancel drawing mode" : "Enter drawing mode"}
      </button>
      <button onClick={clearCanvas}>Clear Canvas</button>

      <div>
        {drawingMode && (
          <div id="drawing-mode-options">
            <label htmlFor="drawing-mode-selector">Mode:</label>
            <select id="drawing-mode-selector">
              <option>Pencil</option>
              <option>Circle</option>
              <option>Spray</option>
              <option>Pattern</option>
              <option>hline</option>
              <option>vline</option>
              <option>square</option>
              <option>diamond</option>
              <option>texture</option>
            </select>
            <br />
            <label htmlFor="drawing-line-width">Line width:</label>
            <span className="info">{lineWidth}</span>
            <input
              type="range"
              value={lineWidth}
              onChange={(event) => setLineWidth(event.target.value)}
              min="0"
              max="150"
              id="drawing-line-width"
            />
            <br />
            <label for="drawing-color">Line color:</label>
            <input
              type="color"
              value={lineColor}
              onChange={handleChangeColor}
              id="drawing-color"
            />
            <br />
            <label for="drawing-shadow-color">Shadow color:</label>
            <input
              type="color"
              value={shadowColor}
              onChange={(event) => setShadowColor(event.target.value)}
              id="drawing-shadow-color"
            />
            <br />
            <label for="drawing-shadow-width">Shadow width:</label>
            <span className="info">{shadowWidth}</span>
            <input
              type="range"
              value={shadowWidth}
              onChange={(event) => setShadowWidth(event.target.value)}
              min="0"
              max="50"
              id="drawing-shadow-width"
            />
            <br />
            <label for="drawing-shadow-offset">Shadow offset:</label>
            <span className="info">{shadowOffset}</span>
            <input
              type="range"
              value={shadowOffset}
              onChange={(event) => setShadowOffset(event.target.value)}
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
  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: "blue",
    width: 20,
    height: 20,
    hasControls: true,
  });
  canvas.add(rect);
}

function drawTool(config) {
  fabric.Object.prototype.transparentCorners = false;

  var drawingColorEl = config.lineColor,
    drawingShadowColorEl = config.shadowColor,
    drawingLineWidthEl = config.lineWidth,
    drawingShadowWidth = config.shadowWidth,
    drawingShadowOffset = config.shadowOffset;

  
  if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function () {
      var patternCanvas = fabric.document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext("2d");

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function () {
      var patternCanvas = fabric.document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext("2d");

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function () {
      var squareWidth = 10,
        squareDistance = 2;

      var patternCanvas = fabric.document.createElement("canvas");
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext("2d");

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);

      return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function () {
      var squareWidth = 10,
        squareDistance = 5;
      var patternCanvas = fabric.document.createElement("canvas");
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color,
      });

      var canvasWidth = rect.getBoundingRect().width;

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext("2d");
      rect.render(ctx);

      return patternCanvas;
    };

    var img = new Image();
    img.src = "../assets/honey_im_subtle.png";

    var texturePatternBrush = new fabric.PatternBrush(canvas);
    texturePatternBrush.source = img;
  }

  "drawing-mode-selector".onchange = function () {
    if (this.value === "hline") {
      canvas.freeDrawingBrush = vLinePatternBrush;
    } else if (this.value === "vline") {
      canvas.freeDrawingBrush = hLinePatternBrush;
    } else if (this.value === "square") {
      canvas.freeDrawingBrush = squarePatternBrush;
    } else if (this.value === "diamond") {
      canvas.freeDrawingBrush = diamondPatternBrush;
    } else if (this.value === "texture") {
      canvas.freeDrawingBrush = texturePatternBrush;
    } else {
      canvas.freeDrawingBrush = new fabric[this.value + "Brush"](canvas);
    }

    if (canvas.freeDrawingBrush) {
      var brush = canvas.freeDrawingBrush;
      brush.color = drawingColorEl.value;
      if (brush.getPatternSrc) {
        brush.source = brush.getPatternSrc.call(brush);
      }
      brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      brush.shadow = new fabric.Shadow({
        blur: parseInt(drawingShadowWidth.value, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: drawingShadowColorEl.value,
      });
    }
  };

  drawingColorEl.onchange = function () {
    var brush = canvas.freeDrawingBrush;
    brush.color = this.value;
    if (brush.getPatternSrc) {
      brush.source = brush.getPatternSrc.call(brush);
    }
  };
  drawingShadowColorEl.onchange = function () {
    canvas.freeDrawingBrush.shadow.color = this.value;
  };
  drawingLineWidthEl.onchange = function () {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    this.previousSibling.innerHTML = this.value;
  };
  drawingShadowWidth.onchange = function () {
    canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };
  drawingShadowOffset.onchange = function () {
    canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
    canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.source =
      canvas.freeDrawingBrush.getPatternSrc.call(this);
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: parseInt(drawingShadowWidth.value, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: drawingShadowColorEl.value,
    });
  }
}
