import React from 'react';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import Navbar from '../../../components/User/navbar.jsx';
import Banner from './Banner';
import DailyUpdates from '../../../components/User/ListReading.jsx';
import HottestSection from '../../../components/User/HottestSection.jsx';
import '../../../components/User/homepage.css';


const HomePage = () => (
  <div className="u-main-page">
    <Header />
    <Navbar />
    <div className="main-page-content">
        <div className="banner-container">
          <Banner />
        </div>
        <div className="second-section-container">
          <div className="first-section-container">
            <DailyUpdates />
          </div>
          <div className="second-section-container">
            <HottestSection />
          </div>
        </div>
      </div>
    <Footer />
  </div>
);

export default HomePage;
