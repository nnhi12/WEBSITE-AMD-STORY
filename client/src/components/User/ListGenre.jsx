import React, { useEffect, useState } from 'react';
import './ListGenre.css';
import axios from 'axios';

const ListGenre = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch categories from the API
        axios.get("http://localhost:3001/categories")
            .then(response => {
                setGenres(response.data); // Set categories from API response
            })
            .catch(error => {
                console.error("Error fetching genres:", error);
            });
    }, []);

    return (
        <div className="list-genre-section">
            <h2 className="list-genre-title">GENRE</h2>
            {genres.map((genre, index) => (
                <div className="list-genre-book-item" key={index}>
                    <div className="list-genre-book-info">
                        <div className="list-genre-book-title">{genre.name}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListGenre;
