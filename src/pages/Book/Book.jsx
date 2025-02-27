import React, { useState, useEffect } from "react";
import "./Book.css";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from API (Replace with actual backend API)
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleRead = (bookId) => {
    alert(`Opening book ID: ${bookId}`); // Replace with navigation logic
  };

  return (
    <div className="books-container">
      <div className="book-head">
        <h2>All Books</h2>
        <a href="/create" className="add-book-button">
          +<span className="tooltip">Add Book</span>
        </a>
      </div>
      <div className="books-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="book-cover"
              />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button onClick={() => handleRead(book.id)}>Read</button>
            </div>
          ))
        ) : (
          <p className="no-book">No books available.</p>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Books;
