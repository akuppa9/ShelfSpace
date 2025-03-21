import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const AUTH_URL = "http://localhost:3000/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      navigate("/library");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-600 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-white text-2xl"
      >
        <IoIosArrowBack />
      </button>
      <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        className="bg-gray-700 p-8 rounded-lg shadow-md w-80"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-600 text-white"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-600 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
