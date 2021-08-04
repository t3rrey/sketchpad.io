import { fabric } from "fabric";

export function drawTriangleShape(canvas) {
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

export function addRect(canvas) {
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