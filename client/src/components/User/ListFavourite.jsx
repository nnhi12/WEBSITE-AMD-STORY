import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './book';

const ListFavourite = ({ userId, showChapters }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userId) {
      console.log('Using User ID:', userId);
      axios.get(`http://localhost:3001/users/${userId}/followingstories`)
        .then(response => {
          console.log('Fetched books:', response.data);
          setBooks(response.data);
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        });
    }
  }, [userId]);

  return (
    <div className="container my-5">
      <h2>Followed Stories</h2>
      <div className="row row-cols-4">
        {books.length > 0 ? books.map((book, index) => (
          <Book key={index} data={book} showChapters={showChapters} />
        )) : (
          <p>No followed stories found.</p>
        )}
      </div>
    </div>
  );
};

export default ListFavourite;
