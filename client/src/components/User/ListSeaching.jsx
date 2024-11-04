import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './book';

const ListSearching = ({ searchTerm, showChapters }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            // Sử dụng axios để fetch dữ liệu từ API
            axios.get(`http://localhost:3001/searchstory?name=${searchTerm}`)
                .then(response => {
                    console.log('Fetched books:', response.data);
                    setBooks(response.data);
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
        }
    }, [searchTerm]);

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

export default ListSearching;
