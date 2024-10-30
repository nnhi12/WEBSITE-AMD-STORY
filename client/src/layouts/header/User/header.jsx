import React, { useState } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    console.log('Searching for:', searchTerm);
    try {
      const response = await axios.get(`http://localhost:3001/searchstory?name=${searchTerm}`);
      const results = response.data;

      // Điều hướng đến trang kết quả và truyền dữ liệu tìm kiếm
      navigate("/searchresult", { state: { searchResults: results } });
    } catch (error) {
      console.error('Error searching stories:', error);
    }
  };

  return (
    <div className="u-header">
      <div className="u-top-bar">
        <Link to="/" className="u-logo">
          <img src="https://genk.mediacdn.vn/thumb_w/640/2014/amdlogo-1407485590324.jpg" alt="AMD Logo" />
        </Link>
        <div className="u-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32N6i_mjMes8qXIXw7iKeqhvUN3G7YFHwHff07CgXDEcSA5y9a6evlCfP21SvdLM310o&usqp=CAU"
              alt="Search"
            />
          </button>
        </div>
        <div className="u-nav-links">
          <a href="/library">History</a>
          <a href="#options">Options</a>
          <Link to="/register" className="abc-button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
