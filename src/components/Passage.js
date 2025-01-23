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

  // Canvas reference and drawing state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPencilActive, setIsPencilActive] = useState(false); // State to toggle pencil mode
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  useEffect(() => {
    // Clear the canvas when id or testId changes
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    }
  }, [id, testId]);

  const startDrawing = (e) => {
    if (!isPencilActive) return; // Only draw if pencil mode is active
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    // Get mouse position scaled to canvas dimensions
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const offsetX = (e.clientX - rect.left) * scaleX;
    const offsetY = (e.clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return; // Only draw when mouse is pressed down
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    // Get mouse position scaled to canvas dimensions
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const offsetX = (e.clientX - rect.left) * scaleX;
    const offsetY = (e.clientY - rect.top) * scaleY;

    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = "red"; // Pencil color
    ctx.lineWidth = 1; // Pencil thickness
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
    setIsPencilActive(!isPencilActive); // Toggle pencil mode
  };

  if (!passage) {
    return <div>Passage not found!</div>;
  }

  return (
    <div
      className="flex flex-col min-h-[100%] overflow-hidden"
      style={{
        cursor: isPencilActive ? "url('/pencil-cursor.png'), auto" : "default", // Change cursor to pencil
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
              height: "100%",
              pointerEvents: isPencilActive ? "auto" : "none", // Canvas only active if pencil mode is on
            }}
            width={800} // Canvas actual width
            height={600} // Canvas actual height
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
