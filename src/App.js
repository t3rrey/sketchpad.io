import React from 'react'
import Draw from './components/Draw'
import { fabric } from 'fabric'
import './App.css'

export default function () {
  const canvas = new fabric.Canvas('c', {
    height:800,
    width: 800,
  });

  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20,
    angle: 45
  });
  
  canvas.add(rect);
  return (
    <div>
      <Draw />
      <h1>test</h1>
    </div>
  )
}

