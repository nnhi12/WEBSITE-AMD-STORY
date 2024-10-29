import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="u-header">
      <div className="u-top-bar">
        <Link to = "/" className="u-logo">
          <img src="https://genk.mediacdn.vn/thumb_w/640/2014/amdlogo-1407485590324.jpg" alt="AMD Logo" />
        </Link>
        <div className="u-search-bar">
          <input type="text" placeholder="Search..." />
          <Link to = "/searchresult" className = "search-button">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32N6i_mjMes8qXIXw7iKeqhvUN3G7YFHwHff07CgXDEcSA5y9a6evlCfP21SvdLM310o&usqp=CAU" alt="Search" />
          </Link>
        </div>
        <div className="u-nav-links">
          <a href="/library">History</a>
          <a href="#options">Options</a>
          <Link to ="/register" className="abc-button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;