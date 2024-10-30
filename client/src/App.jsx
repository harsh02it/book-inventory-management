import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";
import EditBookForm from "./components/EditBookForm";
import ExportBooks from "./components/ExportBooks";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books/");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleBookDeleted = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.entry_id !== id));
  };

  return (
    <Router>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Book Inventory Management
        </h1>
        <div className="mx-auto">
          <nav className="w-3/6 text-center mx-auto mb-4 flex flex-col justify-center space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-teal-400 to-teal-600 text-white p-3 rounded-lg hover:shadow-lg transition"
            >
              Home
            </Link>
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-3 rounded-lg hover:shadow-lg transition"
            >
              Add Book
            </Link>
            <Link
              to="/export"
              className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-3 rounded-lg hover:shadow-lg transition"
            >
              Export Books
            </Link>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <BookList books={books} onBookDeleted={handleBookDeleted} />
              }
            />
            <Route
              path="/add"
              element={<AddBookForm onBookAdded={handleBookAdded} />}
            />
            <Route path="/edit" element={<EditBookForm />} />
            <Route path="/export" element={<ExportBooks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
