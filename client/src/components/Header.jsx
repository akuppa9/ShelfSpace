import React from "react";

const Header = ({ onAddBook }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-300">My Books</h2>
    <button
      onClick={onAddBook}
      className="bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700"
    >
      Add Book
    </button>
  </div>
);

export default Header;
