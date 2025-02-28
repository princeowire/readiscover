import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/Search-Icon.png";
import "./search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // Track empty results
  const searchRef = useRef(null);

  // Fetch books from backend using Axios (POST request)
  const fetchBooks = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredBooks([]);
      setNoResults(false);
      return;
    }

    const terms = searchTerm.split(" ");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://readiscover.onrender.com/api/v1/search`,
        {
          // filename: "books.json", // Replace with the actual filename
          terms,
        }
      );

      console.log("API Response:", response.data); // Debugging log

      if (Array.isArray(response.data.msg) && response.data.msg.length > 0) {
        setFilteredBooks(response.data.msg);
        setNoResults(false);
      } else {
        setFilteredBooks([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setFilteredBooks([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle the "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchBooks(query);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setFilteredBooks([]); // Clear suggestions when typing
    setNoResults(false); // Reset no results state
  };

  // Handle button click to submit search
  const handleSearchButtonClick = () => {
    fetchBooks(query);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredBooks([]);
        setNoResults(false);
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
          onKeyDown={handleKeyDown} // Trigger fetch on Enter
        />
      </div>

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