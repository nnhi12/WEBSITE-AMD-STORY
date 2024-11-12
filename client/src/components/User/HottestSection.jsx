import React, { useEffect, useState } from 'react';
import './HottestSection.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HottestSection = () => {
  const [hottestBooks, setHottestBooks] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get("http://localhost:3001/stories")
      .then(response => {
        console.log('Fetched books:', response.data);
        // Sort by views in descending order and take only the top 5
        const sortedBooks = response.data
          .sort((a, b) => b.view - a.view)
          .slice(0, 5); // Limit to top 5 books
        setHottestBooks(sortedBooks);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div className="hottest-section">
      <h2 className="hottest-title">HOTTEST!!!</h2>
      {hottestBooks.map((book, index) => (
        <div className="hottest-book-item" key={index}>
          <Link to={`/storyinfo/${book._id}`}>  {/* Link to a specific story's page */}
            <img 
              src={book.image ? `data:image/jpeg;base64,${book.image}` : 'default-image.jpg'} 
              alt={book.name} 
              className="hot-book-image" 
            /> {/* Fallback for missing image */}
          </Link>
          <div className="hottest-book-info">
            <Link to={`/storyinfo/${book._id}`} className="hot-book-title">
              {book.name} {/* Show the title of the book */}
            </Link>
            <div className="hottest-book-views">{book.view} views</div> {/* Display the number of views */}
          </div>
        </div>
      ))}
      <Link to="/tophot" className="see-more-btn">See more</Link>
    </div>
  );
};

export default HottestSection;
