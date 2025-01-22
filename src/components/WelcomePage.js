import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate("/tests"); // Navigate to the list of Cambridge tests
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to IELTS Reading Platform</h1>
      <button
        onClick={handleTakeTest}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-400"
      >
        Take Test
      </button>
    </div>
  );
};

export default WelcomePage;
