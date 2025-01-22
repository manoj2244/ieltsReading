import React from "react";
import { useParams } from "react-router-dom";
import { passages } from "../data"; // Import the passages data

const Passage = () => {
  const { id } = useParams(); // Get the passage id from the URL
  const passage = passages.find((p) => p.id === parseInt(id)); // Find the passage based on id

  if (!passage) {
    return <div>Passage not found!</div>;
  }

  return (
    <div className="flex flex-col min-h-[100%] overflow-hidden">
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
    </div>
  );
};

export default Passage;
