import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EditorPage from "./pages/EditorPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
