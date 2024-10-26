import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearchResults }) => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3000/api/books/search",
        { params: searchParams }
      );
      onSearchResults(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-gray-900 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Search Books</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={searchParams.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={searchParams.author}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={searchParams.genre}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
