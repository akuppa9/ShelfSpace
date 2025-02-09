import React from "react";

const NewBookDialog = ({ newBook, setNewBook, onCreateBook, onCancel }) => {
  const handleChange = (field, value) => {
    setNewBook({ ...newBook, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full m-4 text-gray-300">
        <h2 className="text-xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={onCreateBook} className="space-y-4">
          <input
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
          <input
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => handleChange("author", e.target.value)}
            required
          />
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
            value={newBook.status}
            onChange={(e) => handleChange("status", e.target.value)}
            required
          >
            <option value="unread">Unread</option>
            <option value="reading">Reading</option>
            <option value="read">Read</option>
          </select>
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
            value={newBook.rating?.toString() || "none"}
            onChange={(e) =>
              handleChange(
                "rating",
                e.target.value === "none" ? null : parseInt(e.target.value)
              )
            }
          >
            <option value="none">No Rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating.toString()}>
                {"⭐".repeat(rating)}
              </option>
            ))}
          </select>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
            >
              Add Book
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookDialog;
