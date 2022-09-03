import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "../pages/Editor";

import Home from "../pages/Home";


const App = () => (
    <>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </Router>
    </>
);

export default App;
