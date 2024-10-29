import React from 'react';
import './StoryInfo.css';

const StoryInfo = () => {
  return (
    <section className="u-story-info">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2d1zvTHH5bycjIvIUt-luPHTOOaV0ecQSkg&s" alt="Cinderella Cover" className="u-story-cover" />
        
        <div className="u-summary">
          <div className = "u-story-name">
            <h1 className="u-page-title">CINDERELLA: CÔ BÉ LỌ LEM</h1>
            <h4 className="u-author">Charles Perrault</h4>
          </div>
          <div className="u-date-info">
            <p>Created at: 12:00 p.m 15/08/2024</p>
            <p>Updated at: 12:00 p.m 15/08/2024</p>
          </div>
          <h3>Summary</h3>
          <p>
            'Cô bé Lọ Lem' là một câu chuyện phổ biến được nhiều người trẻ trên khắp thế giới yêu thích. Với những tình tiết hấp dẫn, câu chuyện cổ tích đã được tái hiện qua các phiên bản kịch, phim, audio,....
          </p>
          <div>
            <button className="u-read-option-button">Đọc từ đầu</button>
            <button className="u-read-option-button">Chương mới nhất</button>
          </div>
        </div>
      </section>
  );
};

export default StoryInfo;
