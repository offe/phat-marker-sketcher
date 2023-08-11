import * as React from "react";
import { useContext, useState, useEffect } from "react";
import MyCanvas from "./MyCanvas";
import { drawSquiggleStrokeWord } from "./drawSquiggleStrokeWord";
import {
  ProjectContext,
  ProjectDispatchContext,
  UiStateContext,
} from "./ProjectContext";

const nextAvailableId = (thingsWithIds) => {
  const allIds = thingsWithIds.map(({ id }) => parseInt(id) || 0);
  const highest = Math.max(...[0, ...allIds]);
  const next = highest + 1;
  //console.log({ where: "nextAvailableId", allIds });
  //console.log(`nextAvailableId returns: ${next}`);
  return `${next}`;
};

export default function SketchArea() {
  const project = useContext(ProjectContext);
  const projectDispatch = useContext(ProjectDispatchContext);
  const { elements } = project.pages[0];
  const [mainState, _setMainState] = useState("idle");
  const [showsGrid, setShowsGrid] = useState(true);
  const {
    elementType,
    setElementType,
    selectedElementId,
    setSelectedElementId,
  } = useContext(UiStateContext);
  const setMainState = (newState) => {
    console.log(`mainState change: ${mainState} -> ${newState}`);
    _setMainState(newState);
  };

  const setElements = (elements) => {
    projectDispatch({
      type: "set-elements",
      elements,
    });
  };

  //const [selectedElementId, setSelectedElementId] = useState(undefined);
  const [mouseCoordinates, setMouseCoordinates] = useState({
    x: 100,
    y: 200,
  });
  const [mouseStartCoordinates, setMouseStartCoordinates] = useState({
    x: undefined,
    y: undefined,
  });
  const [drawingElementId, setDrawingElementId] = useState(undefined);
  const [indicatedHandleName, setIndicatedHandleName] = useState(undefined);
  const [resizingHandleName, setResizingHandleName] = useState(undefined);
  const [dragStartCoordinates, setDragStartCoordinates] = useState({
    x: undefined,
    y: undefined,
  });

  const pageWidth = 375;
  const pageHeight = 667;
  const columns = 12;
  const gutterRatio = 4;
  const gridSize = pageWidth / columns;

  useEffect(() => {
    const currentElement = elements.find(({ id }) => id === selectedElementId);
    if (currentElement !== undefined) {
      currentElement.type = elementType;
      setElements([...elements]);
    }
    // eslint-disable-next-line
  }, [elementType]);

  useEffect(() => {
    const currentElement = elements.find(({ id }) => id === selectedElementId);
    if (currentElement !== undefined) {
      setElementType(currentElement.type);
    }
    // eslint-disable-next-line
  }, [selectedElementId]);

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

    if (showsGrid) {
      ctx.fillStyle = gridDotColor;
      for (let y = -1; y < ctx.canvas.height / gridSize; y++) {
        for (let x = -1; x < ctx.canvas.width / gridSize; x++) {
          ctx.fillRect(gridSize * x - 1, gridSize * y - 1, 2, 2);
        }
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

      setIndicatedHandleName(undefined);
      // Corner and edge handles
      const handles = [
        { name: "top-left", y: top, x: left },
        { name: "top-right", y: top, x: right },
        { name: "bottom-right", y: bottom, x: right },
        { name: "bottom-left", y: bottom, x: left },
        { name: "top", y: top, x: (left + right) / 2, w: 2 },
        { name: "right", y: (top + bottom) / 2, x: right, h: 2 },
        { name: "bottom", y: bottom, x: (right + left) / 2, w: 2 },
        { name: "left", y: (top + bottom) / 2, x: left, h: 2 },
      ];

      function drawHandle(
        handleName,
        elementWidth,
        elementHeight
        /*
        elementHeight,
        handleSizeY,
        elementWidth,
        handleSizeX,
        x,
        y,
        handleName
        */
      ) {
        const {
          x,
          y,
          h: handleSizeY = 1,
          w: handleSizeX = 1,
        } = handles.find(({ name }) => name === handleName);
        const correctedHandleHeight =
          elementHeight === 1 ? Math.min(handleSizeY, 1.5) : handleSizeY;
        const correctedHandleWidth =
          elementWidth === 1 ? Math.min(handleSizeX, 1.5) : handleSizeX;
        ctx.beginPath();
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
        if (handleDistance === 0 || handleName === resizingHandleName) {
          ctx.fillStyle = handleColor;
          setIndicatedHandleName(handleName);
        } else {
          ctx.fillStyle = screenColor;
        }
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = handleColor;
        ctx.stroke();
      }

      for (const handleName of handles
        .map(({ name }) => name)
        .filter((name) => name !== resizingHandleName)) {
        drawHandle(handleName, width, height);
      }
      // Draw the
      if (resizingHandleName) {
        drawHandle(resizingHandleName, width, height);
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

  const elementAt = (canvasCoordinates) => {
    //const { x, y } = canvasCoordinates;
    if (elements.length === 0) {
      return undefined;
    }
    const gridCoordinates = mouseToGridCoordinates(canvasCoordinates); //{ x: x / gridSize - 1.5, y: y / gridSize - 1.5 };
    const { distance: closestDistance, element: closestElement } =
      elements.reduce((closest, element) => {
        //console.log(closest, id, rectangle);
        const distance = distanceToEdge(element.rectangle, gridCoordinates);
        if (closest === undefined || distance < closest.distance) {
          return { distance, element };
        }
        return closest;
      }, undefined);
    if (closestDistance <= 0.6) {
      return closestElement;
    }
    return undefined;
  };

  const selectElementAt = (canvasCoordinates) => {
    const element = elementAt(canvasCoordinates);
    setSelectedElementId(element?.id);
    if (element === undefined) {
      setMainState("idle");
    } else {
      setMainState("selected");
      setElementType(element.type);
    }
  };

  const eventListeners = {
    mousemove: (mouseEvent, canvasCoordinates) => {
      setMouseCoordinates(canvasCoordinates);
      switch (mainState) {
        case "started":
          const distance = distanceToPoint(
            canvasCoordinates,
            mouseStartCoordinates
          );
          //console.log({ distance });
          if (distance > 10) {
            setMainState("drawing");
            setSelectedElementId(undefined);
            const { x: sx, y: sy } = mouseToGridCoordinates(
              mouseStartCoordinates
            );
            const { x: cx, y: cy } = mouseToGridCoordinates(canvasCoordinates);
            const top = Math.round(Math.min(sy, cy));
            const left = Math.round(Math.min(sx, cx));
            const bottom = Math.round(Math.max(sy, cy));
            const right = Math.round(Math.max(sx, cx));
            const newId = nextAvailableId(elements);
            setDrawingElementId(newId);
            setElements([
              ...elements,
              {
                id: newId,
                type: elementType,
                rectangle: [left, top, right - left, bottom - top],
                description: [],
              },
            ]);
          }
          break;
        case "drawing":
          {
            const { x: sx, y: sy } = mouseToGridCoordinates(
              mouseStartCoordinates
            );
            const { x: cx, y: cy } = mouseToGridCoordinates(canvasCoordinates);
            const drawingElement = elements.find(
              ({ id }) => id === drawingElementId
            );
            if (drawingElement === undefined) {
              throw new Error("Can't find the drawn element!");
            }
            const top = Math.round(Math.min(sy, cy));
            const left = Math.round(Math.min(sx, cx));
            const bottom = Math.round(Math.max(sy, cy));
            const right = Math.round(Math.max(sx, cx));
            drawingElement.rectangle = [left, top, right - left, bottom - top];
            setElements([...elements]);
          }
          break;
        case "dragging":
          {
            const { x: sx, y: sy } = mouseToGridCoordinates(
              mouseStartCoordinates
            );
            const { x: cx, y: cy } = mouseToGridCoordinates(canvasCoordinates);
            const selectedElement = elements.find(
              ({ id }) => id === selectedElementId
            );
            if (selectedElement === undefined) {
              throw new Error("Can't find the dragged element!");
            }
            var [dragX, dragY, dragW, dragH] = dragStartCoordinates;
            dragX += Math.round(cx - sx);
            dragY += Math.round(cy - sy);
            /*const top = Math.round(Math.min(sy, cy));
            const left = Math.round(Math.min(sx, cx));
            const bottom = Math.round(Math.max(sy, cy));
            const right = Math.round(Math.max(sx, cx));*/
            selectedElement.rectangle = [dragX, dragY, dragW, dragH];
            setElements([...elements]);
          }
          break;
        case "resizing":
          {
            const { x: cx, y: cy } = mouseToGridCoordinates(canvasCoordinates);
            const selectedElement = elements.find(
              ({ id }) => id === selectedElementId
            );
            if (selectedElement === undefined) {
              throw new Error("Can't find the resizing element!");
            }
            const [x, y, w, h] = selectedElement.rectangle;
            var [nx, ny, nw, nh] = [x, y, w, h];
            if (resizingHandleName.includes("left")) {
              nw = Math.max(Math.round(w - cx + x), 0);
              nx = Math.round(x + w - nw);
            }
            if (resizingHandleName.includes("right")) {
              nw = Math.max(Math.round(cx - x), 0);
            }
            if (resizingHandleName.includes("top")) {
              nh = Math.max(Math.round(h - cy + y), 0);
              ny = Math.round(y + h - nh);
            }
            if (resizingHandleName.includes("bottom")) {
              nh = Math.max(Math.round(cy - y), 0);
            }
            /*
            const top = Math.round(Math.min(y, y + h));
            const left = Math.round(Math.min(x, x + w));
            const bottom = Math.round(Math.max(y, y + h));
            const right = Math.round(Math.max(x, x + w));
            */

            //selectedElement.rectangle = [left, top, right - left, bottom - top];
            selectedElement.rectangle = [nx, ny, nw, nh];
            setElements([...elements]);
          }

          break;
        default:
          break;
      }
    },
    mousedown: (mouseEvent, canvasCoordinates) => {
      /*console.log({
        where: "mousedown",
        mainState,
        mouseEvent,
        canvasCoordinates,
      });*/
      //console.log(mouseEvent);
      //console.log("mousedown");
      setMouseStartCoordinates(canvasCoordinates);
      switch (mainState) {
        case "idle":
          setMainState("started");
          break;
        case "selected":
          if (indicatedHandleName !== undefined) {
            setMainState("resizing");
            setResizingHandleName(indicatedHandleName);
          } else if (elementAt(canvasCoordinates)?.id === selectedElementId) {
            setMainState("dragging");
            setDragStartCoordinates(
              elements.find(({ id }) => id === selectedElementId).rectangle
            );
          } else {
            setMainState("started");
          }
          break;
        default:
          break;
      }
    },
    mouseup: (mouseEvent, canvasCoordinates) => {
      /*console.log({
        where: "mouseup",
        mainState,
        mouseEvent,
        canvasCoordinates,
      });*/
      //console.log("mouseup");

      switch (mainState) {
        case "started":
          selectElementAt(canvasCoordinates);
          break;
        case "drawing":
          setSelectedElementId(drawingElementId);
          setMainState("selected");
          break;
        case "resizing":
          setMainState("selected");
          setResizingHandleName(undefined);
          break;
        case "dragging":
          setMainState("selected");
          break;
        default:
          break;
      }
    },
    mouseout: (mouseEvent, canvasCoordinates) => {
      /*console.log({
        where: "mouseout",
        mainState,
        mouseEvent,
        canvasCoordinates,
      });*/
      setMouseCoordinates({ x: undefined, y: undefined });
    },
    keydown: (keyEvent) => {
      /*console.log({
        type: "keydown",
        mainState,
        keyCode: keyEvent.code,
        keyEvent,
      });*/
      switch (keyEvent.code) {
        case "KeyG": {
          //console.log("KeyG");
          setShowsGrid(!showsGrid);
          break;
        }
        default:
          break;
      }
      switch (mainState) {
        case "idle":
          switch (keyEvent.code) {
            case "Tab":
              //console.log("Tab in idle");
              if (elements.length > 0) {
                setSelectedElementId(elements[0].id);
                setMainState("selected");
              }
              break;
            case "KeyA": {
              //console.log("KeyA");
              setElements([
                ...elements,
                {
                  id: nextAvailableId(elements),
                  type: "box",
                  rectangle: [1, 1, 1, 1],
                  description: [],
                },
              ]);
              break;
            }
            default:
              break;
          }
          break;
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
              //console.log("Tab in selected");
              const currentIndex = elements.findIndex(
                ({ id }) => id === selectedElementId
              );
              const nextIndex =
                (currentIndex +
                  (keyEvent.shiftKey ? -1 : 1) +
                  elements.length) %
                elements.length;
              setSelectedElementId(elements[nextIndex].id);
              break;
            case "ArrowRight":
            case "ArrowLeft": {
              const xOffset = keyEvent.code === "ArrowRight" ? 1 : -1;
              const selectedElement = elements.find(
                ({ id }) => id === selectedElementId
              );
              if (!keyEvent.shiftKey) {
                selectedElement.rectangle[0] += xOffset;
              } else {
                selectedElement.rectangle[2] = Math.max(
                  selectedElement.rectangle[2] + xOffset,
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
            case "KeyT": {
              const currentElement = elements.find(
                ({ id }) => id === selectedElementId
              );
              currentElement.type =
                currentElement.type === "box" ? "text" : "box";
              setElements([...elements]);
              setElementType(currentElement.type);
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
