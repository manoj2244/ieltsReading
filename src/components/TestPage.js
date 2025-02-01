import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Outlet, useLocation, Link, useParams } from "react-router-dom";

const TestPage = () => {
  const { testId } = useParams(); // Get testId from URL
  const location = useLocation(); // Get the current location
  const [activePassage, setActivePassage] = useState(location.pathname.split("/").pop()); // Set active passage from URL
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // Start from 60 minutes (3600 seconds)

  // Effect to track active passage
  useEffect(() => {
    const currentPassage = location.pathname.split("/").pop();
    setActivePassage(currentPassage);
  }, [location]);

  // Timer logic
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0)); // Ensure it doesn't go below 0
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer when component unmounts
    }
  }, [timeRemaining]);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;



  return (
    <div className="flex flex-col min-h-[100%] overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <div className="bg-gray-800 p-4 flex justify-center space-x-4 sticky top-0 z-10">
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

        {/* Timer Display */}
        <div className={`ml-10 pl-20 text-lg text-white`}>
          ⏳ Time Left: {minutes}m {seconds}s
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default TestPage;
