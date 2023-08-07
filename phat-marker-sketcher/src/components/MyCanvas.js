import React, { useRef, useEffect, useCallback, useState } from "react";
import useResizeObserver from "./useResizeObserver";
import styles from "../styles.module.css";

/* We should use some throttle here instead. We don't want to draw for every change, but we also don't want to wait until the resizing has stopped. 
We'd like to redraw every 20ms while the resize is continuing (and also when it's stopped). */
let timer = undefined;
function debounce(f, delay) {
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => f.apply(this, args), delay);
  };
}

function resizeCanvasToDisplaySize(canvas, size) {
  const { width, height } = size; //canvas.getBoundingClientRect();
  //const { width, height } = canvas.getBoundingClientRect();
  //const width = canvas.clientWidth;
  //const height = canvas.clientHeight;

  //const intWidth = parseInt(width);
  //const intHeight = parseInt(height - 3);

  const { devicePixelRatio: ratio = 1 } = window;
  //if (canvas.width !== width || Math.abs(canvas.height - height) > 10) {
  if (canvas.width !== width || canvas.height !== height) {
    //console.log({ ratio });
    //console.log({ diff: height - canvas.height });
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.scale(ratio, ratio);
    /*console.log({
      width,
      height,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
    });
    */

    return true;
  }

  return false;
}

const useCanvas = (draw, size, canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    //let animationFrameId;

    //console.log("useEffect in canvas - redrawing");

    const render = () => {
      //console.log("Render");
      //console.log(new Date());
      frameCount++;
      resizeCanvasToDisplaySize(canvas, size);
      context.save();
      draw(context, frameCount);
      context.restore();
      //animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    //render();

    return () => {
      //window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, size, canvasRef]);

  return canvasRef;
};

const MyCanvas = (props) => {
  const { draw, eventListeners, ...rest } = props;
  const [size, setSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef();
  useCanvas(draw, size, canvasRef);

  const onResize = useCallback((target, resizeEntry) => {
    //console.log({ resizeEntry });
    //console.log({ box: resizeEntry.devicePixelContentBoxSize[0] });
    const height = resizeEntry.devicePixelContentBoxSize[0].blockSize;
    const width = resizeEntry.devicePixelContentBoxSize[0].inlineSize;
    console.log("onResize callback");
    //const width = target.clientWidth;
    //const height = target.clientHeight;

    //console.log({ width, height });
    debounce(() => setSize({ width, height }), 50)();
  }, []);

  useResizeObserver(onResize, canvasRef);

  const handleMouseEvent = (type, event) => {
    const currentCanvas = canvasRef.current;
    const rect = currentCanvas.getBoundingClientRect();
    const canvasCoordinates = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const listener = eventListeners[type];
    if (listener !== undefined) {
      listener(event, canvasCoordinates);
    }
  };

  const handleKeyEvent = (type, event) => {
    const listener = eventListeners[type];
    if (listener !== undefined) {
      listener(event);
    }
    event.preventDefault();
  };

  return (
    <canvas
      ref={canvasRef}
      {...rest}
      className={styles.canvas}
      onMouseDown={(event) => {
        //eventListeners.mousedown(e);
        handleMouseEvent("mousedown", event);
      }}
      onMouseMove={(event) => {
        handleMouseEvent("mousemove", event);
      }}
      onMouseUp={(event) => {
        handleMouseEvent("mouseup", event);
      }}
      onMouseOut={(event) => {
        handleMouseEvent("mouseout", event);
      }}
      tabIndex={0}
      onKeyUp={(event) => handleKeyEvent("keyup", event)}
      onKeyDown={(event) => handleKeyEvent("keydown", event)}
    />
  );
};

export default MyCanvas;
