import React, { useState } from "react";
import { Button } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePassage, setActivePassage] = useState(location.pathname.split("/").pop());

  const handleNavigation = (passage) => {
    setActivePassage(passage);
    navigate(`/test/passage/${passage}`);
  };

  return (
    <div className="flex flex-col min-h-[100%] overflow-x-hidden">
      {/* Sticky Navigation Bar */}
      <div className="bg-gray-800 p-4 flex justify-center space-x-4 sticky top-0 z-10">
        {["1", "2", "3"].map((passage) => (
          <Button
            key={passage}
            type={activePassage === passage ? "primary" : "default"}
            onClick={() => handleNavigation(passage)}
            className={`transition-all ${
              activePassage === passage ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            Passage {passage}
          </Button>
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
