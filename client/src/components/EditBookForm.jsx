import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BookInputField from "./BookInputField";

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
      className="bg-gray-900 p-6 rounded-lg shadow-md mt-4 mx-auto max-w-md text-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Edit Book</h2>
      <BookInputField
        type="text"
        name="title"
        placeholder="Title"
        value={updatedBook.title}
        onChange={handleChange}
        required
      />
      <BookInputField
        type="text"
        name="author"
        placeholder="Author"
        value={updatedBook.author}
        onChange={handleChange}
        required
      />
      <BookInputField
        type="text"
        name="genre"
        placeholder="Genre"
        value={updatedBook.genre}
        onChange={handleChange}
        required
      />
      <BookInputField
        type="date"
        name="publication_date"
        value={updatedBook.publication_date}
        onChange={handleChange}
        placeholder="Publication Date"
        required
      />
      <BookInputField
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={updatedBook.isbn}
        onChange={handleChange}
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
