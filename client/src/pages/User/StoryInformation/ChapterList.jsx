import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ChapterList.css';

const ChapterList = () => {
  const { storyId } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/stories/${storyId}/chapters`)
      .then(response => {
        setChapters(response.data);
      })
      .catch(error => {
        console.error('Error fetching chapters:', error);
      });
  }, [storyId]);

  return (
    <section className="u-chapter-list">
      <h3>Chapter List</h3>
      <ul>
        {chapters.map((chapter, index) => (
          <li key={index} className="u-chapter-item">
            <a href={`/stories/${storyId}/chapters/${chapter._id}`}>★ {chapter.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChapterList;
