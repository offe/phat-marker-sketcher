import React, { useRef, useEffect, useCallback, useState } from "react";
import useResizeObserver from "./useResizeObserver";

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
  const intWidth = parseInt(width);
  const intHeight = parseInt(height - 4);

  if (canvas.width !== intWidth || canvas.height !== intHeight) {
    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext("2d");
    canvas.width = intWidth * ratio;
    canvas.height = intHeight * ratio;
    context.scale(ratio, ratio);
    console.log({
      intWidth,
      intHeight,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
    });

    return true;
  }

  return false;
}

const useCanvas = (draw, size) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    //let animationFrameId;

    console.log("useEffect in canvas");

    const render = () => {
      console.log("Render");
      console.log(new Date());
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
  }, [draw, size]);

  return canvasRef;
};

const MyCanvas = (props) => {
  const { draw, ...rest } = props;
  const [size, setSize] = useState({ width: 0, height: 0 });
  const canvasRef = useCanvas(draw, size);

  const onResize = useCallback((target) => {
    // Handle the resize event
    console.log("onResize callback");
    const width = target.clientWidth;
    const height = target.clientHeight;

    console.log({ width, height });
    debounce(() => setSize({ width, height }), 50)();
  }, []);

  const resizeObserverRef = useResizeObserver(onResize);

  return (
    <div
      style={{ width: "100%", height: "100%" /* TODO: Why, oh, why? */ }}
      ref={resizeObserverRef}
    >
      <canvas
        ref={canvasRef}
        size={size}
        {...rest}
        style={{ width: "100", height: "90" /* TODO: Why, oh, why? */ }}
      />
    </div>
  );
};

export default MyCanvas;
