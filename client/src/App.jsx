import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <nav className="bg-blue-500 p-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link to="/" className="text-white text-lg hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white text-lg hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-white text-lg hover:underline">
              Signup
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
