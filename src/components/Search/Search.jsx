import React, { useState, useRef, useEffect } from "react";
import searchIcon from "../../assets/Search-Icon.png";
import "./search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  let debounceTimer = useRef(null);

  // Fetch books from backend
  const fetchBooks = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredBooks([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://readiscover.onrender.com/api/v1/search?query=${searchTerm}`);
      const data = await response.json();
      setFilteredBooks(data.books || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce API calls
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchBooks(value);
    }, 300);
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredBooks([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search">
        <img src={searchIcon} alt="Search" />
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={handleSearch}
        />
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {filteredBooks.length > 0 && !loading && (
        <ul className="suggestions">
          {filteredBooks.map((book, index) => (
            <li key={index} onClick={() => setQuery(book)}>
              {book}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
