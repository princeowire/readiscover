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

  // Handles manual input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles JSON file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
  
        // If it's an array of books, take only the first one
        const book = Array.isArray(jsonData) ? jsonData[0] : jsonData;
  
        if (!book.title || !book.text) {
          setError("Invalid JSON format! Each book must include 'title' and 'text'.");
          return;
        }
  
        setFormData({
          filename: file.name,
          title: book.title,
          text: book.text,
        });
  
        setError(""); // Clear error if successful
      } catch (err) {
        setError("Invalid JSON file!");
      }
    };
  
    reader.readAsText(file);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!formData.filename) {
      setError("Please upload a JSON file!");
      return;
    }
  
    setLoading(true);
  
    const fileInput = document.getElementById("file-upload"); // Get file input element
    const file = fileInput.files[0]; // Get the actual file
  
    if (!file) {
      setError("No file selected!");
      setLoading(false);
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("file", file); // Append file as "file"
  
    try {
      const { data } = await axios.post(
        "https://readiscover.onrender.com/api/v1/create",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Ensure correct content type
        }
      );
  
      console.log("Response:", data);
      alert("Book created successfully!"); // ✅ Show success alert
      setFormData({ filename: "", title: "", text: "" }); // Clear form
    } catch (error) {
      console.error("Error creating book:", error);
      setError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="create-book-container">
      <h2>Create a New Book</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="create-book-form">
        <label>Upload JSON File:</label>
        <input id="file-upload" type="file" accept=".json" onChange={handleFileUpload} />


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
    </div>
  );
};

export default CreateBook;
