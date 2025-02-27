import React from 'react'
import './nav.css';
import wishImg from '../../assets/Favorite.png';
import auxLogo from '../../assets/reading-book.png';
import sndLogo from '../../assets/sndlogo.png';
import add from '../../assets/libary.png';
import Search from '../Search/Search';

const Navbar = () => {
  return (
    <nav>
      <div className='fst-nav-wrapper'>
        <a href="/" className='logo' ><img src={sndLogo} alt="" /></a>
        <a href="/" className='aux-logo' ><img src={auxLogo} alt="" /></a>

        <Search />
      </div>

      <div className='wish'>
        <a href="/book"><img className='libary-icon' src={add} alt="" /></a>
        <a href="/wishlist"><img src={wishImg} alt="" /></a>
      </div>
    </nav>
  )
}

export default Navbar
