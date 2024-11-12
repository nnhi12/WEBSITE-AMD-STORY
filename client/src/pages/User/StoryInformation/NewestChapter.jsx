import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './NewestChapter.css';

const NewestChapter = () => {
  const { storyId } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/stories/${storyId}/chapters`)
      .then(response => {
        const sortedChapters = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
          .slice(0, 5); // Limit to 5 chapters
        setChapters(sortedChapters);
      })
      .catch(error => {
        console.error('Error fetching chapters:', error);
      });
  }, [storyId]);

  return (
    <section className="newest-chapter">
      <h3>Newest Chapter</h3>
      <ul>
        {chapters.map((chapter, index) => (
          <li key={index} className="newest-item">
            <a href={`/viewchapter/${chapter._id}`}>★ {chapter.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewestChapter;
