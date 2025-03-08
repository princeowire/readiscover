import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/Search-Icon.png";
import "./search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");
  const searchRef = useRef(null);

  // Fetch books from API without file upload
  const fetchBooks = async (searchTerm) => {
    const terms = searchTerm.split(" ");

    setLoading(true);
    setError("");

    try {
      const {
        data: {
          data: { result },
        },
      } = await axios.post(
        `https://readiscover.onrender.com/api/v1/search`,
        { terms }, // Send search term in the body
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(result); // it is working now please only work with the return data

      setFilteredBooks(result);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again.");
      setFilteredBooks([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchBooks(query);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setFilteredBooks([]);
    setNoResults(false);
    setError("");
  };

  const handleSearchButtonClick = () => {
    fetchBooks(query);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredBooks([]);
        setNoResults(false);
        setError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search">
        <img src={searchIcon} onClick={handleSearchButtonClick} alt="Search" />
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="search-results">
        {loading && <p className="loading-text">Loading...</p>}
        {!loading && noResults && <p className="no-results">Book not found</p>}
        {filteredBooks.length > 0 && !loading && (
          <ul className="suggestions">
            {filteredBooks.map((book, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(book);
                  setFilteredBooks([]);
                }}
              >
                {book}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
