import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Outlet, useNavigate, useLocation, Link, useParams } from "react-router-dom";

const TestPage = () => {
  const { testId } = useParams(); // Get testId from URL
  const location = useLocation(); // Get the current location
  const [activePassage, setActivePassage] = useState(
    location.pathname.split("/").pop() // Set active passage from URL
  );

  useEffect(() => {
    // Update active passage when location changes
    const currentPassage = location.pathname.split("/").pop();
    setActivePassage(currentPassage);
  }, [location]);

  return (
    <div className="flex flex-col min-h-[100%] overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <div className="bg-gray-800 p-4 flex justify-center space-x-4 sticky top-0 z-10">
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
      </div>

      {/* Dynamic Content */}
      <div className="flex-grow overflow-hidden"> {/* Disable body scrolling */}
        <Outlet />
      </div>

      {/* Sticky Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 sticky bottom-0">
        &copy; 2025 Manoj Nepali. All rights reserved.
      </footer>
    </div>
  );
};

export default TestPage;
