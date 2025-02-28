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

  return (
    <div className="books-container">
      <div className="book-head">
        <h2>All Books</h2>
        <a href="/create" className="add-book-button">
          +<span className="tooltip">Add Book</span>
        </a>
      </div>

      {/* Loading State */}
      {loading && <p className="loading-text">Loading books...</p>}

      {/* Error State */}
      {error && <p className="error-text">{error}</p>}

      {/* No Books Found */}
      {!loading && !error && Object.keys(books).length === 0 && (
        <p className="no-books-text">No books found.</p>
      )}

      {/* Books List */}
      {!loading && !error && (
        <div className="books-list">
          {Object.entries(books).map(([key, value], index) => (
            <div key={index} className="book-category">
              <h2>{key}</h2>
              <div className="book-items">
                {value.map(({ title, text }, bookIndex) => (
                  <article key={bookIndex} className="book-card">
                    <h3>{title}</h3>
                    <p className="book-description">
                      {text.length > 100 ? `${text.substring(0, 100)}...` : text}
                    </p>
                    <button onClick={() => handleRead(title)} className="read-more-btn">
                      Read More
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
