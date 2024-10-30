import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './book';

const ListReading = ({ showChapters }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Sử dụng axios để fetch dữ liệu từ API
        axios.get("http://localhost:3001/books")
            .then(response => {
                setBooks(response.data);
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

export default ListReading;
