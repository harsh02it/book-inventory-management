import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

const SearchBar = ({ onSearchResults, onBookDeleted }) => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [results, setResults] = useState([]);

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
      setResults(response.data);
      onSearchResults(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="bg-gray-900 p-6 rounded-lg shadow-md mt-4 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-300">Search Books</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={searchParams.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={searchParams.author}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={searchParams.genre}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-2 rounded-lg hover:shadow-lg transition"
        >
          Search
        </button>
      </form>
      <SearchResults results={results} onBookDeleted={onBookDeleted} />
    </div>
  );
};

export default SearchBar;
