import React, { useState } from "react";
import axios from "axios";
import BookInputField from "./BookInputField";

const AddBookForm = ({ onBookAdded }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
    isbn: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !book.title ||
      !book.author ||
      !book.genre ||
      !book.publication_date ||
      !book.isbn
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/books",
        book
      );
      onBookAdded(response.data);
      setSuccessMessage(
        "Book added successfully! Go to Home to see the updated list."
      );
      setBook({
        title: "",
        author: "",
        genre: "",
        publication_date: "",
        isbn: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      setErrorMessage("Failed to add book. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-md mt-4 mx-auto max-w-md text-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-300">Add a New Book</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
      <BookInputField
        type="text"
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleChange}
      />
      <BookInputField
        type="text"
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
      />
      <BookInputField
        type="text"
        name="genre"
        placeholder="Genre"
        value={book.genre}
        onChange={handleChange}
      />
      <BookInputField
        type="date"
        name="publication_date"
        value={book.publication_date}
        onChange={handleChange}
        placeholder="Publication Date"
      />
      <BookInputField
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={book.isbn}
        onChange={handleChange}
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
