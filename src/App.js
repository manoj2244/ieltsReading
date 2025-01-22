import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import TestListPage from "./components/TestListPage";
import TestPage from "./components/TestPage"; // Top navbar with passage navigation
import PassagePage from "./components/Passage"; // Passage-specific content

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/tests" element={<TestListPage />} />
        <Route path="/test/:testId" element={<TestPage />}>
          {/* Nested Route for PassagePage */}
          <Route path="passage/:id" element={<PassagePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
