import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Outlet, useNavigate, useLocation, Link, useParams } from "react-router-dom";

const TestPage = () => {
  const { testId } = useParams(); // Get testId from URL
  const location = useLocation(); // Get the current location
  const [activePassage, setActivePassage] = useState(location.pathname.split("/").pop()); // Set active passage from URL
  const [timeElapsed, setTimeElapsed] = useState(0); // Timer state

  // Effect to track active passage
  useEffect(() => {
    const currentPassage = location.pathname.split("/").pop();
    setActivePassage(currentPassage);
  }, [location]);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer when component unmounts
  }, []);

  return (
    <div className="flex flex-col min-h-[100%] overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <div className="bg-gray-800 p-4 flex justify-center space-x-4 sticky top-0 z-10">
        {/* Timer Display */}

        {/* Passage Buttons */}
        {["1", "2", "3"].map((pId) => (
          <Link key={pId} to={`/test/${testId}/passage/${pId}`}>
            <Button
              key={pId}
              type="default"
              className={`transition-all ${
                activePassage === pId
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Passage {pId}
            </Button>
          </Link>
        ))}
                <div className="text-white font-bold text-lg mr-4 flex justify-end !pl-20">⏳ Time: {Math.floor(timeElapsed / 60)}m {timeElapsed % 60}s</div>

      </div>
      

      {/* Dynamic Content */}
      <div className="flex-grow overflow-hidden"> {/* Disable body scrolling */}
        <Outlet />
      </div>

      {/* Sticky Footer */}
   
    </div>
  );
};

export default TestPage;
