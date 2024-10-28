import React from "react";
import axios from "axios";

const ExportBooks = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/books/export",
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "books.csv"); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();

      alert("Data exported successfully!");
    } catch (error) {
      console.error("Error exporting books:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Export Books</h2>
      <p className="text-gray-400 mb-4">
        Click the button below to export all book data.
      </p>
      <button
        onClick={handleExport}
        className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white p-2 rounded-lg hover:shadow-lg transition"
      >
        Export All Books
      </button>
    </div>
  );
};

export default ExportBooks;
