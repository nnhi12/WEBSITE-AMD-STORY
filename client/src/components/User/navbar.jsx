import React from 'react';
import './navbar.css';
const Navbar = () => {
    return (
<div className="u-nav-bar">
        <a href="/">Home</a>
        <div className="u-genre-dropdown">
          <button className="u-genre-dropbtn">Genre</button>
          <div className="u-genre-dropdown-content">
            <a href="/classifiedbygenre">Genre 1</a>
            <a href="/classifiedbygenre">Genre 2</a>
          </div>
        </div>
        <div className="u-genre-dropdown">
          <button className="u-genre-dropbtn">Classified by Chapter</button>
          <div className="u-genre-dropdown-content">
            <a href="/classifiedbychapter">More than 500</a>
            <a href="/classifiedbychapter">Between 100 and 500</a>
            <a href="/classifiedbychapter">Less than 100</a>
          </div>
        </div>
        <a href="/tophot">Novel HOT</a>
        <a href="/favpage">Favourited</a>
        <a href="/aboutus">About Us</a>
      </div>
        );
    };
    
    export default Navbar;