import React from 'react';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import Navbar from '../../../components/User/navbar.jsx';
import ListStory from '../../../components/User/ListReading.jsx';
import HottestSection from '../../../components/User/HottestSection.jsx';
import '../../../components/User/homepage.css';


const SearchStory = () => (
  <div className="u-main-page">
    <Header />
    <Navbar />
    <div className="main-page-content">
        <div className="second-section-container">
          <div className="first-section-container">
            <ListStory />
          </div>
          <div className="second-section-container" style={{ marginBottom: "10px" }}>
            <HottestSection />
          </div>
        </div>
      </div>
    <Footer />
  </div>
);

export default SearchStory;