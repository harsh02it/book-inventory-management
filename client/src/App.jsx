import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";
import EditBookForm from "./components/EditBookForm";

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleBookDeleted = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.entry_id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Book Inventory Management
        </h1>
        <div className="mx-auto">
          <nav className="mb-4">
            <Link
              to="/"
              className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/add"
              className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600 transition"
            >
              Add Book
            </Link>
            <Link
              to="/search"
              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
            >
              Search Books
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
            <Route
              path="/search"
              element={<SearchBar onSearchResults={handleSearchResults} />}
            />
            <Route path="/edit" element={<EditBookForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
