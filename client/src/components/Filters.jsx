import React from "react";

const Filters = ({ filters, onFilterChange }) => (
  <div className="space-y-4 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400"
        placeholder="Search by title..."
        value={filters.title}
        onChange={(e) =>
          onFilterChange({ ...filters, title: e.target.value })
        }
      />
      <input
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400"
        placeholder="Search by author..."
        value={filters.author}
        onChange={(e) =>
          onFilterChange({ ...filters, author: e.target.value })
        }
      />
      <select
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
        value={filters.status}
        onChange={(e) =>
          onFilterChange({ ...filters, status: e.target.value })
        }
      >
        <option value="all">All Status</option>
        <option value="unread">Unread</option>
        <option value="reading">Reading</option>
        <option value="read">Read</option>
      </select>
    </div>
    <div className="flex space-x-4">
      <select
        className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
        value={filters.sortBy}
        onChange={(e) =>
          onFilterChange({ ...filters, sortBy: e.target.value })
        }
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="rating">Sort by Rating</option>
      </select>
      <select
        className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
        value={filters.order}
        onChange={(e) =>
          onFilterChange({ ...filters, order: e.target.value })
        }
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  </div>
);

export default Filters;
