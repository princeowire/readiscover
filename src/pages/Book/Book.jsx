import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Book.css";

const Books = () => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(""); // Clear previous errors

      try {
        const {
          data: { data: result },
        } = await axios.get("https://readiscover.onrender.com/api/v1/");
        setBooks(result);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleRead = (bookId) => {
    alert(`Opening book ID: ${bookId}`); // Replace with navigation logic
  };

  const displayAllIndexes = () => {
    return (
      <div>
        {!loading && (
          <div>
            {Object.entries(books).map(([key, value], index) => {
              console.log(value)
              return (
                <div key={index}>
                  <h2>{key}</h2>
                  <div>
                    {value.map(({title, text}) => {
                      return (
                        <article key={title}>
                          <p>{title}</p>
                          <p>{text}</p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="books-container">
      <div className="book-head">
        <h2>All Books</h2>
        <a href="/create" className="add-book-button">
          +<span className="tooltip">Add Book</span>
        </a>
      </div>

      {loading && <p className="loading">Loading books...</p>}
      {error && <p className="error">{error}</p>}

      {displayAllIndexes()}
      <div className="books-list">
        {!loading && books.length > 0
          ? books.map((book) => (
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
          : !loading &&
            !error && <p className="no-book">No books available.</p>}
      </div>
    </div>
  );
};

export default Books;
