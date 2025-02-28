import React from "react";
import "./cards.css";
import productPhoto from "../../assets/productPhoto.png";
import productPhoto1 from "../../assets/productPhoto1.png";
import productPhoto2 from "../../assets/productPhoto2.png";
import productPhoto3 from "../../assets/productPhoto3.png";
import productPhoto4 from "../../assets/productPhoto4.png";
import productPhoto5 from "../../assets/productPhoto5.png";

const Cards = () => {
  return (
    <section className="cards_lai">
      <select id="select_lai">
        <option href="/">Choose a genre</option>
        <option>Fantacy </option>
        <option>Sci-fi </option>
        <option>Action </option>
      </select>

      <div className="first-row_lai">

        <div className="first card_lai">
          <div className="book-img_lai">
            <img src={productPhoto} alt="" />
          </div>

          <div className="book-text_lai">
            <h4>The Time Has Come</h4>
            <p>Lindbergh's Pharmacy is an Athens, Georgia, Institution...</p>
            <button className="button_lai">Read Now </button>
          </div>
        </div>

        <div className="second card_lai">
          <div className="book-img_lai">
            <img src={productPhoto1} alt="" />
          </div>

          <div className="book-text_lai">
            <h4>I Want a Better Catastrophe...</h4>
            <p>With global wrming projected to rocket past the...</p>
            <button className="button_lai">Read Now </button>
          </div>
        </div>

        <div className="third card_lai">
          <div className="book-img_lai">
            <img src={productPhoto2} alt="" />
          </div>

          <div className="book-text_lai">
            <h4>My government means to kill me</h4>
            <p>With global wrming projected to rocket past the...</p>
            <button className="button_lai">Read Now </button>
          </div>
        </div>
        
      </div>

      <h3>Recommended for you</h3>

      <div className="second-row_lai">
        <div className="fourth card_lai">
          <div className="book-img_lai">
            <img src={productPhoto3} alt="" />
          </div>

          <div className="book-text_lai">
            <h4>Pride and Protest</h4>
            <p>A woman goes head-to-head with the CEO of...</p>
            <button className="button_lai"> Read Now </button>
          </div>
        </div>

        <div className="fifth card_lai">
          <div className="book-img_lai">
            <img src={productPhoto4} alt="" />
          </div>

          <div className="book-text_lai">
            <h4>Forget a Mentor, Find...</h4>
            <p>In theis powerful, yet practical book, economist and...</p>
            <button className="button_lai">Read Now </button>
          </div>
        </div>

        <div className="sixth card_lai">
          <div className="book-img_lai">
            <img src={productPhoto5} alt="" />
          </div>

          <div className="book-text_lai">
            <h4>The Midnight Library</h4>
            <p>With global wrming projected to rocket past the...</p>
            <button className="button_lai">Read Now </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
