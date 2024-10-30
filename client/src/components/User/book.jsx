import React, { Component } from 'react';
import './book.css';
import { Link } from 'react-router-dom';

class Book extends Component {
    render() {
        const { data } = this.props;
        const { showChapters } = this.props;

        // Kiểm tra nếu có dữ liệu ảnh Base64
        const imageSrc = data.image ? `data:image/jpeg;base64,${data.image}` : '';

        return (
            <div className="col text-center mb-4">
                <Link to={data.url} className="u-text-decoration-none u-text-dark">
                    <img src={imageSrc} alt={data.title} className="img-fluid u-book-image" />
                    <p className="u-book-title mt-2">{data.name}</p>
                </Link>
                {showChapters && data.chapters && (
                    <ul className="fav-chapter-list mt-2">
                        {data.chapters.slice(0, 2).map((chapter, index) => (
                            <li key={index}>
                                <Link
                                    to={{
                                        pathname: '/viewchapter',
                                        state: { chapterName: chapter, bookTitle: data.name },
                                    }}
                                    className="u-text-decoration-none"
                                >
                                    {chapter}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default Book;
