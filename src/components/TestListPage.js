import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passages } from "../data";
import { Button, Modal } from "antd";

const TestListPage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  // Show the confirmation modal
  const showModal = (testId) => {
    setSelectedTestId(testId);
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTestId(null);
  };

  // Navigate to test when confirmed
  const handleConfirm = () => {
    if (selectedTestId) {
      navigate(`/test/${selectedTestId}/passage/1`);
    }
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

              {/* Start Button - Opens Modal */}
              <Button
                type="primary"
                className="w-full"
                onClick={() => showModal(test.id)}
              >
                Start
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Test Instructions"
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Start Test"
        cancelText="Cancel"
      >
        <p className="text-lg font-semibold">This test contains:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Three parts: Passage 1, Passage 2, and Passage 3</li>
          <li>Each passage contains multiple questions</li>
          <li>Time limit: <strong>60 minutes</strong> (No pause option)</li>
        </ul>
        <p className="text-red-500 font-semibold">
          ⚠ Once you start, the timer will begin immediately. Make sure you are ready!
        </p>
      </Modal>

      {/* Sticky Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 sticky bottom-0">
        &copy; 2025 Manoj Nepali. All rights reserved.
      </footer>
    </>
  );
};

export default TestListPage;
