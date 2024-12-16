import React, { useState } from 'react';
import './Navbar.css';
import { assets } from "../assets/Common/assets.js";
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt='' className='logo' />
      </Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ' '}>
          Home
        </Link>
        <Link to="/products" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ' '}>
          Arts
        </Link>
         <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ' '}>
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
