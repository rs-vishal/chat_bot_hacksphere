import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Welcome</h2>
        <div className="flex gap-6">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
