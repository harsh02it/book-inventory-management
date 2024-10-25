# Database Setup

This guide will cover everything from installation to creating the necessary table.

### Step 1: Install PostgreSQL

1. **Download PostgreSQL**:

   - Go to the [PostgreSQL official website](https://www.postgresql.org/download/).
   - Choose your operating system (Windows, macOS, Linux) and follow the installation instructions.

2. **Install PostgreSQL**:

   - Follow the prompts in the installer. Make sure to remember the password you set for the `postgres` user, as you will need it later.

3. **Verify Installation**:

   - Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux).
   - Type the following command to check if PostgreSQL is installed:

     ```bash
     psql --version
     ```

   - You should see the version of PostgreSQL installed.

### Step 2: Start PostgreSQL Service

- On most systems, PostgreSQL starts automatically after installation. If not, you can start it manually:

  - **Windows**: Use the Services app to start the PostgreSQL service.
  - **macOS**: Use Homebrew services or the command:

    ```bash
    brew services start postgresql
    ```

  - **Linux**: Use the command:

    ```bash
    sudo service postgresql start
    ```

### Step 3: Access PostgreSQL Command Line

1. **Open the PostgreSQL Command Line**:

   - Type the following command in your terminal:

     ```bash
     psql -U postgres
     ```

   - Enter the password you set during installation when prompted.

### Step 4: Create a New Database

1. **Create a Database**:

   - Once you are in the PostgreSQL command line, create a new database for your application:

     ```sql
     CREATE DATABASE book_inventory;
     ```

2. **Connect to the Database**:

   - Connect to the newly created database:

     ```sql
     \c book_inventory
     ```

### Step 5: Create the Inventory Table

1. **Create the Inventory Table**:

   - Use the following SQL command to create the `Inventory` table with the specified columns:

     ```sql
     CREATE TABLE Inventory (
             entry_id SERIAL PRIMARY KEY,
             title VARCHAR(255) NOT NULL,
             author VARCHAR(255) NOT NULL,
             genre VARCHAR(100) NOT NULL,
             publication_date DATE NOT NULL,
             isbn VARCHAR(20) UNIQUE NOT NULL
     );
     ```

### Step 6: Verify the Table Creation

1. **List Tables**:

   - To verify that the `Inventory` table has been created, use the following command:

     ```sql
     \dt
     ```

   - You should see the `Inventory` table listed.

2. **Describe the Table**:

   - To see the structure of the `Inventory` table, use:

     ```sql
     \d Inventory
     ```

### Step 7: Insert Sample Data (Optional)

1. **Insert Sample Data**:

   - You can insert some sample data into the `Inventory` table to test it:

     ```sql
     INSERT INTO Inventory (title, author, genre, publication_date, isbn) VALUES
     ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '1925-04-10', '9780743273565'),
     ('1984', 'George Orwell', 'Dystopian', '1949-06-08', '9780451524935');
     ```

2. **Query the Data**:

   - To see the data you just inserted, run:

     ```sql
     SELECT * FROM Inventory;
     ```

### Step 8: Run the SQL Script

- Create a file named `schema.sql` in the `database/` directory with the following content:

  ```sql
  CREATE TABLE Inventory (
      entry_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      genre VARCHAR(100) NOT NULL,
      publication_date DATE NOT NULL,
      isbn VARCHAR(20) UNIQUE NOT NULL
  );
  ```

- To execute the SQL script, run the following command in the PostgreSQL command line:

  ```sql
  \i /path/to/your/book-inventory-management/database/schema.sql
  ```

  - Replace `/path/to/your/` with the actual path to your project directory.

### Step 9: Exit PostgreSQL

- To exit the PostgreSQL command line, type:

  ```sql
  \q
  ```

### Summary

You have now successfully set up a PostgreSQL database, created a database named `book_inventory`, and created an `Inventory` table with the required columns.
