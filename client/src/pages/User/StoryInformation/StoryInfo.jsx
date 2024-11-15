import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StoryInfo.css';

const StoryInfo = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/stories/${storyId}`)
      .then(response => {
        setStory(response.data);
      })
      .catch(error => {
        console.error('Error fetching story:', error);
      });
  }, [storyId]);

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <section className="u-story-info">
      <img src={story.image ? `data:image/jpeg;base64,${story.image}` : ''} alt={story.name} className="u-story-cover" />
      <div className="u-summary">
        <div className="u-story-name">
          <h1 className="u-page-title">{story.name}</h1>
          <h4 className="u-author">
            {/* {story.authors && story.authors.length > 0 ? story.authors.map(author => author.name).join(', ') : 'Unknown Author'} */}
          </h4>
        </div>
        <div className="u-date-info">
          <p>Created at: {new Date(story.created_at).toLocaleString()}</p>
          <p>Updated at: {new Date(story.updated_at).toLocaleString()}</p>
        </div>
        <h3>Summary</h3>
        <p>{story.description}</p>
        <div>
          <button className="u-read-option-button">Đọc từ đầu</button>
          <button className="u-read-option-button">Chương mới nhất</button>
        </div>
      </div>
    </section>
  );
};

export default StoryInfo;
