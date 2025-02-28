import React from 'react';
import './Wishlist.css';
import productPhoto from "../../assets/productPhoto.png";
import productPhoto1 from "../../assets/productPhoto1.png";
import productPhoto2 from "../../assets/productPhoto2.png";
import productPhoto3 from "../../assets/productPhoto3.png";
import productPhoto4 from "../../assets/productPhoto4.png";
import productPhoto5 from "../../assets/productPhoto5.png";

const books = [
  { image: productPhoto, title: "The Time Has Come", pages: 200 },
  { image: productPhoto1, title: "I Want a Better Catastrophe", pages: 300 },
  { image: productPhoto2, title: "My Government Means to Kill Me", pages: 100 },
  { image: productPhoto3, title: "Pride and Protest", pages: 300 },
  { image: productPhoto4, title: "Forget a Mentor, Find a Champion", pages: 400 },
  { image: productPhoto5, title: "The Midnight Library", pages: 300 },
];

const Wishlist = () => {
  return (
    <div className="wishlist">
      <h1 className="wishlist-h">My Wishlist</h1>
      <header className="wishlist-header">
        <p className="heading-list one">Book Name</p>
        <p className="heading-list two">NO. Page</p>
        <p></p>
      </header>
      <hr />

      {books.map((book, index) => (
        <div key={index}>
          <div className="wishlist-row">
            <div>
              <img src={book.image} alt={book.title} className="wishlist-img" />
              <p className="wishlist-title">{book.title}</p>
            </div>
            <p className="wishlist-pages">{book.pages}</p>
            <button className="wishlist-btn">Read Now</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
