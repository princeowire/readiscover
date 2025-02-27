import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Wishlist from "./pages/Wishlist/Wishlist";
import CreateBook from "./pages/Create/Create";
import Books from "./pages/Book/Book";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar outside Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/create" element={<CreateBook />} />
        <Route path="/book" element={<Books />} />
      </Routes>
      <Footer /> {/* Footer outside Routes */}
    </Router>
  );
}

export default App;
