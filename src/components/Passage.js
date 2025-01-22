import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { passages } from "../data"; // Import the passages data
import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";


const Passage = () => {
    const { testId,id } = useParams(); // Get the passage id from the URL

    console.log(testId,id,"sgsdgsdgsdgsdg");
    
  const navigate = useNavigate();

    
    const passagePrev = passages.find((p) => p.id == testId); // Find the passage based on id
    const passage = passagePrev?.passage?.find((p) => p.id === parseInt(id)); // Find the passage based on id

   
    
  
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  
    if (!passage) {
      return <div>Passage not found!</div>;
    }
  
    // Toggle Drawer
    const showDrawer = () => {
      setIsDrawerOpen(true);
    };
  
    const closeDrawer = () => {
      setIsDrawerOpen(false);
    };
    const handleTakeTest = () => {
        navigate("/tests"); // Navigate to the list of Cambridge tests
      };

  return (
    <div className="flex flex-col min-h-[100%] overflow-hidden">
              <div className="flex justify-between items-center bg-gray-400 text-white px-6 py-2 shadow-md">
              <Button type="primary"  onClick={handleTakeTest}>
          Home
        </Button>
                
        <h1 className="text-xl font-bold text-gray-900">{passagePrev.Title} </h1>
        <Button type="primary" onClick={showDrawer}>
          Answer
        </Button>
      </div>


      {/* Main Content Area */}
      <div className="flex flex-grow p-6 space-x-4">
        {/* Passage Section (60%) */}
        <div
          className="bg-[#f6fff9] p-4 shadow rounded-md overflow-y-auto"
          style={{ width: "60%", height: "calc(100vh - 160px)" }}
        >
            <div className="text-[30px]">Passage {id}</div>
          {/* Render heading, title, and content dynamically */}
          {passage.heading && (
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: passage.heading }} style={{
                fontSize:"12px"
              }}
            />
          )}
          {passage.Title && (
            <div
              className="mb-4 font-bold text-lg"
              dangerouslySetInnerHTML={{ __html: passage.Title }}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: passage.content }} />
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
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <h2 className="text-[25px] my-4">Passage {id} Answer</h2>
                  <div dangerouslySetInnerHTML={{ __html: passage.answers }} />

       
      </Drawer>
    </div>
  );
};

export default Passage;
