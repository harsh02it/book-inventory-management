import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditBookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [updatedBook, setUpdatedBook] = useState(
    book || {
      title: "",
      author: "",
      genre: "",
      publication_date: "",
      isbn: "",
    }
  );

  const handleChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/books/${book.entry_id}`,
        updatedBook
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-md mt-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Edit Book</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={updatedBook.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={updatedBook.author}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={updatedBook.genre}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="date"
        name="publication_date"
        value={updatedBook.publication_date}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        required
      />
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={updatedBook.isbn}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white p-2 rounded-lg hover:shadow-lg transition"
      >
        Update Book
      </button>
    </form>
  );
};

export default EditBookForm;
