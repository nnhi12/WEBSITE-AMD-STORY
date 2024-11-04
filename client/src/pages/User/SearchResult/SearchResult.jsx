import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import ListSearching from '../../../components/User/ListSeaching.jsx';
import '../../../components/User/homepage.css';

const SearchStory = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="u-main-page">
      <Header onSearch={handleSearch} />
      <div className="main-page-content">
        {searchResults.length > 0 ? (
          <div className="search-results">
            <ListSearching searchTerm={searchTerm} />
          </div>
        ) : (
          <p>Không có truyện</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchStory;
