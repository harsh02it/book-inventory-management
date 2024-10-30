import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const BookFilter = ({ filters, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-gray-800 text-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <FaFilter className="mr-2" />
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>
      {isOpen && (
        <div className="flex flex-col md:flex md:flex-row bg-gray-800 p-4 rounded-lg shadow-md mt-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={filters.title}
            onChange={handleFilterChange}
            className="p-1 rounded border border-gray-700 bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full mb-4 md:w-1/4 md:mr-2 md:mb-0"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={filters.author}
            onChange={handleFilterChange}
            className="p-1 rounded border border-gray-700 bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full mb-4 md:w-1/4 md:mr-2 md:mb-0"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="p-1 rounded border border-gray-700 bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full mb-4 md:w-1/4 md:mr-2 md:mb-0"
          />
          <input
            type="date"
            name="publication_date"
            value={filters.publication_date}
            onChange={handleFilterChange}
            className="p-1 rounded border border-gray-700 bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-1/4 md:mb-0"
          />
        </div>
      )}
    </div>
  );
};

export default BookFilter;
