import React, { useState } from "react";
import "./Create.css";

const CreateBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    cover: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBook({ ...book, cover: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!book.title || !book.author || !book.cover) {
      setError("Title, author, and cover are required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("description", book.description);
    formData.append("cover", book.cover);

    try {
      const response = await fetch("https://readiscover.onrender.com/api/v1/create", {
        method: "POST",
        body: formData, // Sending FormData instead of JSON
      });

      if (response.ok) {
        setBook({ title: "", author: "", description: "", cover: null });
        setPreview(null);
      } else {
        setError("Failed to create book.");
      }
    } catch (error) {
      console.error("Error creating book:", error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-book-container">
      <h2>Create a New Book</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-book-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
        ></textarea>

        <label>Book Cover:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Book Cover Preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
