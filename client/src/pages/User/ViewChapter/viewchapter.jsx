import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './viewchapter.css';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import Navbar from '../../../components/User/navbar.jsx';

function ViewChapter() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/chapters/${chapterId}`)
      .then(response => {
        setChapter(response.data);
      })
      .catch(error => {
        console.error('Error fetching chapter:', error);
      });
  }, [chapterId]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-chapter-page">
      <Header />
      <Navbar />
      <div className="chapter-content">
        <p className="chapter-post-date">Posted at: {new Date(chapter.created_at).toLocaleString()}</p>
        <h1 className="chapter-title">{chapter.storyName}</h1>
        <h2 className="chapter-now">{chapter.name}</h2>
      </div>
      <div className="chapter-select-buttons">
        <button className="chapter-btn chapter-btn-primary" onClick={() => navigate(`/viewchapter/${chapter.previousId}`)} disabled={!chapter.previousId}>
          Chương trước
        </button>
        <button className="chapter-btn chapter-btn-secondary">
          {/* Placeholder for any additional actions */}
        </button>
        <button className="chapter-btn chapter-btn-primary" onClick={() => navigate(`/viewchapter/${chapter.nextId}`)} disabled={!chapter.nextId}>
          Chương tiếp
        </button>
      </div>
      <div className="chapter-content-text">
        <p>{chapter.content}</p>
      </div>
      <div className="chapter-select-buttons">
        <button className="chapter-btn chapter-btn-primary" onClick={() => navigate(`/viewchapter/${chapter.previousId}`)} disabled={!chapter.previousId}>
          Chương trước
        </button>
        <button className="chapter-btn chapter-btn-secondary">
          {/* Placeholder for any additional actions */}
        </button>
        <button className="chapter-btn chapter-btn-primary" onClick={() => navigate(`/viewchapter/${chapter.nextId}`)} disabled={!chapter.nextId}>
          Chương tiếp
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ViewChapter;
