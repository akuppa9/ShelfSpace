import React from "react";

const BookList = ({
  books,
  editingBook,
  setEditingBook,
  onUpdateBook,
  onDeleteBook,
}) => {
  return (
    <div className="space-y-4">
      {books.map((book) =>
        editingBook && editingBook.id === book.id ? (
          // Edit Mode
          <div
            key={book.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4"
          >
            <div className="space-y-2">
              <input
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
                value={editingBook.title}
                onChange={(e) =>
                  setEditingBook({ ...editingBook, title: e.target.value })
                }
              />
              <input
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
                value={editingBook.author}
                onChange={(e) =>
                  setEditingBook({ ...editingBook, author: e.target.value })
                }
              />
              <select
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
                value={editingBook.status}
                onChange={(e) =>
                  setEditingBook({ ...editingBook, status: e.target.value })
                }
              >
                <option value="unread">Unread</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
              </select>
              <select
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
                value={editingBook.rating?.toString() || "none"}
                onChange={(e) =>
                  setEditingBook({
                    ...editingBook,
                    rating:
                      e.target.value === "none"
                        ? null
                        : parseInt(e.target.value),
                  })
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
                  onClick={() => onUpdateBook(editingBook)}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingBook(null)}
                  className="border border-gray-500 p-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          // View Mode
          <div
            key={book.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-300">{book.title}</h3>
                <p className="text-sm text-gray-400">{book.author}</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-sm bg-slate-600 px-2 py-1 rounded-lg">
                    {book.status}
                  </span>
                  {book.rating && (
                    <span className="text-sm">{"⭐".repeat(book.rating)}</span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingBook(book)}
                  className="border border-gray-500 p-2 rounded-lg hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteBook(book.id)}
                  className="border border-gray-500 p-2 rounded-lg hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BookList;
