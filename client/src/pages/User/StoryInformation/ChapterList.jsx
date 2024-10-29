import React from 'react';
import './ChapterList.css';

const chapters = [
  'Chương 1: Chuyện về nàng Lọ lem',
  'Chương 2: Món quà của bà tiên',
  'Chương 3: Đêm vũ hội',
  'Chương 4: Âm mưu của dì ghẻ',
  'Chương 5: Phần kết thúc',
];

const ChapterList = () => {
  return (
    <section className="u-chapter-list">
        <h3>Chapter List</h3>
        <ul>
          {chapters.map((chapter, index) => (
            <li key={index} className="u-chapter-item">
              <a href = "/viewchapter">★ {chapter}</a>
            </li>
          ))}
        </ul>
      </section>
  );
};

export default ChapterList;