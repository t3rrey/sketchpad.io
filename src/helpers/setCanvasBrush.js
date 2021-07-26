import { fabric } from "fabric";

const setCanvasBrush = (canvas, brushName) => {
    const brush = {
        hline() {
            let hLinePatternBrush = new fabric.PatternBrush(canvas);
            hLinePatternBrush.getPatternSrc = function() {
                let patternCanvas = fabric.document.createElement("canvas");
                patternCanvas.width = patternCanvas.height = 10;
                let ctx = patternCanvas.getContext("2d");
                console.log({ patternCanvas });

                ctx.strokeStyle = this.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(5, 0);
                ctx.lineTo(5, 10);
                ctx.closePath();
                ctx.stroke();

                return patternCanvas;
            };

            return hLinePatternBrush;
        },
        vline() {
            let vLinePatternBrush = new fabric.PatternBrush(canvas);

            vLinePatternBrush.getPatternSrc = function() {
                let patternCanvas = fabric.document.createElement("canvas");
                patternCanvas.width = patternCanvas.height = 10;
                let ctx = patternCanvas.getContext("2d");

                ctx.strokeStyle = this.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(10, 5);
                ctx.closePath();
                ctx.stroke();

                return patternCanvas;
            };

            return vLinePatternBrush;
        },
        square() {
            var squarePatternBrush = new fabric.PatternBrush(canvas);
            squarePatternBrush.getPatternSrc = function() {
                var squareWidth = 10,
                    squareDistance = 2;

                var patternCanvas = fabric.document.createElement("canvas");
                patternCanvas.width = patternCanvas.height =
                    squareWidth + squareDistance;
                var ctx = patternCanvas.getContext("2d");

                ctx.fillStyle = this.color;
                ctx.fillRect(0, 0, squareWidth, squareWidth);

                return patternCanvas;
            };

            return squarePatternBrush;
        },
    }[brushName]();

    canvas.freeDrawingBrush = brush;

    console.log({ canvas, brushName, brush });

    return brush;
};

export default setCanvasBrush;