import { Dispatch, SetStateAction, RefObject } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface PaletteOptions {
  width: number;
  color: string;
  setWidth: Dispatch<SetStateAction<number>>;
  setColor: Dispatch<SetStateAction<string>>;
  canvasRef: RefObject<HTMLCanvasElement>;
  ctxRef: RefObject<CanvasRenderingContext2D>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Palette = ({
  width,
  color,
  setWidth,
  setColor,
  canvasRef,
  ctxRef,
  socket,
}: PaletteOptions) => {
  const clearCanvas = () => {
    socket.emit("clear");
    ctxRef.current!.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
  };

  const bucketFill = () => {
    socket.emit("fill", color);
    ctxRef.current!.fillStyle = color;
    ctxRef.current?.fillRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
  };
  return (
    <div
      style={{ width: 750 }}
      className="flex flex-row items-center justify-evenly bg-cyan-600 py-5 rounded-lg ml-3 mr-3"
    >
      <div className="tooltip mt-5">
        <span className="tooltip-text">Change color</span>
        <input
          type="color"
          onChange={(e: any) => {
            setColor(e.target.value);
          }}
        />
      </div>
      <div className="tooltip mt-5">
        <span className="tooltip-text">Fill canvas</span>
        <button onClick={bucketFill}>
          <img src="/icons/bucket.svg" width={50} height={50} />
        </button>
      </div>
      <div className="tooltip mt-5">
        <span className="tooltip-text">Clear canvas</span>
        <button onClick={clearCanvas}>
          <img src="/icons/eraser.svg" width={50} height={50} />
        </button>
      </div>
      <div className="space-x-2">
        <div className="tooltip">
          <span className="tooltip-text">Change width</span>
          <svg
            width={width}
            height="67"
            viewBox="0 0 68 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block align-middle"
          >
            <path
              d="M65.5 33.5C65.5 50.586 51.432 64.5 34 64.5C16.568 64.5 2.5 50.586 2.5 33.5C2.5 16.414 16.568 2.5 34 2.5C51.432 2.5 65.5 16.414 65.5 33.5Z"
              fill="#C4C4C4"
              stroke="black"
              strokeWidth="5"
            />
          </svg>
          <input
            type="range"
            name="line-width"
            id="line-width"
            className="inline-block align-middle"
            step={1}
            size={100}
            value={width}
            onChange={(e: any) => setWidth(e.target!.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Palette;
