import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-300">
        <div className="text-center space-y-12 px-8 py-20">
          <h1 className="text-6xl font-bold text-gray-300">ShelfSpace</h1>
          <h3 className="text-4xl font-semibold text-gray-200">
            Your Digital Library
          </h3>
          <div className="mt-12 flex justify-center space-x-12">
            <button
              onClick={() => navigate("/signup")}
              className="w-48 bg-slate-600 text-white font-bold py-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            >
              Signup
            </button>
            <button
              onClick={() => navigate("/login")}
              type="submit"
              className="w-48 bg-slate-500 text-white py-4 font-bold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
