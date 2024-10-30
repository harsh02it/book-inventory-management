import React, { useState } from "react";
import BookListDisplay from "./BookListDisplay";
import BookFilter from "./BookFilter";

const BookList = ({ books, onBookDeleted }) => {
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDeleteFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000);
  };

  const filteredBooks = books.filter((book) => {
    return (
      (filters.title === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "" ||
        book.author.toLowerCase().includes(filters.author.toLowerCase())) &&
      (filters.genre === "" ||
        book.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
      (filters.publication_date === "" ||
        book.publication_date === filters.publication_date)
    );
  });

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md mt-4 text-center">
      <h2 className="text-2xl text-center font-bold mb-5 text-gray-300">
        Book List
      </h2>
      <BookFilter filters={filters} handleFilterChange={handleFilterChange} />
      {feedbackMessage && (
        <p className="text-green-500 mb-4">{feedbackMessage}</p>
      )}
      <div className="flex items-center justify-center">
        <div className="col-span-12 w-full overflow-hidden">
          {filteredBooks.length === 0 ? (
            <p className="text-gray-300">No books available in the database.</p>
          ) : (
            <BookListDisplay
              books={filteredBooks}
              onBookDeleted={onBookDeleted}
              handleDeleteFeedback={handleDeleteFeedback}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;
