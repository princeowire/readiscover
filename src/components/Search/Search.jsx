import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import searchIcon from "../../assets/Search-Icon.png";
import "./search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Track selected item
  const searchRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Fetch books with debouncing
  const fetchBooks = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredBooks([]);
      setNoResults(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`https://readiscover.onrender.com/api/v1/search`, {
        terms: searchTerm.split(" "),
      });

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
  }, []);

  // Debounce input changes
  useEffect(() => {
    if (query.trim()) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        fetchBooks(query);
      }, 500);
    } else {
      setFilteredBooks([]);
      setNoResults(false);
    }
    return () => clearTimeout(debounceTimeout.current);
  }, [query, fetchBooks]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, filteredBooks.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && filteredBooks[selectedIndex]) {
        setQuery(filteredBooks[selectedIndex]);
        setFilteredBooks([]);
      } else {
        fetchBooks(query);
      }
    }
  };

  // Handle clicking outside to close dropdown
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
        <img src={searchIcon} onClick={() => fetchBooks(query)} alt="Search" />
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1); // Reset selection on new input
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {!loading && noResults && <p className="no-results">Book not found</p>}
      {filteredBooks.length > 0 && !loading && (
        <ul className="suggestions">
          {filteredBooks.map((book, index) => (
            <li
              key={index}
              className={index === selectedIndex ? "selected" : ""}
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
  );
};

export default Search;
