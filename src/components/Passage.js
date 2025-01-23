import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { passages } from "../data"; // Import the passages data
import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";

const Passage = () => {
  const { testId, id } = useParams(); // Get the passage id from the URL
  const navigate = useNavigate();

  const passagePrev = passages.find((p) => p.id == testId); // Find the passage based on id
  const passage = passagePrev?.passage?.find((p) => p.id === parseInt(id)); // Find the passage based on id

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPencilActive, setIsPencilActive] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      // Match canvas size to container
      canvas.width = container.offsetWidth;
      canvas.height = container.scrollHeight;
    }
  }, [id, testId]); // Recalculate on passage change

  const getMousePosition = (e) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate mouse position relative to the canvas and account for scroll
    const offsetX = e.clientX - canvasRect.left;
    const offsetY = e.clientY - canvasRect.top ;

    return { offsetX, offsetY };
  };

  const startDrawing = (e) => {
    if (!isPencilActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = getMousePosition(e);

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = getMousePosition(e);

    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  const togglePencilMode = () => {
    setIsPencilActive(!isPencilActive);
  };

  if (!passage) {
    return <div>Passage not found!</div>;
  }

  return (
    <div
      className="flex flex-col min-h-[100%] overflow-hidden"
      style={{
        cursor: isPencilActive ? "url('/pencil-cursor.png'), auto" : "default",
      }}
    >
      <div className="flex justify-between items-center bg-gray-400 text-white px-6 py-2 shadow-md">
        <Button type="primary" onClick={() => navigate("/tests")}>
          Home
        </Button>
        <h1 className="text-xl font-bold text-gray-900">{passagePrev.Title}</h1>
        <Button
          type="primary"
          style={{ backgroundColor: isPencilActive ? "green" : "" }}
          onClick={togglePencilMode}
        >
          Pencil
        </Button>
        <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
          Answer
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="relative flex flex-grow p-6 space-x-4">
        {/* Passage Section (60%) */}
        <div
          ref={containerRef}
          className="bg-[#f6fff9] p-4 shadow rounded-md overflow-y-auto relative"
          style={{ width: "60%", height: "calc(100vh - 160px)" }}
        >
          <div className="text-[30px]">Passage {id}</div>
          {passage.heading && (
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: passage.heading }}
              style={{ fontSize: "12px" }}
            />
          )}
          {passage.Title && (
            <div
              className="mb-4 font-bold text-lg"
              dangerouslySetInnerHTML={{ __html: passage.Title }}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: passage.content }} />

          {/* Canvas for Drawing */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
            style={{
              width: "100%",
              height: `${containerRef.current?.scrollHeight || 0}px`,
              pointerEvents: isPencilActive ? "auto" : "none",
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
        </div>

        {/* Questions Section (40%) */}
        <div
          className="bg-white p-4 shadow rounded-md overflow-y-auto"
          style={{ width: "40%", height: "calc(100vh - 160px)" }}
        >
          <h2 className="text-xl font-semibold mb-4">Questions</h2>
          <div dangerouslySetInnerHTML={{ __html: passage.questions }} />
        </div>
      </div>

      <Drawer
        className="w-[40%]"
        title="Questions"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <h2 className="text-[25px] my-4">Passage {id} Answer</h2>
        <div dangerouslySetInnerHTML={{ __html: passage.answers }} />
      </Drawer>
    </div>
  );
};

export default Passage;
