import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import ListStory from '../../../components/User/ListReading.jsx';
import '../../../components/User/homepage.css';

const SearchStory = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  console.log('Search Results:', searchResults);

  return (
    <div className="u-main-page">
      <Header />
      <div className="main-page-content">
        {searchResults.length > 0 ? (
          <div className="search-results">
            <ListStory books={searchResults} />
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
