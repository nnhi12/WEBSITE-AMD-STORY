import React, { useState, useEffect } from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Trạng thái cho combobox
  const navigate = useNavigate();

  useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
          setUsername(storedUsername);
      }
  }, []);

  const handleSearch = async () => {
      try {
          const response = await axios.get(`http://localhost:3001/searchstory?name=${searchTerm}`);
          const results = response.data;
          navigate("/searchresult", { state: { searchResults: results } });
      } catch (error) {
          console.error('Error searching stories:', error);
      }
  };

  const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
      localStorage.removeItem("username");
      setUsername("");
      setDropdownOpen(false);
      navigate("/login"); // Điều hướng đến trang đăng nhập sau khi đăng xuất
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
                  {username ? (
                      <div className="abc-button" onClick={toggleDropdown}>
                          {username}
                          {dropdownOpen && (
                              <div className="a-dropdown-menu">
                                  <Link to="/userinfo" onClick={() => setDropdownOpen(false)}>Profile</Link>
                                  <button onClick={handleLogout}>Log out</button>
                              </div>
                          )}
                      </div>
                  ) : (
                      <Link to="/register" className="abc-button">Sign Up</Link>
                  )}
              </div>
          </div>
      </div>
  );
};

export default Header;
