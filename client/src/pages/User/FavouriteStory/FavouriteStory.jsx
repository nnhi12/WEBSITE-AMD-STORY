import React from 'react';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import Navbar from '../../../components/User/navbar.jsx';
import ListReading from '../../../components/User/ListReading.jsx';
import '../../../components/User/Page.css';


const FavPage = () => (
  <div className="all-page">
    <Header />
    <Navbar />
    <div className="all-content">
        <ListReading showChapters={true}/>
    </div>
    <Footer />
  </div>
);

export default FavPage;