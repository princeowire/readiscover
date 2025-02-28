import React, { useState } from "react";
import axios from "axios";
import "./Create.css";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    filename: "",
    title: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.text || !formData.filename) {
      setError("Title and text are required!");
      return;
    }

    setLoading(true);

    const fileContent = [{ title: formData.title, text: formData.text }];
    const payload = {
      filename: formData.filename, // File name
      fileContent, // Array of books
    };

    try {
      const { data } = await axios.post(
        "https://readiscover.onrender.com/api/v1/create",
        payload
      );
      // do what ever you want with the data
      setFormData({ filename: "", title: "", text: "" });
    } catch (error) {
      console.error("Error creating book:", error);
      setError();
      // alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-book-container">
      <h2>Create a New Book</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-book-form">
        <label>Filename:</label>
        <input
          type="text"
          name="filename"
          value={formData.filename}
          onChange={handleChange}
          required
        />

        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Text:</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>

      {/* {books.length > 0 && (
        <div className="book-list">
          <h3>Book List</h3>
          <ul>
            {books.map((b, index) => (
              <li key={index}>
                <strong>{b.title}</strong>: {b.text} (Index: {index})
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default CreateBook;
