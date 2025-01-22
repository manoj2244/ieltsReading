import React from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <Card className="p-8 shadow-lg" style={{ width: 400 }}>
          <h1 className="text-2xl font-bold text-center mb-4">Welcome to IELTS Reading</h1>
          <p className="text-center mb-6">
            Test your reading skills with passages designed for IELTS practice.
          </p>
          <Button
            type="primary"
            block
            onClick={() => navigate("/test/passage/1")}
          >
            Take a Test
          </Button>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; 2025 Manoj Nepali. All rights reserved.
      </footer>
    </div>
  );
};

export default WelcomePage;
