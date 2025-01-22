import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";

const testData = [
  { id: '19-1', name: "Cambridge 19 - Test 1" },
  { id: '19-2', name: "Cambridge 19 - Test 2" },
  { id: '19-3', name: "Cambridge 19 - Test 3" },
  { id: '19-4', name: "Cambridge 19 - Test 4" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleTestClick = (testId) => {
    // Navigate to the first passage of the selected test
    navigate(`/home/${testId}/passage/1`);
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Select a Cambridge Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testData.map((test) => (
          <Card
            key={test.id}
            title={test.name}
            className="shadow-lg text-center"
            
            style={{ width: 300 }}
           
          >
            
              <Button
                type="primary"
                onClick={() => handleTestClick(test.id)}
              >
                Start Test
              </Button>
            
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
