import React from "react";
import { useNavigate } from "react-router-dom";
import { passages } from "../data";
import { Button } from "antd";

const TestListPage = () => {
  const navigate = useNavigate();

  const handleTestClick = (testId) => {
    navigate(`/test/${testId}/passage/1`); // Navigate to the first passage of the selected test
  };

  return (
    <>
    <div className="flex flex-col items-start justify-start p-10 min-h-screen bg-gray-100">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-8">Select a Cambridge Test</h1>

      {/* Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {passages.map((test) => (
          <div
            key={test.id}
            className="bg-white p-6 shadow rounded-lg flex flex-col items-center justify-between hover:shadow-lg transition-shadow duration-300"
          >
            {/* Card Heading */}
            <h2 className="text-xl font-semibold mb-4">{test.Title}</h2>
            <p className="text-gray-600 mb-6">Contains passages 1, 2, and 3</p>

            {/* Start Button */}
            <Button
              type="primary"
              className="w-full"
              onClick={() => handleTestClick(test.id)}
            >
              Start
            </Button>
          </div>
        ))}
      </div>
    </div>

<footer className="bg-gray-800 text-white text-center py-4 sticky bottom-0">
&copy; 2025 Manoj Nepali. All rights reserved.
</footer>
</>
  );
};

export default TestListPage;
