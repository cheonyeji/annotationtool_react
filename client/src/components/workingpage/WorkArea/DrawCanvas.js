import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import CurrentContext from "../../../store/currentContext";
import FileContext from "../../../store/fileContext";
function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.5)"
    );
  }
  throw new Error("Bad Hex");
}
function DrawCanvas(props) {
  const currentCtx = useContext(CurrentContext);
  const fileCtx = useContext(FileContext);
  const fileIndex = fileCtx.findIndex(currentCtx.filename);

  let canvas,
    ctx,
    rect = {},
    drag = false;
  let canvasRef = useRef();
  let index = 0;
  let rectArr = [];
  let rectTest = [];

  const collides = (rects, x, y) => {
    let isCollision = false;
    let left, right, top, bottom;
    rects.map((rect) => {
      for (let i in Object.keys(rect)) {
        if (rect[i].sx <= rect[i].ex) {
          left = rect[i].sx;
        } else {
          left = rect[i].ex;
        }
        if (rect[i].sy <= rect[i].ey) {
          top = rect[i].sy;
        } else {
          top = rect[i].ey;
        }
        right = left + Math.abs(rect[i].w);
        bottom = top + Math.abs(rect[i].h);
        if (right >= x && (left <= x) & (bottom >= y) && top <= y) {
          isCollision = rect[i];
        }
      }
    });
    return isCollision;
  };

  const fillRect = (sx, sy, w, h, color) => {
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    ctx.fillRect(sx, sy, w, h);
  };

  const drawRect = (sx, sy, w, h, color) => {
    ctx.setLineDash([]);
    ctx.strokeStyle = color;
    ctx.strokeRect(sx, sy, w, h);
    ctx.fillStyle = "transparent";
    ctx.fillRect(sx, sy, w, h);
  };
  const drawAllRect = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectTest.map((data) => {
      for (let i in Object.keys(data)) {
        drawRect(data[i].sx, data[i].sy, data[i].w, data[i].h, data[i].color);
      }
    });
  };

  const mouseDown = (e) => {
    rect.startX = e.offsetX;
    rect.startY = e.offsetY;
    drag = true;
  };

  const mouseUp = (e) => {
    if (e.offsetX >= 600) {
      rect.endX = 600;
    } else {
      rect.endX = e.offsetX;
    }
    if (e.offsetY >= 600) {
      rect.endY = 600;
    } else {
      rect.endY = e.offsetY;
    }

    //바깥영역만 단순히 mouseUp한 경우 제외
    if (rect.startX !== undefined && rect.startY !== undefined) {
      if (rect.w !== undefined && rect.h !== undefined) {
        ctx.strokeStyle = "#BFFF00";
        ctx.setLineDash([]);
        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
        rectArr.push(rect);
        currentCtx.updateRectInfo({
          id: index,
          sx: rect.startX,
          sy: rect.startY,
          ex: rect.endX,
          ey: rect.endY,
          w: rect.w,
          h: rect.h,
          label: "none",
          color: "#888888",
        });
        index++;
      }
      // 단순한 클릭. 유저가 사각형을 그리려고 한 것이 아닐것
      else {
      }
      rect = {};
      drag = false;
    }
  };
  const mouseMove = (e) => {
    if (drag) {
      // if (rectArr.length !== 0) drawAllRect();
      rect.w = e.offsetX - rect.startX;
      rect.h = e.offsetY - rect.startY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
    }
  };
  const draw = () => {
    ctx.setLineDash([6]);
    ctx.fillStyle = "rgba(219, 255, 121, 0.2)";
    ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
    ctx.strokeStyle = "#BFFF00";
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
  };

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);
  }, []);

  useEffect(() => {
    var clickedRectId = -1;
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mouseup", (e) => {
      var rect = collides(rectTest, e.offsetX, e.offsetY);
      if (rect) {
        clickedRectId = rect.id;
        console.log(clickedRectId, "번 사각형 클릭됨");
        drawAllRect();
        fillRect(rect.sx, rect.sy, rect.w, rect.h, hexToRgbA(rect.color));
      }
    });
  }, [currentCtx.rectInfo]);

  // saturation (바깥영역 클릭)
  useEffect(() => {
    function handlerClickOutside(event) {
      if (canvasRef.current && !canvasRef.current.contains(event.target)) {
        mouseUp(event);
      }
    }
    document.addEventListener("mouseup", handlerClickOutside);
    return () => {
      document.removeEventListener("mouseUp", handlerClickOutside);
    };
  }, [canvasRef]);

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectTest = [];
    rectTest.push(currentCtx.rectInfo);
    drawAllRect();
  }, [currentCtx.filename]);

  useEffect(() => {
    // currentCtx에서 꺼내지 말고 계속 fileCtx에도 넣어줘야겠다, dependency 잘 체크하기(값 들어가도록)
    fileCtx.modifyFileRect(currentCtx.rectInfo, fileIndex);
    rectTest.push(currentCtx.rectInfo);
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    drawAllRect();
  }, [currentCtx.rectInfo]);

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentCtx.rectInfo.map((data) => {
      drawRect(data.sx, data.sy, data.w, data.h, data.color);
      if (data.id === currentCtx.editLabelIndex) {
        fillRect(data.sx, data.sy, data.w, data.h, hexToRgbA(data.color));
      }
    });
  }, [currentCtx.editLabelIndex]);

  return <Canvas ref={canvasRef} width={props.width} height={props.height} />;
}

const Canvas = styled.canvas`
  z-index: 10;
  position: absolute;
`;

export default DrawCanvas;
