import React, { useState } from "react";
import axios from "axios";
import "./Create.css";

const CreateBook = () => {
  const [files, setFiles] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onUpload = (e) => {
    const file = e.target.files[0];
    setFiles((prev) => [...prev, file]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("jsonFile", file);
    });

    setLoading(true);
    setError(false);

    try {
      const {
        data: { data: result, msg },
      } = await axios.post(
        "https://readiscover.onrender.com/api/v1/create",
        formData
      );
      setAlertMsg(msg);
      console.log(result);
      setFiles([]); // just work with the data
    } catch (error) {
      const {
        data: { msg },
      } = error.response;
      console.log(msg);
      setAlertMsg(msg);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlertMsg("");
      }, 3000);
    }
  };

  return (
    <div className="create-book-container">
      <h2>Create a New Book</h2>
      {alertMsg && (
        <p className={`display-message ${error ? "error" : "success"}`}>
          {alertMsg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="create-book-form">
        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={onUpload}
        />

        <button disabled={isLoading}>creat{isLoading ? "ing" : "e"}</button>
      </form>
    </div>
  );
};

export default CreateBook;
