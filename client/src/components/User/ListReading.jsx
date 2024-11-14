import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './book';

const ListReading = ({ showChapters }) => {
    const [books, setBooks] = useState([]);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const storedUserId = localStorage.getItem("accountId");
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        // Sử dụng axios để fetch dữ liệu từ API
        axios.get("http://localhost:3001/stories")
            .then(response => {
                console.log('Fetched books:', response.data);
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
                    <Book key={index} data={book} userId = {userId} showChapters={showChapters} />
                ))}
            </div>
        </div>
    );
};

export default ListReading;
