import React, { useState } from "react";
import axios from "axios";

const AddBookForm = ({ onBookAdded }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    isbn: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/books",
        book
      );
      onBookAdded(response.data);
      setBook({
        title: "",
        author: "",
        genre: "",
        publication_date: "",
        isbn: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-md mt-4 text-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Add a New Book</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={book.genre}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        required
      />
      <input
        type="date"
        name="publication_date"
        placeholder="DD-MM-YYYY"
        value={book.publication_date}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        required
      />
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={book.isbn}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        required
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
