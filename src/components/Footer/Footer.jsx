import React from 'react';
import './Footer.css';
import Signal from '../Signal/Signal';
import ig from '../../assets/Instagram.png';
import google from '../../assets/Google.png';
import fb from '../../assets/Facebook.png';

const Footer = () => {
  return (
    <footer>
      <div className='ft-one'>

        <div className='single-footer'>
          <Signal />
          <div className='footer-links'>
            <a href="">About</a>
            <a href="">Features</a>
            <a href="">Pricing</a>
            <a href="">Gallery</a>
          </div>
        </div>

        <div className='married-footer'>
          <p>Subscribe to stay tuned for new product and latest updates. Let’s do it!</p>
          <div className="news-letter">
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="ft-two">
        <div className='ft-snd-links'>
          <a href="" className="not-needed">Privacy Policy</a>
          <a href="">Terms of Use</a>
          <a href="">Sales and Refunds</a>
          <a href="">Legal</a>
        </div>

        <div className='socials'>
          <img src={ig} alt="" />
          <img src={google} alt="" />
          <img src={fb} alt="" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
