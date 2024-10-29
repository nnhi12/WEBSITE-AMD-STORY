import React from 'react';
import './NewestChapter.css';
const newestChapters = [
  'Chương 5: Phần kết thúc',
  'Chương 4: Âm mưu của dì ghẻ',
  'Chương 3: Đêm vũ hội',
  'Chương 2: Món quà của bà tiên',
];
const NewestChapter = () => {
  return (
    <section className="newest-chapter">
        <h3>Newest Chapter</h3>
        <ul>
          {newestChapters.map((chapter, index) => (
            <li key={index} className="newest-item">
              <a href = "/viewchapter">📖 {chapter}</a>
            </li>
          ))}
        </ul>
      </section>
  );
};

export default NewestChapter;
