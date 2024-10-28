import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookList = ({ books, onBookDeleted }) => {
  const navigate = useNavigate();

  const handleEdit = (book) => {
    navigate("/edit", { state: { book } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      onBookDeleted(id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl text-center font-bold mb-5 text-gray-300">
        Book List
      </h2>
      <div className="flex items-center justify-center">
        <div className="col-span-12 w-full overflow-x-auto">
          {" "}
          <div className="min-w-full">
            {books.length === 0 ? (
              <p className="text-gray-400">
                No books available in the database.
              </p>
            ) : (
              <table className="table text-gray-400 border-separate border-spacing-y-4 w-full">
                {" "}
                <thead className="bg-gray-800 text-gray-500">
                  <tr>
                    <th className="p-3 rounded-l-xl">Title</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">Genre</th>
                    <th className="p-3">Publication Date</th>
                    <th className="p-3">ISBN</th>
                    <th className="p-3 rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.entry_id} className="bg-gray-800">
                      <td className="p-3 text-center rounded-l-xl">
                        {book.title}
                      </td>
                      <td className="p-3 text-center">{book.author}</td>
                      <td className="p-3 text-center">{book.genre}</td>
                      <td className="p-3 text-center">
                        {formatDate(book.publication_date)}
                      </td>
                      <td className="p-3 text-center">{book.isbn}</td>
                      <td className="p-3 text-center rounded-r-xl">
                        <a
                          onClick={() => handleEdit(book)}
                          href="#"
                          className="text-gray-400 hover:text-gray-100 mx-2"
                        >
                          <i className="material-icons-outlined text-xl">
                            edit
                          </i>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
