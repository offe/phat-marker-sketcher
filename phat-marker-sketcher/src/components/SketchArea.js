import * as React from "react";
import { useState, useEffect } from "react";
import MyCanvas from "./MyCanvas";

const drawSquiggleStrokeWord = function (ctx, lineWidth, strokeStyle) {
  ctx.save();

  /*
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(109.65317, 0);
  ctx.lineTo(109.65317, 31.029236);
  ctx.lineTo(0, 31.029236);
  ctx.closePath();
  ctx.clip();
  ctx.translate(0, 0);
  ctx.translate(0, 0);
  ctx.scale(1, 1);
  ctx.translate(0, 0);

  //ctx.strokeStyle = "rgba(0,0,0,0)";
  //ctx.lineCap = "rounded";
  //ctx.lineJoin = "rounded";
  */
  ctx.miterLimit = 4;
  ctx.save();
  ctx.translate(-878.36032, -93.527492);
  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(983.33203, 114.75586);
  ctx.bezierCurveTo(
    981.4511600000001,
    113.39038,
    980.16659,
    111.14272,
    980.29348,
    108.78252
  );
  ctx.bezierCurveTo(
    980.34518,
    106.96336000000001,
    981.03431,
    105.04846,
    980.31248,
    103.28906
  );
  ctx.bezierCurveTo(
    980.06014,
    102.8512,
    979.50905,
    103.63193000000001,
    979.15785,
    103.76062
  );
  ctx.bezierCurveTo(
    976.61355,
    105.72552,
    974.5816900000001,
    108.25226,
    972.2504,
    110.45118000000001
  );
  ctx.bezierCurveTo(
    970.79567,
    111.81481000000001,
    969.32206,
    113.25450000000001,
    967.51365,
    114.13086000000001
  );
  ctx.bezierCurveTo(
    964.87816,
    115.1924,
    961.73804,
    113.43867000000002,
    960.88865,
    110.80859000000001
  );
  ctx.bezierCurveTo(
    959.84788,
    108.31110000000001,
    960.41594,
    105.54757000000001,
    959.8713,
    102.96234000000001
  );
  ctx.bezierCurveTo(
    959.7728000000001,
    102.33785000000002,
    959.71687,
    101.69373000000002,
    959.2031000000001,
    101.60742000000002
  );
  ctx.bezierCurveTo(
    958.2737400000001,
    101.62262000000001,
    957.2655100000001,
    103.46082000000001,
    956.28615,
    104.36940000000001
  );
  ctx.bezierCurveTo(
    952.61386,
    108.29689000000002,
    949.51471,
    110.78962000000001,
    945.37107,
    114.25781
  );
  ctx.bezierCurveTo(
    943.7892800000001,
    115.46314000000001,
    941.33209,
    115.56320000000001,
    939.8906000000001,
    114.07422000000001
  );
  ctx.bezierCurveTo(
    938.30014,
    112.53523000000001,
    937.9093700000001,
    112.25988000000001,
    937.2324000000001,
    110.24414000000002
  );
  ctx.bezierCurveTo(
    936.4358100000001,
    107.48881000000002,
    936.1863500000001,
    103.17129000000001,
    934.6889800000001,
    100.67853000000002
  );
  ctx.bezierCurveTo(
    934.1990600000001,
    100.39412000000003,
    933.8342600000001,
    100.48339000000003,
    933.4475000000001,
    100.66953000000002
  );
  ctx.bezierCurveTo(
    930.6668700000001,
    103.15961000000003,
    928.3386900000002,
    108.10305000000002,
    925.6086300000001,
    110.64584000000002
  );
  ctx.bezierCurveTo(
    924.5206400000001,
    111.67441000000002,
    923.31637,
    112.82969000000003,
    921.74607,
    112.93318000000002
  );
  ctx.bezierCurveTo(
    919.80586,
    113.20144000000002,
    918.1383500000001,
    111.65693000000002,
    917.39842,
    109.98982000000002
  );
  ctx.bezierCurveTo(
    916.01103,
    107.30989000000002,
    915.17402,
    104.34573000000002,
    914.92898,
    101.34343000000003
  );
  ctx.bezierCurveTo(
    914.6778800000001,
    100.47314000000003,
    914.19505,
    99.22462000000003,
    913.42771,
    99.05818400000003
  );
  ctx.bezierCurveTo(
    912.41796,
    99.07156400000002,
    911.0081200000001,
    100.52755000000002,
    910.11185,
    102.00844000000002
  );
  ctx.bezierCurveTo(
    908.92236,
    104.10026000000002,
    906.27773,
    110.84490000000002,
    903.77171,
    112.62391000000002
  );
  ctx.bezierCurveTo(
    902.69612,
    113.33068000000003,
    901.32719,
    113.51909000000002,
    900.12303,
    113.05428000000002
  );
  ctx.bezierCurveTo(
    898.6258,
    112.71232000000002,
    897.83386,
    107.24275000000002,
    897.5023199999999,
    105.86040000000003
  );
  ctx.bezierCurveTo(
    896.3418899999999,
    102.22718000000003,
    896.09015,
    97.79125900000003,
    894.91085,
    97.54347900000002
  );
  ctx.bezierCurveTo(
    893.02953,
    97.61998900000002,
    892.6630299999999,
    101.41759000000002,
    891.3858,
    103.38528000000002
  );
  ctx.bezierCurveTo(
    889.24593,
    106.91469000000002,
    887.21669,
    110.57664000000003,
    885.2233,
    114.25971000000003
  );
  ctx.stroke();
  ctx.restore();
  ctx.restore();
  ctx.restore();
};

const nextAvailableId = (thingsWithIds) => {
  const highest = Math.max(...thingsWithIds.map(({ id }) => parseInt(id) || 0));
  return highest + 1;
};

export default function SketchArea() {
  const [elements, setElements] = useState([
    { id: "1", type: "box", rectangle: [2, 4, 8, 4] },
    { id: "3", type: "box", rectangle: [2, 8, 8, 4] },
    { id: "4", type: "box", rectangle: [3, 6, 6, 5] },
    { id: "5", type: "box", rectangle: [2, 13, 4, 0] },
    { id: "6", type: "text", rectangle: [2, 1, 8, 1] },
    { id: "8", type: "text", rectangle: [2, 2, 8, 2] },
    { id: "9", type: "box", rectangle: [2, 14, 1, 2] },
  ]);

  /*
  https://stately.ai/viz

import { createMachine} from 'xstate';

const fetchMachine = createMachine({
  id: 'fetch',
  initial: 'idle',
  states: {
    idle: {
      on: {
        MOUSEDOWN: 'started'
      }
    },
    started: {
      on: {
        MOUSEUP_HIT: 'selected',
        MOUSEUP_MISS: 'idle',
        MOUSEMOVE_OVER_THRESHOLD: 'drawing'
      }
    },
    selected: {
      on: {
        MOUSEDOWN_HIT_HANDLE: 'resizing',
        MOUSEUP_HIT: 'selected',
        MOUSEUP_MISS: 'idle',
      }
    },
    drawing: {
      on: {
        MOUSEUP: 'selected'
      }
    },
    resizing: {
      on: {
        MOUSEUP: 'selected'
      }
    },
  }
});
  */

  const [mainState, _setMainState] = useState("idle");
  const setMainState = (newState) => {
    if (
      ["idle", "started", "selected", "drawing", "resizing"].includes(newState)
    ) {
      console.log(`MAIN STATE TRANSITION: ${mainState} -> ${newState}`);
      _setMainState(newState);
    } else {
      throw new Error(`Invalid state: ${newState}`);
    }
  };

  const [selectedElementId, setSelectedElementId] = useState(undefined);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: 100,
    y: 200,
  });
  const [mouseStartCoordinates, setMouseStartCoordinates] = useState({
    x: undefined,
    y: undefined,
  });

  const pageWidth = 375;
  const pageHeight = 667;
  const columns = 12;
  const gutterRatio = 4;
  const gridSize = pageWidth / columns;

  const draw = (ctx, frameCount) => {
    //console.log("draw called");
    const handleSize = 10;
    const handleColor = "#1976d2";
    const screenColor = "#ffffff";
    const outsideColor = "#e8e8f0";
    const belowTheFoldColor = "#f8f8f8";
    const gridDotColor = "#d0d0d0";
    const markerLineWidth = 6;
    const strokeStyle = "rgba(0, 0, 0, 0.8)";

    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = outsideColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    const originX = 1.5 * gridSize;
    const originY = 1.5 * gridSize;
    ctx.translate(originX, originY);
    ctx.fillStyle = screenColor;
    ctx.fillRect(0, 0, pageWidth, pageHeight);
    ctx.fillStyle = belowTheFoldColor;
    ctx.fillRect(0, pageHeight, pageWidth, ctx.canvas.height - pageHeight);

    /*
    // Draw border for testing
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = "6";
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.stroke();
    */

    ctx.fillStyle = gridDotColor;
    for (let y = -1; y < ctx.canvas.height / gridSize; y++) {
      for (let x = -1; x < ctx.canvas.width / gridSize; x++) {
        ctx.fillRect(gridSize * x, gridSize * y, 2, 2);
      }
    }

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = markerLineWidth;
    ctx.lineCap = "rounded";
    //ctx.rect(gridSize * 3.5, gridSize * 4.5, gridSize * 15, gridSize * 10);
    for (const element of elements) {
      const {
        rectangle: [left, top, width, height],
      } = element;
      switch (element.type) {
        case "box":
          ctx.beginPath();
          ctx.roundRect(
            gridSize * (left + 0.5 / gutterRatio),
            gridSize * (top + 0.5 / gutterRatio),
            gridSize * (width - 1 / gutterRatio),
            gridSize * (height - 1 / gutterRatio),
            6
          );
          ctx.stroke();
          break;
        case "text":
          ctx.save();
          ctx.translate(
            left * gridSize,
            top * gridSize + height * 0.1 * gridSize
          );
          //drawSquiggleWord(ctx);
          ctx.scale(height, height);
          drawSquiggleStrokeWord(ctx, markerLineWidth / height, strokeStyle);
          ctx.restore();
          break;
        default:
          console.log(`Unknown element type: ${element.type}`);
          break;
      }
    }

    const selectedElement = elements.find(({ id }) => id === selectedElementId);
    if (selectedElement !== undefined) {
      const {
        rectangle: [left, top, width, height],
      } = selectedElement;
      const right = left + width;
      const bottom = top + height;

      ctx.save();

      // Rectangle
      ctx.strokeStyle = handleColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(
        gridSize * left,
        gridSize * top,
        gridSize * width,
        gridSize * height,
        6
      );
      ctx.stroke();

      // Corner and edge handles
      for (const { x, y, w = 1, h = 1 } of [
        { y: top, x: left },
        { y: top, x: right },
        { y: bottom, x: right },
        { y: bottom, x: left },
        { y: top, x: (left + right) / 2, w: 2 },
        { y: (top + bottom) / 2, x: right, h: 2 },
        { y: bottom, x: (right + left) / 2, w: 2 },
        { y: (top + bottom) / 2, x: left, h: 2 },
      ]) {
        const correctedHandleHeight = height === 1 ? Math.min(h, 1.5) : h;
        const correctedHandleWidth = width === 1 ? Math.min(w, 1.5) : w;
        ctx.beginPath();
        /*
        ctx.arc(
          gridSize * x,
          gridSize * y,
          handleSize / 2,
          0,
          2 * Math.PI,
          false
        );
        */
        const [handleLeft, handleTop, handleWidth, handleHeight] = [
          gridSize * x - correctedHandleWidth * (handleSize / 2),
          gridSize * y - correctedHandleHeight * (handleSize / 2),
          handleSize * correctedHandleWidth,
          handleSize * correctedHandleHeight,
        ];
        ctx.roundRect(handleLeft, handleTop, handleWidth, handleHeight, 6);
        const handleDistance = distanceToRectangle(
          [handleLeft, handleTop, handleWidth, handleHeight],
          { x: mouseCoordinates.x - originX, y: mouseCoordinates.y - originY }
        );
        if (handleDistance === 0) {
          ctx.fillStyle = handleColor;
        } else {
          ctx.fillStyle = screenColor;
        }
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = handleColor;
        ctx.stroke();
      }

      ctx.restore();
    }
    ctx.restore();
    /*
    if (mouseCoordinates.x !== undefined) {
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mouseCoordinates.y);
      ctx.lineTo(ctx.canvas.width, mouseCoordinates.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseCoordinates.x, 0);
      ctx.lineTo(mouseCoordinates.x, ctx.canvas.height);
      ctx.stroke();
    }
    */
  };

  function distanceToPoint(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function distanceToRectangle(rect, p) {
    const [left, top, width, height] = rect;
    const right = left + width;
    const bottom = top + height;

    const dx = Math.max(left - p.x, 0, p.x - right);
    const dy = Math.max(top - p.y, 0, p.y - bottom);
    return Math.sqrt(dx * dx + dy * dy);
  }

  function distanceToEdge(rect, p) {
    // This measures to the edges, i.e. you get a distance even within the rect
    // To make the selection nice, the distance inside a rect counts as a little bit less.
    // This makes it so if you have two rects with a common edge, a point being inside one of them will be closer to the rect it's inside.
    const dist = distanceToRectangle(rect, p);
    if (dist > 0) {
      return dist;
    }
    const [left, top, width, height] = rect;
    const right = left + width;
    const bottom = top + height;
    const { x, y } = p;
    return 0.99 * Math.min(x - left, right - x, y - top, bottom - y);
  }

  const mouseToGridCoordinates = (p) => {
    const { x, y } = p;
    return { x: x / gridSize - 1.5, y: y / gridSize - 1.5 };
  };

  const selectElementAt = (canvasCoordinates) => {
    //const { x, y } = canvasCoordinates;
    if (elements.length === 0) {
      setMainState("idle");
      return;
    }
    const gridCoordinates = mouseToGridCoordinates(canvasCoordinates); //{ x: x / gridSize - 1.5, y: y / gridSize - 1.5 };
    const { distance: closestDistance, id: closestElementId } = elements.reduce(
      (closest, { id, rectangle }) => {
        //console.log(closest, id, rectangle);
        const distance = distanceToEdge(rectangle, gridCoordinates);
        if (closest === undefined || distance < closest.distance) {
          return { distance, id };
        }
        return closest;
      },
      undefined
    );
    if (closestDistance <= 1) {
      setSelectedElementId(closestElementId);
      setMainState("selected");
    } else {
      setSelectedElementId(undefined);
      setMainState("idle");
    }
  };

  // Lägg till så man kan dra ut nya boxar. Pajja resten, börja direkt på mousedown tills mouseup

  const eventListeners = {
    mousemove: (mouseEvent, canvasCoordinates) => {
      console.log({ where: "mousemove", mouseEvent, canvasCoordinates });
      setMouseCoordinates(canvasCoordinates);
      //console.log("After mousemove");
      //console.log({ selectedElementId });
      switch (mainState) {
        case "started":
          const distance = distanceToPoint(
            canvasCoordinates,
            mouseStartCoordinates
          );
          //console.log({ distance });
          if (distance > 10) {
            setMainState("drawing");
            const { x: sx, y: sy } = mouseToGridCoordinates(
              mouseStartCoordinates
            );
            const { x: cx, y: cy } = mouseToGridCoordinates(canvasCoordinates);
            const top = Math.round(Math.min(sy, cy));
            const left = Math.round(Math.min(sx, cx));
            const bottom = Math.round(Math.max(sy, cy));
            const right = Math.round(Math.max(sx, cx));
            setElements([
              ...elements,
              {
                id: nextAvailableId(elements),
                type: "box",
                rectangle: [left, top, right - left, bottom - top],
              },
            ]);
          }
          break;
        case "drawing":
          const { x: sx, y: sy } = mouseToGridCoordinates(
            mouseStartCoordinates
          );
          const { x: cx, y: cy } = mouseToGridCoordinates(canvasCoordinates);
          const lastElement = elements[elements.length - 1];
          const top = Math.round(Math.min(sy, cy));
          const left = Math.round(Math.min(sx, cx));
          const bottom = Math.round(Math.max(sy, cy));
          const right = Math.round(Math.max(sx, cx));
          lastElement.rectangle = [left, top, right - left, bottom - top];
          setElements([...elements]);

          break;
        default:
          break;
      }
    },
    mousedown: (mouseEvent, canvasCoordinates) => {
      console.log({ where: "mousedown", mouseEvent, canvasCoordinates });
      setMouseStartCoordinates(canvasCoordinates);
      setMainState("started");
      //console.log("After mousemove");
      //console.log({ selectedElementId });
    },
    mouseup: (mouseEvent, canvasCoordinates) => {
      console.log({ where: "mouseup", mouseEvent, canvasCoordinates });

      //setMouseCoordinates(canvasCoordinates);
      //console.log({ mainState });
      switch (mainState) {
        case "started":
          selectElementAt(canvasCoordinates);
          break;
        case "drawing":
          setSelectedElementId(elements[elements.length - 1].id);
          setMainState("selected");
          break;
        default:
          break;
      }
      /*
      if (selectedElementId === undefined) {
        selectElementAt(canvasCoordinates);
      } else {
        const hoveredHandle = getHoveredHandle(element.rectangle, canvasCoordinates);
        if (hoveredHandle === undefined) {
          selectElementAt(canvasCoordinates);
        } else {
          setSelectedHandle(hoveredHandle);
        }
      }
      */
    },
    mouseout: (mouseEvent, canvasCoordinates) => {
      console.log({ where: "mouseout", mouseEvent, canvasCoordinates });
      setMouseCoordinates({ x: undefined, y: undefined });
    },
    keydown: (keyEvent) => {
      console.log({ type: "keydown", keyCode: keyEvent.code, keyEvent });
      console.log({ type: "keydown" });
      switch (mainState) {
        case "selected":
          switch (keyEvent.code) {
            case "Backspace":
              setElements([
                ...elements.filter(({ id }) => id !== selectedElementId),
              ]);
              setSelectedElementId(undefined);
              setMainState("idle");
              break;
            case "Tab":
              const currentIndex = elements.findIndex(
                ({ id }) => id === selectedElementId
              );
              const nextIndex =
                (currentIndex +
                  (keyEvent.shiftKey ? -1 : 1) +
                  elements.length) %
                elements.length;
              console.log({ currentIndex, nextIndex });
              setSelectedElementId(elements[nextIndex].id);
              break;
            case "ArrowRight":
            case "ArrowLeft": {
              const xOffset = keyEvent.code === "ArrowRight" ? 1 : -1;
              const currentElement = elements.find(
                ({ id }) => id === selectedElementId
              );
              if (!keyEvent.shiftKey) {
                currentElement.rectangle[0] += xOffset;
              } else {
                currentElement.rectangle[2] = Math.max(
                  currentElement.rectangle[2] + xOffset,
                  0
                );
              }
              setElements([...elements]);
              break;
            }
            case "ArrowUp":
            case "ArrowDown": {
              const yOffset = keyEvent.code === "ArrowDown" ? 1 : -1;
              const currentElement = elements.find(
                ({ id }) => id === selectedElementId
              );
              if (!keyEvent.shiftKey) {
                currentElement.rectangle[1] += yOffset;
              } else {
                currentElement.rectangle[3] = Math.max(
                  currentElement.rectangle[3] + yOffset,
                  0
                );
              }
              setElements([...elements]);
              break;
            }
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
  };

  return <MyCanvas draw={draw} eventListeners={eventListeners} />;
}
