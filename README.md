# Book Inventory Management System

## Overview

The Book Inventory Management System is a full-stack application built with the Node.js and Express as the backend, React as the frontend, and PostgreSQL as the database. This application allows users to manage an inventory of books with functionalities for adding new books, filtering books based on criteria, and exporting book data in CSV or JSON format.

## Features

- **Add New Books**: Users can add books by entering relevant details.
- **Filter Books**: Search and filter books by title, author, genre, and publication date.
- **Export Book Data**: Easily export inventory data in CSV or JSON formats.
- **Responsive UI**: The interface adapts to different screen sizes, making it accessible on various devices.

## Project Structure

```
book-inventory-management/
├── client/                  # React frontend
├── server/                  # Node.js backend
├── database/                # SQL scripts for PostgreSQL schema and seed data
└── documentation/           # Additional project documentation (if required)
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js**: Make sure Node.js (v14+) and npm are installed.
- **PostgreSQL**: Install PostgreSQL and set up a database instance.
- **Git**: For cloning the repository.

### Installation

1. **Clone the repository**
   Run the below command in the terminal.

   ```bash
   git clone https://github.com/harsh02it/book-inventory-management.git
   cd book-inventory-management
   ```

2. **Server Setup**
   Navigate to the server directory and install the dependencies.

   ```bash
   cd book-inventory-management/server
   npm install
   ```

3. **Client Setup**
   Navigate to the client directory and install the dependencies.

   ```bash
   cd book-inventory-management/client
   npm install
   ```

4. **Run the Application**
   Start the PostgreSQL database service.

   In the server folder, run the backend server:

   ```bash
   npm start
   ```

   In the client folder, run the frontend:

   ```bash
   npm start
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000), and the backend server will run on [http://localhost:5000](http://localhost:5000).

## Contributing

Please fork the repository and create a pull request if you’d like to contribute.

## License

This project is licensed under the MIT License.
