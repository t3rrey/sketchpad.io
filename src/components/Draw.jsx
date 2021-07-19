import React from 'react'
import {fabric} from 'fabric';

const canvas = new fabric.Canvas('c', {
    height: 800,
    width: 800,
  });

function Draw() {
    return (
        <div>
            <button onClick={addRect}>Add Circle</button>
            <button onClick={startDraw}>Draw</button>
        </div>
    )
}

function addRect() {
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'blue',
        width: 20,
        height: 20,
        hasControls: true
        
      });
      
      canvas.add(rect);
}
function startDraw() {
   canvas.on('mouse:down', function({e}){
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = '#00aeff';
   })

   canvas.on('mouse:up', function({e}) {
       canvas.isDrawingMode =false;
   })
   
   
    

}

export default Draw
