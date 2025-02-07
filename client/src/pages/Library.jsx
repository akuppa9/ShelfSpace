import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    status: 'all',
    sortBy: 'title',
    order: 'ASC'
  });
  const [newBook, setNewBook] = useState({ title: '', author: '', status: 'unread' });
  const [isNewBookDialogOpen, setIsNewBookDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchBooks = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
        handleUnauthorized();
        return;
      }

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') queryParams.append(key, value);
      });
      
      const response = await fetch(`${API_URL}/books?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const handleCreateBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
        handleUnauthorized();
        return;
    }

    try {
        const bookData = { ...newBook };
        if (bookData.rating === "none" || bookData.rating === null) {
            delete bookData.rating;
        }

        const response = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
        });
        
        if (response.status === 401) {
        handleUnauthorized();
        return;
        }

        if (!response.ok) throw new Error('Failed to create book');
        await fetchBooks();
        setIsNewBookDialogOpen(false);
        setNewBook({ title: '', author: '', status: 'unread' });
    } catch (error) {
        console.error('Error creating book:', error);
    }
  };

  const handleUpdateBook = async (book) => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });
      
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) throw new Error('Failed to update book');
      await fetchBooks();
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) throw new Error('Failed to delete book');
      await fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Books</h2>
          <button 
            onClick={() => setIsNewBookDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            Add Book
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="w-full p-2 border rounded-lg"
              placeholder="Search by title..."
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded-lg"
              placeholder="Search by author..."
              value={filters.author}
              onChange={(e) => setFilters({ ...filters, author: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-lg"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <select
              className="p-2 border rounded-lg"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <select
              className="p-2 border rounded-lg"
              value={filters.order}
              onChange={(e) => setFilters({ ...filters, order: e.target.value })}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>

          <div className="space-y-4">
            {books.map(book => (
              <div key={book.id} className="bg-white border rounded-lg p-4">
                {editingBook?.id === book.id ? (
                  <div className="space-y-2">
                    <input
                      className="w-full p-2 border rounded-lg"
                      value={editingBook.title}
                      onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    />
                    <input
                      className="w-full p-2 border rounded-lg"
                      value={editingBook.author}
                      onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    />
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={editingBook.status}
                      onChange={(e) => setEditingBook({ ...editingBook, status: e.target.value })}
                    >
                      <option value="unread">Unread</option>
                      <option value="reading">Reading</option>
                      <option value="read">Read</option>
                    </select>
                    <select
                      className="w-full p-2 border rounded-lg"
                      value={editingBook.rating?.toString() || "none"}
                      onChange={(e) => setEditingBook({ 
                        ...editingBook, 
                        rating: e.target.value === "none" ? null : parseInt(e.target.value) 
                      })}
                    >
                      <option value="none">No Rating</option>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <option key={rating} value={rating.toString()}>
                          {"⭐".repeat(rating)}
                        </option>
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateBook(editingBook)}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingBook(null)}
                        className="border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.author}</p>
                      <div className="flex space-x-2 mt-1">
                        <span className="text-sm bg-blue-100 px-2 py-1 rounded-lg">
                          {book.status}
                        </span>
                        {book.rating && (
                          <span className="text-sm">
                            {"⭐".repeat(book.rating)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingBook(book)}
                        className="border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isNewBookDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <h2 className="text-xl font-bold mb-4">Add New Book</h2>
            <form onSubmit={handleCreateBook} className="space-y-4">
              <input
                className="w-full p-2 border rounded-lg"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                required
              />
              <input
                className="w-full p-2 border rounded-lg"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
              <select
                className="w-full p-2 border rounded-lg"
                value={newBook.status}
                onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
                required
              >
                <option value="unread">Unread</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
              </select>
              <select
                className="w-full p-2 border rounded-lg"
                value={newBook.rating?.toString() || "none"}
                onChange={(e) => setNewBook({ 
                  ...newBook, 
                  rating: e.target.value === "none" ? null : parseInt(e.target.value) 
                })}
              >
                <option value="none">No Rating</option>
                {[1, 2, 3, 4, 5].map(rating => (
                  <option key={rating} value={rating.toString()}>
                    {"⭐".repeat(rating)}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Book
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewBookDialogOpen(false)}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;