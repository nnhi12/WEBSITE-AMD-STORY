import React, { Component } from 'react';
import './book.css'
import { Link } from 'react-router-dom';

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data,
        }
    }
    render() {
        const { data } = this.state;
        const { showChapters } = this.props;
        return (
            <div className="col text-center mb-4">
                <Link to={data.url} className="u-text-decoration-none u-text-dark">
                    <img src={data.src} alt={data.title} className="img-fluid u-book-image" />
                    <p className="u-book-title mt-2">{data.title}</p>
                </Link>
                {showChapters && data.chapters && (
                    <ul className="fav-chapter-list mt-2">
                        {data.chapters.slice(0, 2).map((chapter, index) => (
                            <li key={index}>
                                <Link
                                    to={{
                                        pathname: '/viewchapter',
                                        state: { chapterName: chapter, bookTitle: data.title },
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
        )
    };
}

export default Book;