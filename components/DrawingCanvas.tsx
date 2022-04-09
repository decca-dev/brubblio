import {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  RefObject,
  MutableRefObject,
} from "react";
import Palette from "./Palette";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface Base {
  color: string;
  lineWidth: number;
  x?: number;
  y?: number;
}

interface CanvasOptions {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  canvasRef: RefObject<HTMLCanvasElement>;
  ctxRef: MutableRefObject<CanvasRenderingContext2D>;
}

const DrawingCanvas = ({ socket, canvasRef, ctxRef }: CanvasOptions) => {
  const [width, setWidth] = useState(10);
  const [color, setColor] = useState("black");
  const [isDrawing, setIsDrawing] = useState(false);

  const current: Base = {
    color: color,
    lineWidth: width,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctxRef.current = ctx!;
  }, []);

  const getMousePos = (canvas: RefObject<HTMLCanvasElement>, e: MouseEvent) => {
    const rect = canvas.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: MouseEvent) => {
    current.x =
      (e.clientX - canvasRef.current?.getBoundingClientRect().left!) /
      canvasRef.current?.width!;
    current.y =
      (e.clientY - canvasRef.current?.getBoundingClientRect().top!) /
      canvasRef.current?.height!;
    setIsDrawing(true);
    draw(e);
  };

  const endDrawing = (e: MouseEvent) => {
    setIsDrawing(false);
    ctxRef.current?.beginPath();
    socket.emit("drawing", {
      start: {
        x: current.x,
        y: current.y,
      },
      end: {
        x:
          (e.clientX - canvasRef.current?.getBoundingClientRect().left!) /
          canvasRef.current?.width!,
        y:
          (e.clientY - canvasRef.current?.getBoundingClientRect().top!) /
          canvasRef.current?.height!,
      },
      color: current.color,
      lineWidth: current.lineWidth,
    });
  };

  const draw = (e: MouseEvent) => {
    if (!isDrawing) return;
    ctxRef.current!.lineCap = "round";
    ctxRef.current!.lineWidth = current.lineWidth;
    ctxRef.current!.strokeStyle = current.color;
    const position = getMousePos(canvasRef, e);
    ctxRef.current!.lineTo(position.x, position.y);
    ctxRef.current!.stroke();
    socket.emit("drawing", {
      start: {
        x: current.x,
        y: current.y,
      },
      end: {
        x:
          (e.clientX - canvasRef.current?.getBoundingClientRect().left!) /
          canvasRef.current?.width!,
        y:
          (e.clientY - canvasRef.current?.getBoundingClientRect().top!) /
          canvasRef.current?.height!,
      },
      color: current.color,
      lineWidth: current.lineWidth,
    });
    current.x =
      (e.clientX - canvasRef.current?.getBoundingClientRect().left!) /
      canvasRef.current?.width!;
    current.y =
      (e.clientY - canvasRef.current?.getBoundingClientRect().top!) /
      canvasRef.current?.height!;
  };

  return (
    <div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        className="bg-white border border-black rounded-lg ml-3 mr-3"
        width={750}
        height={500}
      />
      <div>
        <Palette
          width={width}
          color={color}
          setWidth={setWidth}
          setColor={setColor}
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;
