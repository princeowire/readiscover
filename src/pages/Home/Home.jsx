import React from 'react';
import './Home.css';
import heroBook from '../../assets/hero-book.png';
import Cards from '../../components/Cards/Cards';


const Home = () => {
  return (
    <div>
      <div className='hero'>
        <div className='hero-text'>
          <h3>New Releases This Week</h3>
          <p>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
         
          <button>Subcribe</button>
        </div>

        <div className="hero-img">
          <img src={heroBook} alt="" />
        </div>
      </div>

      <div className='books'>
        <h3>Top sellers</h3>
        <Cards />
      </div>
    </div>
  )
}

export default Home
