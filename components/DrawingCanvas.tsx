import { useState, useEffect, useRef, MouseEvent, RefObject } from "react";
import Palette from "./Palette";

interface BaseStyles {
  color: string;
  lineWidth: number;
}

const DrawingCanvas = () => {
  const [width, setWidth] = useState(10);
  const [color, setColor] = useState("black");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const baseStyles: BaseStyles = {
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
    setIsDrawing(true);
    draw(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    ctxRef.current?.beginPath();
  };

  const draw = (e: MouseEvent) => {
    if (!isDrawing) return;
    ctxRef.current!.lineCap = "round";
    ctxRef.current!.lineWidth = baseStyles.lineWidth;
    ctxRef.current!.strokeStyle = baseStyles.color;
    const position = getMousePos(canvasRef, e);
    ctxRef.current!.lineTo(position.x, position.y);
    ctxRef.current!.stroke();
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
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;
