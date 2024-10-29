const express = require("express");
const { Pool } = require("pg");
const { Parser } = require("json2csv");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "book_inventory",
  password: "admin",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((err) => {
    console.error("Database connection error:", err.stack);
  });

app.use(express.json());

//Add a new book to the inventory
app.post("/api/books", async (req, res) => {
  const { title, author, genre, publication_date, isbn } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Inventory (title, author, genre, publication_date, isbn) 
       VALUES ($1, $2, $3, TO_DATE($4, 'YYYY-MM-DD'), $5) 
       RETURNING *`,
      [title, author, genre, publication_date, isbn]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

//Get all books from the inventory
app.get("/api/books", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT entry_id, title, author, genre, TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date, isbn 
       FROM Inventory`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

//Search for books in the inventory
app.get("/api/books/search", async (req, res) => {
  const { title, author, genre } = req.query;

  if (!title && !author && !genre) {
    return res.status(400).json({
      error: "At least one search parameter (title, author, genre) is required",
    });
  }

  let query = "SELECT * FROM Inventory WHERE 1=1";
  const params = [];

  if (title) {
    query += " AND title ILIKE $" + (params.length + 1);
    params.push(`%${title}%`);
  }
  if (author) {
    query += " AND author ILIKE $" + (params.length + 1);
    params.push(`%${author}%`);
  }
  if (genre) {
    query += " AND genre ILIKE $" + (params.length + 1);
    params.push(`%${genre}%`);
  }

  try {
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found matching the given criteria" });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res
      .status(500)
      .json({ error: "Failed to search books due to a database error" });
  }
});

//Export all books from the inventory
app.get("/api/books/export", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Inventory");
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(result.rows);
    res.header("Content-Type", "text/csv");
    res.attachment("books.csv");
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to export books" });
  }
});

//Get a specific book from the inventory
app.get("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT entry_id, title, author, genre, TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date, isbn FROM Inventory WHERE entry_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve book" });
  }
});

//Update a book in the inventory
app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publication_date, isbn } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Inventory 
       SET title = $1, author = $2, genre = $3, publication_date = TO_DATE($4, 'YYYY-MM-DD'), isbn = $5 
       WHERE entry_id = $6 RETURNING *`,
      [title, author, genre, publication_date, isbn, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update book" });
  }
});

//Delete a book from the inventory
app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM Inventory WHERE entry_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
