import { useState, useEffect } from "react";

const Controls = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState();

  // On select object event
  useEffect(() => {
    const onSelect = () => {
      canvas && setSelectedObject(canvas.getActiveObjects()[0]);
    };

    document.body.addEventListener("click", onSelect);

    return () => document.body.removeEventListener("click", onSelect);
  }, [canvas]);

  if (!canvas || !selectedObject) return null;

  const onChange = (event) => {
    const { value, name } = event.target;
    if (name === "scale") {
      selectedObject.scale(parseFloat(value)).setCoords();
    } else {
      selectedObject.set(name, parseInt(value)).setCoords();
    }
    canvas.requestRenderAll();
  };

  return (
    <div className="controls">
      <p>
        <label>
          <span>Angle:</span>
          <input
            type="range"
            name="angle"
            defaultValue={selectedObject.angle}
            onChange={onChange}
            min="0"
            max="360"
          />
        </label>
      </p>
      <p>
        <label>
          <span>Left:</span>
          <input
            type="range"
            name="left"
            defaultValue={selectedObject.left}
            onChange={onChange}
            min="0"
            max={canvas.width}
          />
        </label>
      </p>
      <p>
        <label>
          <span>Top:</span>
          <input
            type="range"
            name="top"
            defaultValue={selectedObject.top}
            onChange={onChange}
            min="0"
            max={canvas.height}
          />
        </label>
      </p>
      <p>
        <label>
          <span>Scale:</span>
          <input
            type="range"
            name="scale"
            defaultValue={selectedObject.scale}
            onChange={onChange}
            min="0.1"
            max="3"
            step="0.1"
          />
        </label>
      </p>
      <p>
        <label>
          <span>SkewX:</span>
          <input
            type="range"
            name="skewX"
            defaultValue={selectedObject.skewX}
            onChange={onChange}
            min="0"
            max="80"
            step="1"
          />
        </label>
      </p>
      <p>
        <label>
          <span>SkewY:</span>
          <input
            type="range"
            name="skewY"
            defaultValue={selectedObject.skewY}
            onChange={onChange}
            min="0"
            max="80"
            step="1"
          />
        </label>
      </p>
    </div>
  );
};

export default Controls;
