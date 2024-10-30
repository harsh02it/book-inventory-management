import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookListDisplay = ({ books, onBookDeleted, handleDeleteFeedback }) => {
  const navigate = useNavigate();

  const handleEdit = (book) => {
    navigate("/edit", { state: { book } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      onBookDeleted(id);
      handleDeleteFeedback("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      handleDeleteFeedback("Failed to delete book. Please try again.");
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Table format for larger screens */}
      <div className="hidden min-[815px]:block">
        <table className="table text-gray-400 border-separate border-spacing-y-4 w-full">
          <thead className="bg-gray-800 text-gray-500">
            <tr>
              <th className="md:max-lg:px-1 p-3 rounded-l-xl">Title</th>
              <th className="md:max-lg:px-1 p-3">Author</th>
              <th className="md:max-lg:px-1 p-3">Genre</th>
              <th className="md:max-lg:px-1 p-3">Publication Date</th>
              <th className="md:max-lg:px-1 p-3">ISBN</th>
              <th className="md:max-lg:px-1 p-3 rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.entry_id} className="bg-gray-800">
                <td className="md:max-lg:px-1 p-3 text-center rounded-l-xl">
                  {book.title}
                </td>
                <td className="md:max-lg:px-1 p-3 text-center">
                  {book.author}
                </td>
                <td className="md:max-lg:px-1 p-3 text-center">{book.genre}</td>
                <td className="md:max-lg:px-1 p-3 text-center">
                  {book.publication_date}
                </td>
                <td className="md:max-lg:px-1 p-3 text-center">{book.isbn}</td>
                <td className="md:max-lg:px-1 p-3 text-center rounded-r-xl">
                  <a
                    onClick={() => handleEdit(book)}
                    href="#"
                    className="text-gray-400 hover:text-gray-100 mx-2"
                  >
                    <i className="material-icons-outlined text-xl">edit</i>
                  </a>
                  <a
                    onClick={() => handleDelete(book.entry_id)}
                    href="#"
                    className="text-gray-400 hover:text-gray-100 ml-2"
                  >
                    <i className="material-icons-round text-xl">
                      delete_outline
                    </i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline format for smaller screens */}
      <div className="min-[815px]:hidden">
        {books.map((book) => (
          <div key={book.entry_id} className="bg-gray-800 p-4 mb-4 rounded-lg">
            <p className="text-gray-300">
              <strong>Title:</strong> {book.title}
            </p>
            <p className="text-gray-300">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-gray-300">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-gray-300">
              <strong>Publication Date:</strong> {book.publication_date}
            </p>
            <p className="text-gray-300">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <div className="flex justify-center mt-2">
              <a
                onClick={() => handleEdit(book)}
                href="#"
                className="text-gray-400 hover:text-gray-100 mx-2"
              >
                <i className="material-icons-outlined text-xl">edit</i>
              </a>
              <a
                onClick={() => handleDelete(book.entry_id)}
                href="#"
                className="text-gray-400 hover:text-gray-100 ml-2"
              >
                <i className="material-icons-round text-xl">delete_outline</i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListDisplay;
