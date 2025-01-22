import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import TestPage from "./components/TestPage";
import Passage from "./components/Passage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Welcome Page Route */}
        <Route path="/" element={<WelcomePage />} />

        {/* Test Page with Nested Routes */}
        <Route path="/test" element={<TestPage />}>
          <Route path="passage/:id" element={<Passage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
