import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountState from "../components/AccountState";
import Header from "../components/Header";
import Filters from "../components/Filters";
import BookList from "../components/BookList";
import NewBookDialog from "../components/NewBookDialog";

const API_URL = "http://localhost:3000/api";
const AUTH_URL = "http://localhost:3000/auth";

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    status: "all",
    sortBy: "title",
    order: "ASC",
  });
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    status: "unread",
  });
  const [isNewBookDialogOpen, setIsNewBookDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleUnauthorized = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const username = localStorage.getItem("username");
  
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to delete your account.");
        return;
      }
  
      try {
        const response = await fetch(`${AUTH_URL}/delete-account`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message || "Account deleted successfully.");
          localStorage.clear();
          navigate("/signup");
        } else {
          alert(data.error || "Failed to delete account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting your account.");
      }
    }
  };  
  
  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleUnauthorized();
      return;
    }
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") queryParams.append(key, value);
      });
      const response = await fetch(`${API_URL}/books?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const handleCreateBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      handleUnauthorized();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) throw new Error("Failed to create book");
      await fetchBooks();
      setIsNewBookDialogOpen(false);
      setNewBook({ title: "", author: "", status: "unread" });
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleUpdateBook = async (updatedBook) => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleUnauthorized();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/books/${updatedBook.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) throw new Error("Failed to update book");
      await fetchBooks();
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleUnauthorized();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) throw new Error("Failed to delete book");
      await fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-300 p-6">
      <AccountState onLogout={handleLogout} onDeleteAccount={handleDeleteAccount} />
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-gray-300">
        <Header onAddBook={() => setIsNewBookDialogOpen(true)} />
        <Filters filters={filters} onFilterChange={setFilters} />
        <BookList
          books={books}
          editingBook={editingBook}
          setEditingBook={setEditingBook}
          onUpdateBook={handleUpdateBook}
          onDeleteBook={handleDeleteBook}
        />
      </div>
      {isNewBookDialogOpen && (
        <NewBookDialog
          newBook={newBook}
          setNewBook={setNewBook}
          onCreateBook={handleCreateBook}
          onCancel={() => setIsNewBookDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Library;
