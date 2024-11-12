import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './book';

const ListHost = ({ showChapters }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get("http://localhost:3001/stories")
            .then(response => {
                console.log('Fetched books:', response.data);
                // Sort by views in descending order and take only the top 6
                const sortedBooks = response.data
                    .sort((a, b) => b.view - a.view)
                    .slice(0, 15);
                setBooks(sortedBooks);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div className="container my-5">
            <div className="row row-cols-4">
                {books.map((book, index) => (
                    <Book key={index} data={book} showChapters={showChapters} />
                ))}
            </div>
        </div>
    );
};

export default ListHost;
